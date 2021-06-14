import * as tf from '@tensorflow/tfjs';
import { NoteSequence } from '../protobuf/index';
import * as constants from './constants';
import { DEFAULT_DRUM_PITCH_CLASSES } from './constants';
import * as logging from './logging';
import { Melody, MelodyRhythm, MelodyShape } from './melodies';
import * as performance from './performance';
import * as sequences from './sequences';
export { DEFAULT_DRUM_PITCH_CLASSES };
export function converterFromSpec(spec) {
    switch (spec.type) {
        case 'MelodyConverter':
            return new MelodyConverter(spec.args);
        case 'MelodyRhythmConverter':
            return new MelodyRhythmConverter(spec.args);
        case 'MelodyShapeConverter':
            return new MelodyShapeConverter(spec.args);
        case 'DrumsConverter':
            return new DrumsConverter(spec.args);
        case 'DrumRollConverter':
            return new DrumRollConverter(spec.args);
        case 'TrioConverter':
            return new TrioConverter(spec.args);
        case 'TrioRhythmConverter':
            return new TrioRhythmConverter(spec.args);
        case 'DrumsOneHotConverter':
            return new DrumsOneHotConverter(spec.args);
        case 'MultitrackConverter':
            return new MultitrackConverter(spec.args);
        case 'GrooveConverter':
            return new GrooveConverter(spec.args);
        default:
            throw new Error(`Unknown DataConverter type: ${spec}`);
    }
}
export class DataConverter {
    constructor(args) {
        this.NUM_SPLITS = 0;
        this.SEGMENTED_BY_TRACK = false;
        this.numSteps = args.numSteps;
        this.numSegments = args.numSegments;
    }
    tensorSteps(tensor) {
        return tf.scalar(tensor.shape[0], 'int32');
    }
}
export class DrumsConverter extends DataConverter {
    constructor(args) {
        super(args);
        this.pitchClasses = args.pitchClasses || DEFAULT_DRUM_PITCH_CLASSES;
        this.pitchToClass = new Map();
        for (let c = 0; c < this.pitchClasses.length; ++c) {
            this.pitchClasses[c].forEach((p) => {
                this.pitchToClass.set(p, c);
            });
        }
        this.depth = this.pitchClasses.length + 1;
    }
    toTensor(noteSequence) {
        sequences.assertIsQuantizedSequence(noteSequence);
        const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
        const drumRoll = tf.buffer([numSteps, this.pitchClasses.length + 1], 'int32');
        for (let i = 0; i < numSteps; ++i) {
            drumRoll.set(1, i, -1);
        }
        noteSequence.notes.forEach((note) => {
            drumRoll.set(1, note.quantizedStartStep, this.pitchToClass.get(note.pitch));
            drumRoll.set(0, note.quantizedStartStep, -1);
        });
        return drumRoll.toTensor();
    }
    async toNoteSequence(oh, stepsPerQuarter, qpm) {
        const noteSequence = sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
        const labelsTensor = oh.argMax(1);
        const labels = await labelsTensor.data();
        labelsTensor.dispose();
        for (let s = 0; s < labels.length; ++s) {
            for (let p = 0; p < this.pitchClasses.length; p++) {
                if (labels[s] >> p & 1) {
                    noteSequence.notes.push(NoteSequence.Note.create({
                        pitch: this.pitchClasses[p][0],
                        quantizedStartStep: s,
                        quantizedEndStep: s + 1,
                        isDrum: true
                    }));
                }
            }
        }
        noteSequence.totalQuantizedSteps = labels.length;
        return noteSequence;
    }
}
export class DrumRollConverter extends DrumsConverter {
    async toNoteSequence(roll, stepsPerQuarter, qpm) {
        const noteSequence = sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
        const flatRoll = await roll.data();
        for (let s = 0; s < roll.shape[0]; ++s) {
            const pitches = flatRoll.slice(s * this.pitchClasses.length, (s + 1) * this.pitchClasses.length);
            for (let p = 0; p < pitches.length; ++p) {
                if (pitches[p]) {
                    noteSequence.notes.push(NoteSequence.Note.create({
                        pitch: this.pitchClasses[p][0],
                        quantizedStartStep: s,
                        quantizedEndStep: s + 1,
                        isDrum: true
                    }));
                }
            }
        }
        noteSequence.totalQuantizedSteps = roll.shape[0];
        return noteSequence;
    }
}
export class DrumsOneHotConverter extends DrumsConverter {
    constructor(args) {
        super(args);
        this.depth = Math.pow(2, this.pitchClasses.length);
    }
    toTensor(noteSequence) {
        sequences.assertIsRelativeQuantizedSequence(noteSequence);
        const numSteps = this.numSteps || noteSequence.totalQuantizedSteps;
        const labels = Array(numSteps).fill(0);
        for (const { pitch, quantizedStartStep } of noteSequence.notes) {
            labels[quantizedStartStep] += Math.pow(2, this.pitchToClass.get(pitch));
        }
        return tf.tidy(() => tf.oneHot(tf.tensor1d(labels, 'int32'), this.depth));
    }
}
export class MelodyConverter extends DataConverter {
    constructor(args) {
        super(args);
        this.NOTE_OFF = 1;
        this.FIRST_PITCH = 2;
        this.minPitch = args.minPitch;
        this.maxPitch = args.maxPitch;
        this.ignorePolyphony = args.ignorePolyphony;
        this.depth = args.maxPitch - args.minPitch + 1 + this.FIRST_PITCH;
    }
    toTensor(noteSequence) {
        const melody = Melody.fromNoteSequence(noteSequence, this.minPitch, this.maxPitch, this.ignorePolyphony, this.numSteps);
        return tf.tidy(() => tf.oneHot(tf.tensor(melody.events, [melody.events.length], 'int32'), this.depth));
    }
    async toNoteSequence(oh, stepsPerQuarter, qpm) {
        const labelsTensor = oh.argMax(1);
        const labels = await labelsTensor.data();
        labelsTensor.dispose();
        const melody = new Melody(labels, this.minPitch, this.maxPitch);
        return melody.toNoteSequence(stepsPerQuarter, qpm);
    }
}
class MelodyControlConverter extends DataConverter {
    constructor(args, melodyControl) {
        super(args);
        this.minPitch = args.minPitch;
        this.maxPitch = args.maxPitch;
        this.ignorePolyphony = args.ignorePolyphony;
        this.melodyControl = melodyControl;
        this.depth = melodyControl.depth;
    }
    toTensor(noteSequence) {
        const melody = Melody.fromNoteSequence(noteSequence, this.minPitch, this.maxPitch, this.ignorePolyphony, this.numSteps);
        return this.melodyControl.extract(melody);
    }
}
export class MelodyRhythmConverter extends MelodyControlConverter {
    constructor(args) {
        super(args, new MelodyRhythm());
    }
    async toNoteSequence(tensor, stepsPerQuarter, qpm) {
        const noteSequence = sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
        const rhythm = await tensor.data();
        for (let s = 0; s < rhythm.length; ++s) {
            if (rhythm[s]) {
                noteSequence.notes.push(NoteSequence.Note.create({
                    pitch: DEFAULT_DRUM_PITCH_CLASSES[1][0],
                    quantizedStartStep: s,
                    quantizedEndStep: s + 1,
                    isDrum: true
                }));
            }
        }
        noteSequence.totalQuantizedSteps = rhythm.length;
        return noteSequence;
    }
}
export class MelodyShapeConverter extends MelodyControlConverter {
    constructor(args) {
        super(args, new MelodyShape());
    }
    async toNoteSequence(oh, stepsPerQuarter, qpm) {
        const noteSequence = sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
        const shapeTensor = oh.argMax(1);
        const shape = await shapeTensor.data();
        shapeTensor.dispose();
        let pitch = Math.round((this.maxPitch + this.minPitch) / 2);
        for (let s = 0; s < shape.length; ++s) {
            switch (shape[s]) {
                case 0:
                    pitch -= 1;
                    if (pitch < this.minPitch) {
                        pitch = this.minPitch;
                        logging.log('Pitch range exceeded when creating NoteSequence from shape.', 'MelodyShapeConverter');
                    }
                    break;
                case 2:
                    pitch += 1;
                    if (pitch > this.maxPitch) {
                        pitch = this.maxPitch;
                        logging.log('Pitch range exceeded when creating NoteSequence from shape.', 'MelodyShapeConverter');
                    }
                    break;
                default:
                    break;
            }
            noteSequence.notes.push(NoteSequence.Note.create({ pitch, quantizedStartStep: s, quantizedEndStep: s + 1 }));
        }
        noteSequence.totalQuantizedSteps = shape.length;
        return noteSequence;
    }
}
export class TrioConverter extends DataConverter {
    constructor(args) {
        super(args);
        this.NUM_SPLITS = 3;
        this.MEL_PROG_RANGE = [0, 31];
        this.BASS_PROG_RANGE = [32, 39];
        args.melArgs.numSteps = args.numSteps;
        args.bassArgs.numSteps = args.numSteps;
        args.drumsArgs.numSteps = args.numSteps;
        this.melConverter = new MelodyConverter(args.melArgs);
        this.bassConverter = new MelodyConverter(args.bassArgs);
        this.drumsConverter = new DrumsOneHotConverter(args.drumsArgs);
        this.depth =
            (this.melConverter.depth + this.bassConverter.depth +
                this.drumsConverter.depth);
    }
    toTensor(noteSequence) {
        sequences.assertIsQuantizedSequence(noteSequence);
        const melSeq = sequences.clone(noteSequence);
        const bassSeq = sequences.clone(noteSequence);
        const drumsSeq = sequences.clone(noteSequence);
        melSeq.notes = noteSequence.notes.filter(n => (!n.isDrum && n.program >= this.MEL_PROG_RANGE[0] &&
            n.program <= this.MEL_PROG_RANGE[1]));
        bassSeq.notes = noteSequence.notes.filter(n => (!n.isDrum && n.program >= this.BASS_PROG_RANGE[0] &&
            n.program <= this.BASS_PROG_RANGE[1]));
        drumsSeq.notes = noteSequence.notes.filter(n => n.isDrum);
        return tf.tidy(() => tf.concat([
            this.melConverter.toTensor(melSeq),
            this.bassConverter.toTensor(bassSeq),
            this.drumsConverter.toTensor(drumsSeq)
        ], -1));
    }
    async toNoteSequence(th, stepsPerQuarter, qpm) {
        const ohs = tf.split(th, [
            this.melConverter.depth, this.bassConverter.depth,
            this.drumsConverter.depth
        ], -1);
        const ns = await this.melConverter.toNoteSequence(ohs[0], stepsPerQuarter, qpm);
        ns.notes.forEach(n => {
            n.instrument = 0;
            n.program = 0;
        });
        const bassNs = await this.bassConverter.toNoteSequence(ohs[1], stepsPerQuarter, qpm);
        ns.notes.push(...bassNs.notes.map(n => {
            n.instrument = 1;
            n.program = this.BASS_PROG_RANGE[0];
            return n;
        }));
        const drumsNs = await this.drumsConverter.toNoteSequence(ohs[2], stepsPerQuarter, qpm);
        ns.notes.push(...drumsNs.notes.map(n => {
            n.instrument = 2;
            return n;
        }));
        ohs.forEach(oh => oh.dispose());
        return ns;
    }
}
export class TrioRhythmConverter extends DataConverter {
    constructor(args) {
        super(args);
        this.NUM_SPLITS = 3;
        this.trioConverter = new TrioConverter(args);
        this.depth = 3;
    }
    toTensor(noteSequence) {
        return tf.tidy(() => {
            const trioTensor = this.trioConverter.toTensor(noteSequence);
            const instrumentTensors = tf.split(trioTensor, [
                this.trioConverter.melConverter.depth,
                this.trioConverter.bassConverter.depth,
                this.trioConverter.drumsConverter.depth
            ], 1);
            const melodyEvents = tf.argMax(instrumentTensors[0], 1);
            const bassEvents = tf.argMax(instrumentTensors[1], 1);
            const drumsEvents = tf.argMax(instrumentTensors[2], 1);
            const melodyRhythm = tf.greater(melodyEvents, 1);
            const bassRhythm = tf.greater(bassEvents, 1);
            const drumsRhythm = tf.greater(drumsEvents, 0);
            return tf.stack([melodyRhythm, bassRhythm, drumsRhythm], 1);
        });
    }
    async toNoteSequence(tensor, stepsPerQuarter, qpm) {
        const rhythmTensors = tf.split(tensor, 3, 1);
        const rhythms = await Promise.all(rhythmTensors.map(t => t.data()));
        const noteSequence = sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
        for (let s = 0; s < this.numSteps; ++s) {
            if (rhythms[0][s]) {
                noteSequence.notes.push(NoteSequence.Note.create({
                    pitch: 72,
                    quantizedStartStep: s,
                    quantizedEndStep: s + 1,
                    instrument: 0,
                    program: 0,
                }));
            }
            if (rhythms[1][s]) {
                noteSequence.notes.push(NoteSequence.Note.create({
                    pitch: 36,
                    quantizedStartStep: s,
                    quantizedEndStep: s + 1,
                    instrument: 1,
                    program: 32,
                }));
            }
            if (rhythms[2][s]) {
                noteSequence.notes.push(NoteSequence.Note.create({
                    pitch: DEFAULT_DRUM_PITCH_CLASSES[1][0],
                    quantizedStartStep: s,
                    quantizedEndStep: s + 1,
                    instrument: 2,
                    isDrum: true
                }));
            }
        }
        noteSequence.totalQuantizedSteps = this.numSteps;
        return noteSequence;
    }
}
export class MultitrackConverter extends DataConverter {
    constructor(args) {
        super(args);
        this.SEGMENTED_BY_TRACK = true;
        this.stepsPerQuarter = args.stepsPerQuarter;
        this.totalSteps = args.totalSteps;
        this.numVelocityBins = args.numVelocityBins;
        this.minPitch = args.minPitch ? args.minPitch : constants.MIN_MIDI_PITCH;
        this.maxPitch = args.maxPitch ? args.maxPitch : constants.MAX_MIDI_PITCH;
        this.numPitches = this.maxPitch - this.minPitch + 1;
        this.performanceEventDepth =
            2 * this.numPitches + this.totalSteps + this.numVelocityBins;
        this.numPrograms =
            constants.MAX_MIDI_PROGRAM - constants.MIN_MIDI_PROGRAM + 2;
        this.endToken = this.performanceEventDepth + this.numPrograms;
        this.depth = this.endToken + 1;
        this.endTensor = tf.tidy(() => tf.oneHot(tf.tensor1d([this.endToken], 'int32'), this.depth)
            .as1D());
    }
    trackToTensor(track) {
        const maxEventsPerTrack = this.numSteps / this.numSegments;
        let tokens = undefined;
        if (track) {
            while (track.events.length > maxEventsPerTrack - 2) {
                track.events.pop();
            }
            tokens = tf.buffer([track.events.length + 2], 'int32');
            tokens.set(this.performanceEventDepth +
                (track.isDrum ? this.numPrograms - 1 : track.program), 0);
            track.events.forEach((event, index) => {
                switch (event.type) {
                    case 'note-on':
                        tokens.set(event.pitch - this.minPitch, index + 1);
                        break;
                    case 'note-off':
                        tokens.set(this.numPitches + event.pitch - this.minPitch, index + 1);
                        break;
                    case 'time-shift':
                        tokens.set(2 * this.numPitches + event.steps - 1, index + 1);
                        break;
                    case 'velocity-change':
                        tokens.set(2 * this.numPitches + this.totalSteps + event.velocityBin - 1, index + 1);
                        break;
                    default:
                        throw new Error(`Unrecognized performance event: ${event}`);
                }
            });
            tokens.set(this.endToken, track.events.length + 1);
        }
        else {
            tokens = tf.buffer([1], 'int32', new Int32Array([this.endToken]));
        }
        return tf.tidy(() => {
            const oh = tf.oneHot(tokens.toTensor(), this.depth);
            return oh.pad([[0, maxEventsPerTrack - oh.shape[0]], [0, 0]]);
        });
    }
    toTensor(noteSequence) {
        sequences.assertIsRelativeQuantizedSequence(noteSequence);
        if (noteSequence.quantizationInfo.stepsPerQuarter !==
            this.stepsPerQuarter) {
            throw new Error(`Steps per quarter note mismatch: ${noteSequence.quantizationInfo.stepsPerQuarter} != ${this.stepsPerQuarter}`);
        }
        const seq = sequences.clone(noteSequence);
        seq.notes = noteSequence.notes.filter(note => note.pitch >= this.minPitch && note.pitch <= this.maxPitch);
        const instruments = new Set(seq.notes.map(note => note.instrument));
        const tracks = Array.from(instruments)
            .map(instrument => performance.Performance.fromNoteSequence(seq, this.totalSteps, this.numVelocityBins, instrument));
        const sortedTracks = tracks.sort((a, b) => b.isDrum ? -1 : (a.isDrum ? 1 : a.program - b.program));
        while (sortedTracks.length > this.numSegments) {
            sortedTracks.pop();
        }
        sortedTracks.forEach((track) => track.setNumSteps(this.totalSteps));
        while (sortedTracks.length < this.numSegments) {
            sortedTracks.push(undefined);
        }
        return tf.tidy(() => tf.concat(sortedTracks.map((track) => this.trackToTensor(track)), 0));
    }
    tokensToTrack(tokens) {
        const idx = tokens.indexOf(this.endToken);
        const endIndex = idx >= 0 ? idx : tokens.length;
        const trackTokens = tokens.slice(0, endIndex);
        const eventTokens = trackTokens.filter((token) => token < this.performanceEventDepth);
        const programTokens = trackTokens.filter((token) => token >= this.performanceEventDepth);
        const [program, isDrum] = programTokens.length ?
            (programTokens[0] - this.performanceEventDepth < this.numPrograms - 1 ?
                [programTokens[0] - this.performanceEventDepth, false] :
                [0, true]) :
            [0, false];
        const events = Array.from(eventTokens).map((token) => {
            if (token < this.numPitches) {
                return { type: 'note-on', pitch: this.minPitch + token };
            }
            else if (token < 2 * this.numPitches) {
                return {
                    type: 'note-off',
                    pitch: this.minPitch + token - this.numPitches
                };
            }
            else if (token < 2 * this.numPitches + this.totalSteps) {
                return {
                    type: 'time-shift',
                    steps: token - 2 * this.numPitches + 1
                };
            }
            else if (token <
                2 * this.numPitches + this.totalSteps + this.numVelocityBins) {
                return {
                    type: 'velocity-change',
                    velocityBin: token - 2 * this.numPitches - this.totalSteps + 1
                };
            }
            else {
                throw new Error(`Invalid performance event token: ${token}`);
            }
        });
        return new performance.Performance(events, this.totalSteps, this.numVelocityBins, program, isDrum);
    }
    async toNoteSequence(oh, stepsPerQuarter = this.stepsPerQuarter, qpm) {
        const noteSequence = sequences.createQuantizedNoteSequence(stepsPerQuarter, qpm);
        noteSequence.totalQuantizedSteps = this.totalSteps;
        const tensors = tf.tidy(() => tf.split(oh.argMax(1), this.numSegments));
        const tracks = await Promise.all(tensors.map(async (tensor) => {
            const tokens = await tensor.data();
            const track = this.tokensToTrack(tokens);
            tensor.dispose();
            return track;
        }));
        tracks.forEach((track, instrument) => {
            track.setNumSteps(this.totalSteps);
            noteSequence.notes.push(...track.toNoteSequence(instrument).notes);
        });
        return noteSequence;
    }
}
export class GrooveConverter extends DataConverter {
    constructor(args) {
        super(args);
        this.TAPIFY_CHANNEL = 3;
        this.stepsPerQuarter =
            args.stepsPerQuarter || constants.DEFAULT_STEPS_PER_QUARTER;
        this.pitchClasses = args.pitchClasses || DEFAULT_DRUM_PITCH_CLASSES;
        this.pitchToClass = new Map();
        for (let c = 0; c < this.pitchClasses.length; ++c) {
            this.pitchClasses[c].forEach((p) => {
                this.pitchToClass.set(p, c);
            });
        }
        this.humanize = args.humanize || false;
        this.tapify = args.tapify || false;
        this.splitInstruments = args.splitInstruments || false;
        this.depth = 3;
    }
    toTensor(ns) {
        const qns = sequences.isRelativeQuantizedSequence(ns) ?
            ns :
            sequences.quantizeNoteSequence(ns, this.stepsPerQuarter);
        const numSteps = this.numSteps;
        const qpm = (qns.tempos && qns.tempos.length) ?
            qns.tempos[0].qpm :
            constants.DEFAULT_QUARTERS_PER_MINUTE;
        const stepLength = (60. / qpm) / this.stepsPerQuarter;
        const stepNotes = [];
        for (let i = 0; i < numSteps; ++i) {
            stepNotes.push(new Map());
        }
        qns.notes.forEach(n => {
            if (!(this.tapify || this.pitchToClass.has(n.pitch))) {
                return;
            }
            const s = n.quantizedStartStep;
            if (s >= stepNotes.length) {
                throw Error(`Model does not support sequences with more than ${numSteps} steps (${numSteps * stepLength} seconds at qpm ${qpm}).`);
            }
            const d = this.tapify ? this.TAPIFY_CHANNEL : this.pitchToClass.get(n.pitch);
            if (!stepNotes[s].has(d) || stepNotes[s].get(d).velocity < n.velocity) {
                stepNotes[s].set(d, n);
            }
        });
        const numDrums = this.pitchClasses.length;
        const hitVectors = tf.buffer([numSteps, numDrums]);
        const velocityVectors = tf.buffer([numSteps, numDrums]);
        const offsetVectors = tf.buffer([numSteps, numDrums]);
        function getOffset(n) {
            if (n.startTime === undefined) {
                return 0;
            }
            const tOnset = n.startTime;
            const qOnset = n.quantizedStartStep * stepLength;
            return 2 * (qOnset - tOnset) / stepLength;
        }
        for (let s = 0; s < numSteps; ++s) {
            for (let d = 0; d < numDrums; ++d) {
                const note = stepNotes[s].get(d);
                hitVectors.set(note ? 1 : 0, s, d);
                if (!this.humanize && !this.tapify) {
                    velocityVectors.set(note ? note.velocity / constants.MAX_MIDI_VELOCITY : 0, s, d);
                }
                if (!this.humanize) {
                    offsetVectors.set(note ? getOffset(note) : 0, s, d);
                }
            }
        }
        return tf.tidy(() => {
            const hits = hitVectors.toTensor();
            const velocities = velocityVectors.toTensor();
            const offsets = offsetVectors.toTensor();
            const outLength = this.splitInstruments ? numSteps * numDrums : numSteps;
            return tf.concat([
                hits.as2D(outLength, -1), velocities.as2D(outLength, -1),
                offsets.as2D(outLength, -1)
            ], 1);
        });
    }
    async toNoteSequence(t, stepsPerQuarter, qpm = constants.DEFAULT_QUARTERS_PER_MINUTE) {
        if (stepsPerQuarter && stepsPerQuarter !== this.stepsPerQuarter) {
            throw Error('`stepsPerQuarter` is set by the model.');
        }
        stepsPerQuarter = this.stepsPerQuarter;
        const numSteps = this.splitInstruments ?
            t.shape[0] / this.pitchClasses.length :
            t.shape[0];
        const stepLength = (60. / qpm) / this.stepsPerQuarter;
        const ns = NoteSequence.create({ totalTime: numSteps * stepLength, tempos: [{ qpm }] });
        const results = await t.data();
        function clip(v, min, max) {
            return Math.min(Math.max(v, min), max);
        }
        const numDrums = this.pitchClasses.length;
        for (let s = 0; s < numSteps; ++s) {
            const stepResults = results.slice(s * numDrums * this.depth, (s + 1) * numDrums * this.depth);
            for (let d = 0; d < numDrums; ++d) {
                const hitOutput = stepResults[this.splitInstruments ? d * this.depth : d];
                const velI = this.splitInstruments ? (d * this.depth + 1) : (numDrums + d);
                const velOutput = stepResults[velI];
                const offsetI = this.splitInstruments ? (d * this.depth + 2) : (2 * numDrums + d);
                const offsetOutput = stepResults[offsetI];
                if (hitOutput > 0.5) {
                    const velocity = clip(Math.round(velOutput * constants.MAX_MIDI_VELOCITY), constants.MIN_MIDI_VELOCITY, constants.MAX_MIDI_VELOCITY);
                    const offset = clip(offsetOutput / 2, -0.5, 0.5);
                    ns.notes.push(NoteSequence.Note.create({
                        pitch: this.pitchClasses[d][0],
                        startTime: (s - offset) * stepLength,
                        endTime: (s - offset + 1) * stepLength,
                        velocity,
                        isDrum: true
                    }));
                }
            }
        }
        return ns;
    }
}
//# sourceMappingURL=data.js.map