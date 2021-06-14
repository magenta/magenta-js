import * as tf from '@tensorflow/tfjs';
import { Chord, Note } from 'tonal';
import * as constants from './constants';
const CHORD_QUALITY_INTERVALS = [
    ['1P', '3M', '5P'],
    ['1P', '3m', '5P'],
    ['1P', '3M', '5A'],
    ['1P', '3m', '5d'],
];
export var ChordQuality;
(function (ChordQuality) {
    ChordQuality[ChordQuality["Major"] = 0] = "Major";
    ChordQuality[ChordQuality["Minor"] = 1] = "Minor";
    ChordQuality[ChordQuality["Augmented"] = 2] = "Augmented";
    ChordQuality[ChordQuality["Diminished"] = 3] = "Diminished";
    ChordQuality[ChordQuality["Other"] = 4] = "Other";
})(ChordQuality || (ChordQuality = {}));
export class ChordSymbolException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class ChordEncodingException extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class ChordSymbols {
    static pitches(chord) {
        const root = Chord.tokenize(chord)[0];
        if (!root || !Chord.exists(chord)) {
            throw new ChordSymbolException(`Unrecognized chord symbol: ${chord}`);
        }
        const notes = Chord.notes(chord);
        return notes.map(Note.chroma);
    }
    static root(chord) {
        const root = Chord.tokenize(chord)[0];
        if (!root) {
            throw new ChordSymbolException(`Chord symbol has unknown root: ${chord}`);
        }
        return Note.chroma(root);
    }
    static quality(chord) {
        if (!Chord.exists(chord)) {
            throw new ChordSymbolException(`Unrecognized chord symbol: ${chord}`);
        }
        const intervals = Chord.intervals(chord);
        const qualities = CHORD_QUALITY_INTERVALS.map(cqis => cqis.every(cqi => intervals.includes(cqi)));
        const i = qualities.indexOf(true);
        const j = qualities.lastIndexOf(true);
        if (i >= 0 && i === j) {
            return i;
        }
        else {
            return ChordQuality.Other;
        }
    }
}
export class ChordEncoder {
    encodeProgression(chords, numSteps) {
        const encodedChords = chords.map(chord => this.encode(chord));
        const indices = Array.from(Array(numSteps).keys())
            .map(step => Math.floor(step * encodedChords.length / numSteps));
        return tf.stack(indices.map(i => encodedChords[i]));
    }
}
export function chordEncoderFromType(type) {
    switch (type) {
        case 'MajorMinorChordEncoder':
            return new MajorMinorChordEncoder();
        case 'TriadChordEncoder':
            return new TriadChordEncoder();
        case 'PitchChordEncoder':
            return new PitchChordEncoder();
        default:
            throw new Error(`Unknown chord encoder type: ${type}`);
    }
}
export class MajorMinorChordEncoder extends ChordEncoder {
    constructor() {
        super(...arguments);
        this.depth = 1 + 2 * constants.NUM_PITCH_CLASSES;
    }
    index(chord) {
        if (chord === constants.NO_CHORD) {
            return 0;
        }
        const root = ChordSymbols.root(chord);
        const quality = ChordSymbols.quality(chord);
        const index = 1 + quality * constants.NUM_PITCH_CLASSES + root;
        if (index >= this.depth) {
            throw new ChordEncodingException(`Chord is neither major nor minor: ${chord}`);
        }
        return index;
    }
    encode(chord) {
        return tf.tidy(() => tf.oneHot(tf.tensor1d([this.index(chord)], 'int32'), this.depth)
            .as1D());
    }
}
export class TriadChordEncoder extends ChordEncoder {
    constructor() {
        super(...arguments);
        this.depth = 1 + 4 * constants.NUM_PITCH_CLASSES;
    }
    index(chord) {
        if (chord === constants.NO_CHORD) {
            return 0;
        }
        const root = ChordSymbols.root(chord);
        const quality = ChordSymbols.quality(chord);
        const index = 1 + quality * constants.NUM_PITCH_CLASSES + root;
        if (index >= this.depth) {
            throw new ChordEncodingException(`Chord is not a standard triad: ${chord}`);
        }
        return index;
    }
    encode(chord) {
        return tf.tidy(() => tf.oneHot(tf.tensor1d([this.index(chord)], 'int32'), this.depth)
            .as1D());
    }
}
export class PitchChordEncoder extends ChordEncoder {
    constructor() {
        super(...arguments);
        this.depth = 1 + 3 * constants.NUM_PITCH_CLASSES;
    }
    encode(chord) {
        return tf.tidy(() => {
            if (chord === constants.NO_CHORD) {
                return tf.oneHot(tf.tensor1d([0], 'int32'), this.depth).as1D();
            }
            const root = ChordSymbols.root(chord);
            const rootEncoding = tf.oneHot(tf.tensor1d([root], 'int32'), constants.NUM_PITCH_CLASSES)
                .as1D();
            const pitchBuffer = tf.buffer([constants.NUM_PITCH_CLASSES]);
            ChordSymbols.pitches(chord).forEach(pitch => pitchBuffer.set(1.0, pitch));
            const pitchEncoding = pitchBuffer.toTensor().as1D();
            const bassEncoding = rootEncoding;
            return tf.concat1d([tf.tensor1d([0.0]), rootEncoding, pitchEncoding, bassEncoding]);
        });
    }
}
//# sourceMappingURL=chords.js.map