import { NoteSequence } from '../protobuf/index';
import * as constants from './constants';
const QUANTIZE_CUTOFF = 0.5;
export class MultipleTimeSignatureException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class BadTimeSignatureException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class NegativeTimeException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class MultipleTempoException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class QuantizationStatusException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
function isPowerOf2(n) {
    return n && (n & (n - 1)) === 0;
}
export function clone(ns) {
    return NoteSequence.decode(NoteSequence.encode(ns).finish());
}
export function stepsPerQuarterToStepsPerSecond(stepsPerQuarter, qpm) {
    return stepsPerQuarter * qpm / 60.0;
}
export function quantizeToStep(unquantizedSeconds, stepsPerSecond, quantizeCutoff = QUANTIZE_CUTOFF) {
    const unquantizedSteps = unquantizedSeconds * stepsPerSecond;
    return Math.floor(unquantizedSteps + (1 - quantizeCutoff));
}
function getQuantizedTimeEvents(ns) {
    return ns.controlChanges.concat(ns.textAnnotations);
}
function quantizeNotesAndEvents(ns, stepsPerSecond) {
    for (const note of ns.notes) {
        note.quantizedStartStep = quantizeToStep(note.startTime, stepsPerSecond);
        note.quantizedEndStep = quantizeToStep(note.endTime, stepsPerSecond);
        if (note.quantizedEndStep === note.quantizedStartStep) {
            note.quantizedEndStep += 1;
        }
        if (note.quantizedStartStep < 0 || note.quantizedEndStep < 0) {
            throw new NegativeTimeException(`Got negative note time: start_step = ` +
                `${note.quantizedStartStep}, end_step = ` +
                `${note.quantizedEndStep}`);
        }
        if (note.quantizedEndStep > ns.totalQuantizedSteps) {
            ns.totalQuantizedSteps = note.quantizedEndStep;
        }
    }
    getQuantizedTimeEvents(ns).forEach(event => {
        event.quantizedStep = quantizeToStep(event.time, stepsPerSecond);
        if (event.quantizedStep < 0) {
            throw new NegativeTimeException(`Got negative event time: step = ${event.quantizedStep}`);
        }
    });
}
function assertSingleTempo(ns) {
    if (!ns.tempos || ns.tempos.length === 0) {
        return;
    }
    ns.tempos.sort((a, b) => a.time - b.time);
    if (ns.tempos[0].time !== 0 &&
        ns.tempos[0].qpm !== constants.DEFAULT_QUARTERS_PER_MINUTE) {
        throw new MultipleTempoException('NoteSequence has an implicit tempo change from initial ' +
            `${constants.DEFAULT_QUARTERS_PER_MINUTE} qpm to ` +
            `${ns.tempos[0].qpm} qpm at ${ns.tempos[0].time} seconds.`);
    }
    for (let i = 1; i < ns.tempos.length; i++) {
        if (ns.tempos[i].qpm !== ns.tempos[0].qpm) {
            throw new MultipleTempoException('NoteSequence has at least one tempo change from ' +
                `${ns.tempos[0].qpm} qpm to ${ns.tempos[i].qpm}` +
                `qpm at ${ns.tempos[i].time} seconds.`);
        }
    }
}
export function quantizeNoteSequence(ns, stepsPerQuarter) {
    const qns = clone(ns);
    qns.quantizationInfo =
        NoteSequence.QuantizationInfo.create({ stepsPerQuarter });
    if (qns.timeSignatures.length > 0) {
        qns.timeSignatures.sort((a, b) => a.time - b.time);
        if (qns.timeSignatures[0].time !== 0 &&
            !(qns.timeSignatures[0].numerator === 4 &&
                qns.timeSignatures[0].denominator === 4)) {
            throw new MultipleTimeSignatureException('NoteSequence has an implicit change from initial 4/4 time ' +
                `signature to ${qns.timeSignatures[0].numerator}/` +
                `${qns.timeSignatures[0].denominator} at ` +
                `${qns.timeSignatures[0].time} seconds.`);
        }
        for (let i = 1; i < qns.timeSignatures.length; i++) {
            const timeSignature = qns.timeSignatures[i];
            if (timeSignature.numerator !== qns.timeSignatures[0].numerator ||
                timeSignature.denominator !== qns.timeSignatures[0].denominator) {
                throw new MultipleTimeSignatureException('NoteSequence has at least one time signature change from ' +
                    `${qns.timeSignatures[0].numerator}/` +
                    `${qns.timeSignatures[0].denominator} to ` +
                    `${timeSignature.numerator}/${timeSignature.denominator} ` +
                    `at ${timeSignature.time} seconds`);
            }
        }
        qns.timeSignatures[0].time = 0;
        qns.timeSignatures = [qns.timeSignatures[0]];
    }
    else {
        const timeSignature = NoteSequence.TimeSignature.create({ numerator: 4, denominator: 4, time: 0 });
        qns.timeSignatures.push(timeSignature);
    }
    const firstTS = qns.timeSignatures[0];
    if (!isPowerOf2(firstTS.denominator)) {
        throw new BadTimeSignatureException('Denominator is not a power of 2. Time signature: ' +
            `${firstTS.numerator}/${firstTS.denominator}`);
    }
    if (firstTS.numerator === 0) {
        throw new BadTimeSignatureException('Numerator is 0. Time signature: ' +
            `${firstTS.numerator}/${firstTS.denominator}`);
    }
    if (qns.tempos.length > 0) {
        assertSingleTempo(qns);
        qns.tempos[0].time = 0;
        qns.tempos = [qns.tempos[0]];
    }
    else {
        const tempo = NoteSequence.Tempo.create({ qpm: constants.DEFAULT_QUARTERS_PER_MINUTE, time: 0 });
        qns.tempos.push(tempo);
    }
    const stepsPerSecond = stepsPerQuarterToStepsPerSecond(stepsPerQuarter, qns.tempos[0].qpm);
    qns.totalQuantizedSteps = quantizeToStep(ns.totalTime, stepsPerSecond);
    quantizeNotesAndEvents(qns, stepsPerSecond);
    return qns;
}
export function isQuantizedSequence(ns) {
    return ns.quantizationInfo &&
        (ns.quantizationInfo.stepsPerQuarter > 0 ||
            ns.quantizationInfo.stepsPerSecond > 0);
}
export function assertIsQuantizedSequence(ns) {
    if (!isQuantizedSequence(ns)) {
        throw new QuantizationStatusException(`NoteSequence ${ns.id} is not quantized (missing quantizationInfo)`);
    }
}
export function isRelativeQuantizedSequence(ns) {
    return ns.quantizationInfo && ns.quantizationInfo.stepsPerQuarter > 0;
}
export function assertIsRelativeQuantizedSequence(ns) {
    if (!isRelativeQuantizedSequence(ns)) {
        throw new QuantizationStatusException(`NoteSequence ${ns.id} is not quantized or is quantized based on absolute timing`);
    }
}
export function isAbsoluteQuantizedSequence(ns) {
    return ns.quantizationInfo && ns.quantizationInfo.stepsPerSecond > 0;
}
export function assertIsAbsoluteQuantizedSequence(ns) {
    if (!isAbsoluteQuantizedSequence(ns)) {
        throw new QuantizationStatusException(`NoteSequence ${ns.id} is not quantized or is quantized based on relative timing`);
    }
}
export function unquantizeSequence(qns, qpm) {
    assertIsRelativeQuantizedSequence(qns);
    assertSingleTempo(qns);
    const ns = clone(qns);
    if (qpm) {
        if (ns.tempos && ns.tempos.length > 0) {
            ns.tempos[0].qpm = qpm;
        }
        else {
            ns.tempos.push(NoteSequence.Tempo.create({ time: 0, qpm }));
        }
    }
    else {
        qpm = (qns.tempos && qns.tempos.length > 0) ?
            ns.tempos[0].qpm :
            constants.DEFAULT_QUARTERS_PER_MINUTE;
    }
    const stepToSeconds = (step) => step / ns.quantizationInfo.stepsPerQuarter * (60 / qpm);
    ns.totalTime = stepToSeconds(ns.totalQuantizedSteps);
    ns.notes.forEach(n => {
        n.startTime = stepToSeconds(n.quantizedStartStep);
        n.endTime = stepToSeconds(n.quantizedEndStep);
        ns.totalTime = Math.max(ns.totalTime, n.endTime);
        delete n.quantizedStartStep;
        delete n.quantizedEndStep;
    });
    getQuantizedTimeEvents(ns).forEach(event => {
        event.time = stepToSeconds(event.time);
    });
    delete ns.totalQuantizedSteps;
    delete ns.quantizationInfo;
    return ns;
}
export function createQuantizedNoteSequence(stepsPerQuarter = constants.DEFAULT_STEPS_PER_QUARTER, qpm = constants.DEFAULT_QUARTERS_PER_MINUTE) {
    return NoteSequence.create({ quantizationInfo: { stepsPerQuarter }, tempos: [{ qpm }] });
}
export function mergeInstruments(ns) {
    const result = clone(ns);
    const events = result.notes.concat(result.pitchBends).concat(result.controlChanges);
    const programs = Array.from(new Set(events.filter(e => !e.isDrum).map(e => e.program)));
    events.forEach(e => {
        if (e.isDrum) {
            e.program = 0;
            e.instrument = programs.length;
        }
        else {
            e.instrument = programs.indexOf(e.program);
        }
    });
    return result;
}
export function replaceInstruments(originalSequence, replaceSequence) {
    const instrumentsInOriginal = new Set(originalSequence.notes.map(n => n.instrument));
    const instrumentsInReplace = new Set(replaceSequence.notes.map(n => n.instrument));
    const newNotes = [];
    originalSequence.notes.forEach(n => {
        if (!instrumentsInReplace.has(n.instrument)) {
            newNotes.push(NoteSequence.Note.create(n));
        }
    });
    replaceSequence.notes.forEach(n => {
        if (instrumentsInOriginal.has(n.instrument)) {
            newNotes.push(NoteSequence.Note.create(n));
        }
    });
    const output = clone(originalSequence);
    output.notes = newNotes.sort((a, b) => {
        const voiceCompare = a.instrument - b.instrument;
        if (voiceCompare) {
            return voiceCompare;
        }
        return a.quantizedStartStep - b.quantizedStartStep;
    });
    return output;
}
export function mergeConsecutiveNotes(sequence) {
    assertIsQuantizedSequence(sequence);
    const output = clone(sequence);
    output.notes = [];
    const newNotes = sequence.notes.sort((a, b) => {
        const voiceCompare = a.instrument - b.instrument;
        if (voiceCompare) {
            return voiceCompare;
        }
        return a.quantizedStartStep - b.quantizedStartStep;
    });
    const note = new NoteSequence.Note();
    note.pitch = newNotes[0].pitch;
    note.instrument = newNotes[0].instrument;
    note.quantizedStartStep = newNotes[0].quantizedStartStep;
    note.quantizedEndStep = newNotes[0].quantizedEndStep;
    output.notes.push(note);
    let o = 0;
    for (let i = 1; i < newNotes.length; i++) {
        const thisNote = newNotes[i];
        const previousNote = output.notes[o];
        if (previousNote.instrument === thisNote.instrument &&
            previousNote.pitch === thisNote.pitch &&
            thisNote.quantizedStartStep === previousNote.quantizedEndStep &&
            thisNote.quantizedStartStep % 16 !== 0) {
            output.notes[o].quantizedEndStep +=
                thisNote.quantizedEndStep - thisNote.quantizedStartStep;
        }
        else {
            const note = new NoteSequence.Note();
            note.pitch = newNotes[i].pitch;
            note.instrument = newNotes[i].instrument;
            note.quantizedStartStep = newNotes[i].quantizedStartStep;
            note.quantizedEndStep = newNotes[i].quantizedEndStep;
            output.notes.push(note);
            o++;
        }
    }
    return output;
}
export function concatenate(concatenateSequences, sequenceDurations) {
    if (sequenceDurations &&
        sequenceDurations.length !== concatenateSequences.length) {
        throw new Error(`Number of sequences to concatenate and their individual
 durations does not match.`);
    }
    if (isQuantizedSequence(concatenateSequences[0])) {
        for (let i = 0; i < concatenateSequences.length; ++i) {
            assertIsQuantizedSequence(concatenateSequences[i]);
            if (concatenateSequences[i].quantizationInfo.stepsPerQuarter !==
                concatenateSequences[0].quantizationInfo.stepsPerQuarter) {
                throw new Error('Not all sequences have the same quantizationInfo');
            }
        }
        return concatenateHelper(concatenateSequences, 'totalQuantizedSteps', 'quantizedStartStep', 'quantizedEndStep', sequenceDurations);
    }
    else {
        return concatenateHelper(concatenateSequences, 'totalTime', 'startTime', 'endTime', sequenceDurations);
    }
}
export function trim(ns, start, end, truncateEndNotes) {
    return isQuantizedSequence(ns) ?
        trimHelper(ns, start, end, 'totalQuantizedSteps', 'quantizedStartStep', 'quantizedEndStep', truncateEndNotes) :
        trimHelper(ns, start, end, 'totalTime', 'startTime', 'endTime', truncateEndNotes);
}
function concatenateHelper(seqs, totalKey, startKey, endKey, sequenceDurations) {
    let concatSeq;
    let totalDuration = 0;
    for (let i = 0; i < seqs.length; ++i) {
        const seqDuration = sequenceDurations ? sequenceDurations[i] : seqs[i][totalKey];
        if (seqDuration === 0) {
            throw Error(`Sequence ${seqs[i].id} has no ${totalKey}, and no individual duration was provided.`);
        }
        if (i === 0) {
            concatSeq = clone(seqs[0]);
        }
        else {
            Array.prototype.push.apply(concatSeq.notes, seqs[i].notes.map(n => {
                const newN = NoteSequence.Note.create(n);
                newN[startKey] += totalDuration;
                newN[endKey] += totalDuration;
                return newN;
            }));
        }
        totalDuration += seqDuration;
    }
    concatSeq[totalKey] = totalDuration;
    return concatSeq;
}
function trimHelper(ns, start, end, totalKey, startKey, endKey, truncateEndNotes) {
    const result = clone(ns);
    result[totalKey] = end;
    result.notes = result.notes.filter(n => n[startKey] >= start && n[startKey] <= end &&
        (truncateEndNotes || n[endKey] <= end));
    result[totalKey] -= start;
    for (let i = 0; i < result.notes.length; i++) {
        result.notes[i][startKey] -= start;
        result.notes[i][endKey] -= start;
        if (truncateEndNotes) {
            result.notes[i][endKey] = Math.min(result.notes[i][endKey], result[totalKey]);
        }
    }
    return result;
}
export function split(seq, chunkSize) {
    assertIsQuantizedSequence(seq);
    const ns = clone(seq);
    const notesBystartStep = ns.notes.sort((a, b) => a.quantizedStartStep - b.quantizedStartStep);
    const chunks = [];
    let startStep = 0;
    let currentNotes = [];
    for (let i = 0; i < notesBystartStep.length; i++) {
        const note = notesBystartStep[i];
        const originalStartStep = note.quantizedStartStep;
        const originalEndStep = note.quantizedEndStep;
        note.quantizedStartStep -= startStep;
        note.quantizedEndStep -= startStep;
        if (note.quantizedStartStep < 0) {
            continue;
        }
        if (note.quantizedEndStep <= chunkSize) {
            currentNotes.push(note);
        }
        else {
            if (note.quantizedStartStep < chunkSize) {
                const newNote = NoteSequence.Note.create(note);
                newNote.quantizedEndStep = chunkSize;
                newNote.startTime = newNote.endTime = undefined;
                currentNotes.push(newNote);
                note.quantizedStartStep = startStep + chunkSize;
                note.quantizedEndStep = originalEndStep;
            }
            else {
                note.quantizedStartStep = originalStartStep;
                note.quantizedEndStep = originalEndStep;
            }
            if (note.quantizedEndStep > chunkSize ||
                note.quantizedStartStep > chunkSize) {
                i = i - 1;
            }
            if (currentNotes.length !== 0) {
                const newSequence = clone(ns);
                newSequence.notes = currentNotes;
                newSequence.totalQuantizedSteps = chunkSize;
                chunks.push(newSequence);
            }
            currentNotes = [];
            startStep += chunkSize;
        }
    }
    if (currentNotes.length !== 0) {
        const newSequence = clone(ns);
        newSequence.notes = currentNotes;
        newSequence.totalQuantizedSteps = chunkSize;
        chunks.push(newSequence);
    }
    return chunks;
}
//# sourceMappingURL=sequences.js.map