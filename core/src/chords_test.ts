/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import * as chords from './chords';

import ChordEncodingException = chords.ChordEncodingException;
import ChordQuality = chords.ChordQuality;
import ChordSymbols = chords.ChordSymbols;

test('Test Chord Pitches', (t: test.Test) => {
  t.deepEqual(ChordSymbols.pitches('Am').sort((x, y) => x - y), [0, 4, 9]);
  t.deepEqual(
      ChordSymbols.pitches('D7b9').sort((x, y) => x - y), [0, 2, 3, 6, 9]);
  t.deepEqual(
      ChordSymbols.pitches('Fm7b5').sort((x, y) => x - y), [3, 5, 8, 11]);
  t.deepEqual(
      ChordSymbols.pitches('CmM7').sort((x, y) => x - y), [0, 3, 7, 11]);
  t.deepEqual(
      ChordSymbols.pitches('E##13').sort((x, y) => x - y), [1, 3, 4, 6, 8, 10]);
  t.deepEqual(ChordSymbols.pitches('G+').sort((x, y) => x - y), [3, 7, 11]);
  t.end();
});

test('Test Chord Root', (t: test.Test) => {
  // Note: not all of these chords can be parsed, but even so the roots can be
  // correctly identified.
  t.equal(ChordSymbols.root('Dm9'), 2);
  t.equal(ChordSymbols.root('E/G#'), 4);
  t.equal(ChordSymbols.root('Bsus2'), 11);
  t.equal(ChordSymbols.root('Abmaj7'), 8);
  t.equal(ChordSymbols.root('D##5(add6)'), 4);
  t.equal(ChordSymbols.root('F(b7)(#9)(b13)'), 5);
  t.end();
});

test('Test Chord Quality', (t: test.Test) => {
  // Test major chords.
  t.equal(ChordSymbols.quality('B13'), ChordQuality.Major);
  t.equal(ChordSymbols.quality('E7#9'), ChordQuality.Major);
  t.equal(ChordSymbols.quality('FMadd9'), ChordQuality.Major);
  t.equal(ChordSymbols.quality('C6'), ChordQuality.Major);
  t.equal(ChordSymbols.quality('Gmaj13'), ChordQuality.Major);

  // Test minor chords.
  t.equal(ChordSymbols.quality('C#m9'), ChordQuality.Minor);
  t.equal(ChordSymbols.quality('Gm7'), ChordQuality.Minor);
  t.equal(ChordSymbols.quality('CbmMaj7'), ChordQuality.Minor);
  t.equal(ChordSymbols.quality('Am6'), ChordQuality.Minor);
  t.equal(ChordSymbols.quality('Bbm'), ChordQuality.Minor);

  // Test augmented chords.
  t.equal(ChordSymbols.quality('D+add#9'), ChordQuality.Augmented);
  t.equal(ChordSymbols.quality('A+'), ChordQuality.Augmented);
  t.equal(ChordSymbols.quality('G7#5'), ChordQuality.Augmented);
  t.equal(ChordSymbols.quality('Faug'), ChordQuality.Augmented);

  // Test diminished chords.
  t.equal(ChordSymbols.quality('Am7b5'), ChordQuality.Diminished);
  t.equal(ChordSymbols.quality('Edim7'), ChordQuality.Diminished);
  t.equal(ChordSymbols.quality('Bbmb5'), ChordQuality.Diminished);
  t.equal(ChordSymbols.quality('Fo'), ChordQuality.Diminished);

  // Test other chords.
  t.equal(ChordSymbols.quality('G7no5'), ChordQuality.Other);
  t.equal(ChordSymbols.quality('Bbsus2'), ChordQuality.Other);
  t.equal(ChordSymbols.quality('Dsus'), ChordQuality.Other);
  t.equal(ChordSymbols.quality('Esus24'), ChordQuality.Other);
  t.equal(ChordSymbols.quality('Em7#5'), ChordQuality.Other);

  t.end();
});

test('Test Major/Minor Chord Encoder', (t: test.Test) => {
  const e = new chords.MajorMinorChordEncoder();
  t.equal(e.depth, 25);
  t.deepEqual(e.encode('G').shape, [25]);
  t.equal(tf.argMax(e.encode('N.C.')).dataSync()[0], 0);
  t.equal(tf.argMax(e.encode('C')).dataSync()[0], 1);
  t.equal(tf.argMax(e.encode('Cm')).dataSync()[0], 13);
  t.equal(tf.argMax(e.encode('F7')).dataSync()[0], 6);
  t.equal(tf.argMax(e.encode('Abm9')).dataSync()[0], 21);
  t.throws(() => e.encode('Gsus4'), ChordEncodingException);
  t.throws(() => e.encode('Bbdim'), ChordEncodingException);
  t.end();
});

test('Test Triad Chord Encoder', (t: test.Test) => {
  const e = new chords.TriadChordEncoder();
  t.equal(e.depth, 49);
  t.deepEqual(e.encode('G').shape, [49]);
  t.equal(tf.argMax(e.encode('N.C.')).dataSync()[0], 0);
  t.equal(tf.argMax(e.encode('C13')).dataSync()[0], 1);
  t.equal(tf.argMax(e.encode('CmMaj7')).dataSync()[0], 13);
  t.equal(tf.argMax(e.encode('Faug7')).dataSync()[0], 30);
  t.equal(tf.argMax(e.encode('Abm7b5')).dataSync()[0], 45);
  t.throws(() => e.encode('Gsus4'), ChordEncodingException);
  t.throws(() => e.encode('Bb7no5'), ChordEncodingException);
  t.end();
});

test('Test Pitch Chord Encoder', (t: test.Test) => {
  const e = new chords.PitchChordEncoder();
  t.equal(e.depth, 37);
  t.deepEqual(e.encode('G').shape, [37]);
  t.deepEqual(e.encode('N.C.').dataSync(), [
    1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
  ]);
  t.deepEqual(e.encode('C').dataSync(), [
    0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
  ]);
  t.deepEqual(e.encode('F#m').dataSync(), [
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0
  ]);
  t.deepEqual(e.encode('E13').dataSync(), [
    0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
  ]);
  t.deepEqual(e.encode('FmMaj7').dataSync(), [
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
  ]);
  t.end();
});
