import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import { NoteSequence } from '../protobuf/index';
import * as constants from './constants';
import * as data from './data';
import * as sequences from './sequences';
const MEL_NS = NoteSequence.create({
    notes: [
        { pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2 },
        { pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4 },
        { pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6 },
        { pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8 },
        { pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10 },
        { pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16 },
        { pitch: 77, quantizedStartStep: 16, quantizedEndStep: 20 },
        { pitch: 80, quantizedStartStep: 20, quantizedEndStep: 24 },
        { pitch: 75, quantizedStartStep: 24, quantizedEndStep: 28 }
    ],
    tempos: [{ qpm: 120 }],
    quantizationInfo: { stepsPerQuarter: 2 },
    totalQuantizedSteps: 32,
});
const DRUM_NS = NoteSequence.create({
    notes: [
        { pitch: 36, quantizedStartStep: 0 }, { pitch: 42, quantizedStartStep: 0 },
        { pitch: 36, quantizedStartStep: 4 }, { pitch: 42, quantizedStartStep: 6 },
        { pitch: 36, quantizedStartStep: 8 }, { pitch: 42, quantizedStartStep: 10 },
        { pitch: 36, quantizedStartStep: 12 }, { pitch: 42, quantizedStartStep: 14 },
        { pitch: 36, quantizedStartStep: 16 }, { pitch: 36, quantizedStartStep: 24 },
        { pitch: 36, quantizedStartStep: 28 }, { pitch: 42, quantizedStartStep: 30 }
    ],
    tempos: [{ qpm: 120 }],
    quantizationInfo: { stepsPerQuarter: 2 }
});
DRUM_NS.notes.forEach(n => {
    n.isDrum = true;
    n.quantizedEndStep = n.quantizedStartStep + 1;
});
DRUM_NS.totalQuantizedSteps = 32;
const TRIO_NS = NoteSequence.create({ tempos: [{ qpm: 120 }] });
TRIO_NS.quantizationInfo =
    NoteSequence.QuantizationInfo.create({ stepsPerQuarter: 2 });
sequences.clone(MEL_NS).notes.forEach(n => {
    n.program = 0;
    n.instrument = 0;
    TRIO_NS.notes.push((n));
});
sequences.clone(MEL_NS).notes.forEach(n => {
    n.pitch -= 36;
    n.program = 32;
    n.instrument = 1;
    TRIO_NS.notes.push(n);
});
sequences.clone(DRUM_NS).notes.forEach(n => {
    n.instrument = 2;
    TRIO_NS.notes.push(n);
});
TRIO_NS.totalQuantizedSteps = 32;
const MULTITRACK_NS = NoteSequence.create({
    notes: [
        {
            pitch: 60,
            quantizedStartStep: 0,
            quantizedEndStep: 4,
            instrument: 0,
            program: 1,
            isDrum: false
        },
        {
            pitch: 67,
            quantizedStartStep: 2,
            quantizedEndStep: 4,
            instrument: 0,
            program: 1,
            isDrum: false
        },
        {
            pitch: 59,
            quantizedStartStep: 4,
            quantizedEndStep: 8,
            instrument: 0,
            program: 1,
            isDrum: false
        },
        {
            pitch: 67,
            quantizedStartStep: 6,
            quantizedEndStep: 8,
            instrument: 0,
            program: 1,
            isDrum: false
        },
        {
            pitch: 40,
            quantizedStartStep: 0,
            quantizedEndStep: 1,
            instrument: 1,
            program: 0,
            isDrum: true
        },
        {
            pitch: 50,
            quantizedStartStep: 2,
            quantizedEndStep: 3,
            instrument: 1,
            program: 0,
            isDrum: true
        },
        {
            pitch: 40,
            quantizedStartStep: 4,
            quantizedEndStep: 5,
            instrument: 1,
            program: 0,
            isDrum: true
        },
        {
            pitch: 50,
            quantizedStartStep: 6,
            quantizedEndStep: 7,
            instrument: 1,
            program: 0,
            isDrum: true
        },
    ],
    tempos: [{ qpm: 120 }],
    quantizationInfo: { stepsPerQuarter: 1 },
    totalQuantizedSteps: 8
});
const GROOVE_NS = NoteSequence.create({
    tempos: [{ qpm: 60 }],
    notes: [
        { pitch: 36, startTime: 0, velocity: 80 },
        { pitch: 42, startTime: 0.13, velocity: 10 },
        { pitch: 36, startTime: 1.3, velocity: 15 },
        { pitch: 42, startTime: 1.5, velocity: 8 },
        { pitch: 36, startTime: 2, velocity: 16 },
        { pitch: 42, startTime: 2.45, velocity: 4 },
        { pitch: 36, startTime: 3.1, velocity: 127 },
        { pitch: 42, startTime: 3.6, velocity: 80 },
        { pitch: 36, startTime: 4.1, velocity: 99 },
        { pitch: 36, startTime: 5.99, velocity: 2 },
        { pitch: 36, startTime: 7, velocity: 3 },
        { pitch: 42, startTime: 7.5, velocity: 22 }
    ],
    totalTime: 8.0
});
GROOVE_NS.notes.forEach(n => {
    n.endTime = n.startTime + 0.25;
    n.isDrum = true;
});
test('Test MelodyConverter', (t) => {
    const melConverter = new data.MelodyConverter({
        numSteps: 32,
        minPitch: 21,
        maxPitch: 108,
    });
    const melTensor = melConverter.toTensor(MEL_NS);
    t.deepEqual(melTensor.shape, [32, 90]);
    melConverter.toNoteSequence(melTensor, 2).then(ns => t.deepEqual(ns, MEL_NS));
    melTensor.dispose();
    t.end();
});
test('Test MelodyConverterWithPolyphonicInput', (t) => {
    const melConverter = new data.MelodyConverter({
        numSteps: 32,
        minPitch: 21,
        maxPitch: 108,
    });
    const polyMelNs = sequences.clone(MEL_NS);
    polyMelNs.notes[0].quantizedEndStep = 6;
    polyMelNs.notes.push(NoteSequence.Note.create({ pitch: 70, quantizedStartStep: 2, quantizedEndStep: 5 }));
    const melTensor = melConverter.toTensor(polyMelNs);
    t.deepEqual(melTensor.shape, [32, 90]);
    melConverter.toNoteSequence(melTensor, 2).then(ns => t.deepEqual(ns, MEL_NS));
    melTensor.dispose();
    const melConverterDisallowsPolyphony = new data.MelodyConverter({
        numSteps: 32,
        minPitch: 21,
        maxPitch: 108,
        ignorePolyphony: false,
    });
    t.throws(() => melConverterDisallowsPolyphony.toTensor(polyMelNs));
    t.end();
});
test('Test MelodyRhythmConverter', (t) => {
    const rhythmConverter = new data.MelodyRhythmConverter({
        numSteps: 32,
        minPitch: 21,
        maxPitch: 108,
    });
    const rhythmTensor = rhythmConverter.toTensor(MEL_NS);
    t.deepEqual(rhythmTensor.shape, [32, 1]);
    rhythmConverter.toNoteSequence(rhythmTensor);
    rhythmTensor.dispose();
    t.end();
});
test('Test MelodyShapeConverter', (t) => {
    const shapeConverter = new data.MelodyShapeConverter({
        numSteps: 32,
        minPitch: 21,
        maxPitch: 108,
    });
    const shapeTensor = shapeConverter.toTensor(MEL_NS);
    t.deepEqual(shapeTensor.shape, [32, 3]);
    shapeConverter.toNoteSequence(shapeTensor);
    shapeTensor.dispose();
    t.end();
});
test('Test DrumConverters', (t) => {
    const drumsConverter = new data.DrumsConverter({ numSteps: 32 });
    const drumsOneHotConverter = new data.DrumsOneHotConverter({ numSteps: 32 });
    const drumRollConverter = new data.DrumRollConverter({ numSteps: 32 });
    const drumRollTensor = drumsConverter.toTensor(DRUM_NS);
    t.deepEqual(drumRollTensor.dataSync(), drumRollConverter.toTensor(DRUM_NS).dataSync());
    t.deepEqual(drumRollTensor.shape, [32, 10]);
    const drumOneHotTensor = drumsOneHotConverter.toTensor(DRUM_NS);
    t.deepEqual(drumOneHotTensor.shape, [32, 512]);
    const value = tf.tidy(() => drumOneHotTensor.sum(1)
        .equal(tf.scalar(1, 'int32'))
        .sum()
        .arraySync());
    t.equal(value, 32);
    const drumRollTensorOutput = drumRollTensor.slice([0, 0], [32, 9]);
    drumRollConverter.toNoteSequence(drumRollTensorOutput, 2)
        .then(ns => t.deepEqual(ns, DRUM_NS));
    drumsConverter.toNoteSequence(drumOneHotTensor, 2)
        .then(ns => t.deepEqual(ns, DRUM_NS));
    drumsOneHotConverter.toNoteSequence(drumOneHotTensor, 2)
        .then(ns => t.deepEqual(ns, DRUM_NS));
    drumRollTensor.dispose();
    drumRollTensorOutput.dispose();
    drumOneHotTensor.dispose();
    t.end();
});
test('Test TrioConverter', (t) => {
    const trioConverter = new data.TrioConverter({
        numSteps: 32,
        melArgs: { minPitch: 21, maxPitch: 108 },
        bassArgs: { minPitch: 21, maxPitch: 108 },
        drumsArgs: {},
    });
    const trioTensor = trioConverter.toTensor(TRIO_NS);
    t.deepEqual(trioTensor.shape, [32, 90 + 90 + 512]);
    const value = tf.tidy(() => trioTensor.sum(1).equal(tf.scalar(3, 'int32')).sum().arraySync());
    t.equal(value, 32);
    trioConverter.toNoteSequence(trioTensor, 2)
        .then(ns => t.deepEqual(ns.toJSON(), TRIO_NS.toJSON()));
    trioTensor.dispose();
    t.end();
});
test('Test TrioRhythmConverter', (t) => {
    const trioRhythmConverter = new data.TrioRhythmConverter({
        numSteps: 32,
        melArgs: { minPitch: 21, maxPitch: 108 },
        bassArgs: { minPitch: 21, maxPitch: 108 },
        drumsArgs: {},
    });
    const trioRhythmTensor = trioRhythmConverter.toTensor(TRIO_NS);
    t.deepEqual(trioRhythmTensor.shape, [32, 3]);
    trioRhythmConverter.toNoteSequence(trioRhythmTensor, 2);
    trioRhythmTensor.dispose();
    t.end();
});
test('Test MultitrackConverter', (t) => {
    const multitrackConverter = new data.MultitrackConverter({
        'numSteps': 512,
        'numSegments': 8,
        'stepsPerQuarter': 1,
        'totalSteps': 8,
        'numVelocityBins': 0,
        'minPitch': 21,
        'maxPitch': 108
    });
    const multitrackTensor = multitrackConverter.toTensor(MULTITRACK_NS);
    t.deepEqual(multitrackTensor.shape, [512, multitrackConverter.depth]);
    multitrackConverter.toNoteSequence(multitrackTensor, 1)
        .then(ns => t.deepEqual(ns, MULTITRACK_NS));
    multitrackTensor.dispose();
    t.end();
});
function roundNoteTimes(notes, binsPerSecond = 1000) {
    notes.forEach(n => {
        n.startTime = Math.round(n.startTime * binsPerSecond) / binsPerSecond;
        n.endTime = Math.round(n.endTime * binsPerSecond) / binsPerSecond;
    });
}
test('Test GrooveConverter', (t) => {
    const grooveConverter = new data.GrooveConverter({ numSteps: 32 });
    const grooveTensor = grooveConverter.toTensor(GROOVE_NS);
    t.deepEqual(grooveTensor.shape, [32, 9 * 3]);
    grooveConverter.toNoteSequence(grooveTensor, undefined, 60).then(ns => {
        roundNoteTimes(ns.notes);
        t.deepEqual(ns, GROOVE_NS);
    });
    grooveTensor.dispose();
    t.end();
});
test('Test GrooveConverter TooLong', (t) => {
    const grooveConverter = new data.GrooveConverter({ numSteps: 32 });
    const longNs = sequences.clone(GROOVE_NS);
    longNs.notes[0].startTime = 8.1;
    t.throws(() => grooveConverter.toTensor(longNs));
    t.end();
});
test('Test GrooveConverter Split', (t) => {
    const grooveConverter = new data.GrooveConverter({ numSteps: 32, splitInstruments: true });
    const grooveTensor = grooveConverter.toTensor(GROOVE_NS);
    t.deepEqual(grooveTensor.shape, [32 * 9, 3]);
    grooveConverter.toNoteSequence(grooveTensor, undefined, 60).then(ns => {
        roundNoteTimes(ns.notes);
        t.deepEqual(ns, GROOVE_NS);
    });
    grooveTensor.dispose();
    t.end();
});
test('Test GrooveConverterHumanize', (t) => {
    const grooveConverter = new data.GrooveConverter({
        numSteps: 32,
        humanize: true,
    });
    const grooveTensor = grooveConverter.toTensor(GROOVE_NS);
    t.deepEqual(grooveTensor.shape, [32, 9 * 3]);
    const expectedNs = sequences.clone(GROOVE_NS);
    expectedNs.notes.forEach(n => n.velocity = 0);
    roundNoteTimes(expectedNs.notes, 4);
    grooveConverter.toNoteSequence(grooveTensor, undefined, 60).then(ns => {
        t.deepEqual(ns, expectedNs);
    });
    grooveTensor.dispose();
    t.end();
});
test('Test GrooveConverterTapify', (t) => {
    const grooveConverter = new data.GrooveConverter({
        numSteps: 16,
        stepsPerQuarter: 2,
        tapify: true,
    });
    const inputNs = sequences.clone(GROOVE_NS);
    inputNs.notes.forEach((n, i) => {
        n.pitch = i + 21;
        n.isDrum = Boolean(i % 2);
    });
    const grooveTensor = grooveConverter.toTensor(inputNs);
    t.deepEqual(grooveTensor.shape, [16, 9 * 3]);
    const expectedNs = NoteSequence.create({
        tempos: [{ qpm: 60 }],
        notes: [
            { pitch: 46, startTime: 0 }, { pitch: 46, startTime: 1.3 },
            { pitch: 46, startTime: 2 }, { pitch: 46, startTime: 2.45 },
            { pitch: 46, startTime: 3.1 }, { pitch: 46, startTime: 3.6 },
            { pitch: 46, startTime: 4.1 }, { pitch: 46, startTime: 5.99 },
            { pitch: 46, startTime: 7 }, { pitch: 46, startTime: 7.5 }
        ],
        totalTime: 8.0
    });
    expectedNs.notes.forEach(n => {
        n.endTime = n.startTime + 0.5;
        n.velocity = 0;
        n.isDrum = true;
    });
    grooveConverter.toNoteSequence(grooveTensor, undefined, 60)
        .then(ns => {
        roundNoteTimes(ns.notes);
        t.deepEqual(ns, expectedNs);
    })
        .then(() => {
        return grooveConverter.toNoteSequence(grooveTensor);
    })
        .then(ns => {
        expectedNs.tempos[0].qpm = constants.DEFAULT_QUARTERS_PER_MINUTE;
        expectedNs.totalTime /= 2;
        expectedNs.notes.forEach(n => {
            n.startTime /= 2;
            n.endTime /= 2;
        });
        roundNoteTimes(ns.notes);
        t.deepEqual(ns, expectedNs);
    })
        .then(() => {
        grooveTensor.dispose();
        t.end();
    });
});
//# sourceMappingURL=data_test.js.map