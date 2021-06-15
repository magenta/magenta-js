import * as fs from 'fs';
import * as test from 'tape';
import { NoteSequence } from '../protobuf/index';
import * as constants from './constants';
import * as midi_io from './midi_io';
import * as sequences from './sequences';
const simpleNs = NoteSequence.create({
    ticksPerQuarter: 220,
    totalTime: 1.5,
    timeSignatures: [{ time: 0, numerator: 4, denominator: 4 }],
    tempos: [{ time: 0, qpm: 120 }],
    sourceInfo: {
        encodingType: NoteSequence.SourceInfo.EncodingType.MIDI,
        parser: NoteSequence.SourceInfo.Parser.TONEJS_MIDI_CONVERT
    },
    notes: [
        {
            instrument: 0,
            program: 0,
            startTime: 0,
            endTime: 0.125,
            pitch: 60,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.125,
            endTime: 0.25,
            pitch: 62,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.25,
            endTime: 0.375,
            pitch: 64,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.375,
            endTime: 0.5,
            pitch: 66,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.5,
            endTime: 0.625,
            pitch: 68,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.625,
            endTime: 0.75,
            pitch: 70,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.75,
            endTime: 0.875,
            pitch: 72,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.875,
            endTime: 1,
            pitch: 70,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 1,
            endTime: 1.125,
            pitch: 68,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 1.125,
            endTime: 1.25,
            pitch: 66,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 1.25,
            endTime: 1.375,
            pitch: 64,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 1.375,
            endTime: 1.5,
            pitch: 62,
            velocity: 100,
            isDrum: false
        }
    ],
    controlChanges: [
        {
            instrument: 0,
            program: 0,
            time: 0,
            controlNumber: 64,
            controlValue: 127,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            time: 0.5,
            controlNumber: 64,
            controlValue: 0,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            time: 0.75,
            controlNumber: 64,
            controlValue: 127,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            time: 1.0,
            controlNumber: 64,
            controlValue: 0,
            isDrum: false
        }
    ]
});
const polyNs = NoteSequence.create({
    ticksPerQuarter: 220,
    totalTime: 1.0,
    timeSignatures: [{ time: 0, numerator: 4, denominator: 4 }],
    tempos: [{ time: 0, qpm: 120 }],
    sourceInfo: {
        encodingType: NoteSequence.SourceInfo.EncodingType.MIDI,
        parser: NoteSequence.SourceInfo.Parser.TONEJS_MIDI_CONVERT
    },
    notes: [
        {
            instrument: 0,
            program: 0,
            startTime: 0.0,
            endTime: 1.0,
            pitch: 60,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.125,
            endTime: 0.875,
            pitch: 62,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.25,
            endTime: 0.75,
            pitch: 64,
            velocity: 100,
            isDrum: false
        },
        {
            instrument: 0,
            program: 0,
            startTime: 0.375,
            endTime: 0.625,
            pitch: 67,
            velocity: 100,
            isDrum: false
        }
    ]
});
test('Parse Simple MIDI', (t) => {
    const midi = fs.readFileSync('../testdata/melody.mid');
    const ns = midi_io.midiToSequenceProto(midi);
    t.deepEqual(ns, simpleNs);
    const nsRoundTrip = midi_io.midiToSequenceProto(midi_io.sequenceProtoToMidi(ns));
    t.deepEqual(nsRoundTrip, simpleNs);
    t.end();
});
test('Create Simple MIDI File', (t) => {
    const midiFile = midi_io.sequenceProtoToMidi(simpleNs);
    t.deepEqual(midi_io.midiToSequenceProto(midiFile), simpleNs);
    t.end();
});
test('Create MIDI File With Polyphony', (t) => {
    const midiFile = midi_io.sequenceProtoToMidi(polyNs);
    t.deepEqual(midi_io.midiToSequenceProto(midiFile), polyNs);
    t.end();
});
test('Create MIDI File With Tempo Changes', (t) => {
    const ns = sequences.clone(simpleNs);
    ns.ticksPerQuarter = 240;
    ns.tempos = [
        { time: 0, qpm: 80 },
        { time: 0.75, qpm: 480 },
        { time: 1.25, qpm: 120 },
    ];
    const midiFile = midi_io.sequenceProtoToMidi(ns);
    t.deepEqual(midi_io.midiToSequenceProto(midiFile), ns);
    t.end();
});
test('Write MIDI Using Defaults', (t) => {
    const strippedNs = sequences.clone(simpleNs);
    strippedNs.tempos = undefined;
    strippedNs.timeSignatures = undefined;
    strippedNs.ticksPerQuarter = undefined;
    strippedNs.notes.forEach(n => {
        n.velocity = undefined;
        n.isDrum = undefined;
        n.instrument = undefined;
        n.program = undefined;
    });
    const expectedNs = sequences.clone(simpleNs);
    expectedNs.notes.forEach(n => {
        n.velocity = constants.DEFAULT_VELOCITY;
        n.program = constants.DEFAULT_PROGRAM;
    });
    const nsRoundTrip = midi_io.midiToSequenceProto(midi_io.sequenceProtoToMidi(strippedNs));
    t.deepEqual(nsRoundTrip, expectedNs);
    t.end();
});
//# sourceMappingURL=midi_io_test.js.map