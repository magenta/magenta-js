import { Midi } from '@tonejs/midi';
import { fetch } from '../core/compat/global';
import { NoteSequence } from '../protobuf/index';
import * as constants from './constants';
import * as sequences from './sequences';
export class MidiConversionError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export function midiToSequenceProto(midi) {
    const parsedMidi = new Midi(midi);
    const ns = NoteSequence.create();
    ns.ticksPerQuarter = parsedMidi.header.ppq;
    ns.sourceInfo = NoteSequence.SourceInfo.create({
        parser: NoteSequence.SourceInfo.Parser.TONEJS_MIDI_CONVERT,
        encodingType: NoteSequence.SourceInfo.EncodingType.MIDI
    });
    for (const ts of parsedMidi.header.timeSignatures) {
        ns.timeSignatures.push(NoteSequence.TimeSignature.create({
            time: parsedMidi.header.ticksToSeconds(ts.ticks),
            numerator: ts.timeSignature[0],
            denominator: ts.timeSignature[1],
        }));
    }
    if (!ns.timeSignatures.length) {
        ns.timeSignatures.push(NoteSequence.TimeSignature.create({
            time: 0,
            numerator: 4,
            denominator: 4,
        }));
    }
    for (const tempo of parsedMidi.header.tempos) {
        ns.tempos.push(NoteSequence.Tempo.create({
            time: tempo.time,
            qpm: tempo.bpm,
        }));
    }
    let instrumentNumber = -1;
    for (const track of parsedMidi.tracks) {
        if (track.notes.length > 0) {
            instrumentNumber += 1;
        }
        for (const note of track.notes) {
            const startTime = note.time;
            const duration = note.duration;
            const endTime = startTime + duration;
            ns.notes.push(NoteSequence.Note.create({
                instrument: instrumentNumber,
                program: track.instrument.number,
                startTime,
                endTime,
                pitch: note.midi,
                velocity: Math.floor(note.velocity * constants.MIDI_VELOCITIES),
                isDrum: track.instrument.percussion
            }));
            if (endTime > ns.totalTime) {
                ns.totalTime = endTime;
            }
        }
        const controlChangeValues = Object.values(track.controlChanges);
        const flattenedControlChangeValues = [].concat.apply([], controlChangeValues);
        for (const controlChange of flattenedControlChangeValues) {
            ns.controlChanges.push(NoteSequence.ControlChange.create({
                time: controlChange.time,
                controlNumber: controlChange.number,
                controlValue: Math.floor(controlChange.value * (constants.MIDI_VELOCITIES - 1)),
                instrument: instrumentNumber,
                program: track.instrument.number,
                isDrum: track.instrument.percussion
            }));
        }
    }
    return ns;
}
export function sequenceProtoToMidi(ns) {
    if (sequences.isQuantizedSequence(ns)) {
        ns = sequences.unquantizeSequence(ns);
    }
    const midi = new Midi();
    midi.fromJSON({
        header: {
            name: '',
            ppq: ns.ticksPerQuarter || constants.DEFAULT_TICKS_PER_QUARTER,
            tempos: [],
            timeSignatures: [],
            keySignatures: [],
            meta: []
        },
        tracks: []
    });
    const tempos = Array.from(ns.tempos || []);
    if (tempos.length === 0) {
        tempos.push({ time: 0, qpm: constants.DEFAULT_QUARTERS_PER_MINUTE });
    }
    tempos.sort((a, b) => a.time - b.time);
    for (const tempo of tempos) {
        midi.header.tempos.push({ ticks: midi.header.secondsToTicks(tempo.time),
            bpm: tempo.qpm });
        midi.header.update();
    }
    if (!ns.timeSignatures || ns.timeSignatures.length === 0) {
        midi.header.timeSignatures.push({ ticks: 0, timeSignature: [4, 4] });
    }
    else {
        for (const ts of ns.timeSignatures) {
            midi.header.timeSignatures.push({
                ticks: midi.header.secondsToTicks(ts.time),
                timeSignature: [ts.numerator, ts.denominator]
            });
        }
    }
    midi.header.update();
    const tracks = new Map();
    for (const note of ns.notes) {
        const instrument = note.instrument ? note.instrument : 0;
        const program = (note.program === undefined) ? constants.DEFAULT_PROGRAM :
            note.program;
        const isDrum = !!note.isDrum;
        const key = JSON.stringify([instrument, program, isDrum]);
        if (!tracks.has(key)) {
            tracks.set(key, { notes: [], controlChanges: [] });
        }
        tracks.get(key).notes.push(note);
    }
    for (const controlChange of ns.controlChanges) {
        const instrument = controlChange.instrument ? controlChange.instrument : 0;
        const program = (controlChange.program === undefined)
            ? constants.DEFAULT_PROGRAM : controlChange.program;
        const isDrum = !!controlChange.isDrum;
        const key = JSON.stringify([instrument, program, isDrum]);
        if (!tracks.has(key)) {
            tracks.set(key, { notes: [], controlChanges: [] });
        }
        tracks.get(key).controlChanges.push(controlChange);
    }
    tracks.forEach((trackData, key) => {
        const [program, isDrum] = JSON.parse(key).slice(1);
        const track = midi.addTrack();
        if (isDrum) {
            track.channel = constants.DRUM_CHANNEL;
        }
        else {
            track.channel = constants.NON_DRUM_CHANNELS[(midi.tracks.length - 1) % constants.NON_DRUM_CHANNELS.length];
        }
        track.instrument.number = program;
        for (const note of trackData.notes) {
            const velocity = (note.velocity === undefined) ?
                constants.DEFAULT_VELOCITY :
                note.velocity;
            track.addNote({
                midi: note.pitch,
                time: note.startTime,
                duration: note.endTime - note.startTime,
                velocity: (velocity + 1) / constants.MIDI_VELOCITIES
            });
        }
        for (const controlChange of trackData.controlChanges) {
            track.addCC({
                number: controlChange.controlNumber,
                value: controlChange.controlValue,
                time: controlChange.time
            });
        }
    });
    return midi.toArray();
}
export function urlToBlob(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
            return response.blob();
        })
            .then((blob) => {
            resolve(blob);
        })
            .catch((error) => reject(error));
    });
}
export function blobToNoteSequence(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const ns = midiToSequenceProto(reader.result);
                resolve(ns);
            }
            catch (error) {
                reject(error);
            }
        };
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(blob);
    });
}
export function urlToNoteSequence(url) {
    return urlToBlob(url).then(blobToNoteSequence);
}
//# sourceMappingURL=midi_io.js.map