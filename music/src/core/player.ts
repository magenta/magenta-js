/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as Tone from 'tone';
import {isNullOrUndefined} from 'util';

import {INoteSequence, NoteSequence} from '../protobuf/index';

import {sequences} from '.';
import {DEFAULT_DRUM_PITCH_CLASSES} from './data';

const DRUM_PITCH_TO_CLASSS = new Map<number, number>();
for (let c = 0; c < DEFAULT_DRUM_PITCH_CLASSES.length; ++c) {  // class
  DEFAULT_DRUM_PITCH_CLASSES[c].forEach((p) => {
    DRUM_PITCH_TO_CLASSS.set(p, c);
  });
}

const kick = new Tone.MembraneSynth().toMaster();
const tomLow = new Tone
                   .MembraneSynth({
                     pitchDecay: 0.008,
                     envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                   })
                   .toMaster();
const tomMid = new Tone
                   .MembraneSynth({
                     pitchDecay: 0.008,
                     envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                   })
                   .toMaster();
const tomHigh = new Tone
                    .MembraneSynth({
                      pitchDecay: 0.008,
                      envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                    })
                    .toMaster();
const closedHihat = new Tone
                        .MetalSynth({
                          frequency: 400,
                          envelope: {attack: 0.001, decay: 0.1, release: 0.8},
                          harmonicity: 5.1,
                          modulationIndex: 32,
                          resonance: 4000,
                          octaves: 1
                        })
                        .toMaster();
const openHihat =
    new Tone
        .MetalSynth({
          frequency: 400,
          envelope: {attack: 0.001, decay: 0.5, release: 0.8, sustain: 1},
          harmonicity: 5.1,
          modulationIndex: 32,
          resonance: 4000,
          octaves: 1
        })
        .toMaster();
const ride = new Tone.MetalSynth().toMaster();
const crash = new Tone
                  .MetalSynth({
                    frequency: 300,
                    envelope: {attack: 0.001, decay: 1, release: 3},
                    harmonicity: 5.1,
                    modulationIndex: 64,
                    resonance: 4000,
                    octaves: 1.5
                  })
                  .toMaster();
const snare =
    new Tone
        .NoiseSynth({
          noise: {type: 'white'},
          envelope: {attack: 0.005, decay: 0.05, sustain: 0.1, release: 0.4}
        })
        .toMaster();

const drumKit: Array<(time: number) => void> = [
  time => kick.triggerAttackRelease('C2', '8n', time),
  time => snare.triggerAttackRelease('16n', time),
  time => closedHihat.triggerAttack(time, 0.3),
  time => openHihat.triggerAttack(time, 0.3),
  time => tomLow.triggerAttack('G3', time, 0.5),
  time => tomMid.triggerAttack('C4', time, 0.5),
  time => tomHigh.triggerAttack('F4', time, 0.5),
  time => crash.triggerAttack(time, 1.0), time => ride.triggerAttack(time, 0.5)
];

export class Player {
  /* tslint:disable:no-any */
  private currentPart: any;
  private scheduledStop: number;
  private synths = new Map<number, any>();
  static tone = Tone;
  /* tslint:enable */

  constructor() {
    // Set a bpm of 60 to make dealing with timing easier. We will use seconds
    // instead of transport time since it can't go beyond 16th notes.
    Tone.Transport.bpm.value = 60;
  }

  /**
   * Starts playing a `NoteSequence` (either quantized or unquantized), and
   * returns a Promise that resolves when it is done playing.
   * @param seq The `NoteSequence` to play.
   * @param qpm (Optional) If specified, will play back at this qpm. If not
   * specified, will use either the qpm specified in the sequence or the default
   * of 120. Only valid for quantized sequences.
   * @returns a Promise that resolves when playback is complete.
   */
  start(seq: INoteSequence, qpm?: number): Promise<void> {
    sequences.assertIsQuantizedSequence(seq);

    if (sequences.isQuantizedSequence(seq)) {
      seq = sequences.unquantizeSequence(seq, qpm);
    } else if (qpm) {
      throw new Error('Cannot specify a `qpm` for a non-quantized sequence.');
    }

    this.currentPart = new Tone.Part(
        (t: number, n: NoteSequence.INote) => this.playNote(t, n),
        seq.notes.map(n => [n.startTime, n]));
    this.currentPart.start();
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
    }
    return new Promise(resolve => {
      this.scheduledStop = Tone.Transport.schedule(() => {
        this.stop();
        resolve();
      }, `+${seq.totalTime}`);
    });
  }

  private playNote(time: number, note: NoteSequence.INote) {
    if (note.isDrum) {
      const drumClass = DRUM_PITCH_TO_CLASSS.get(note.pitch);
      drumKit[drumClass](time);
    } else {
      const freq = new Tone.Frequency(note.pitch, 'midi');
      const dur = note.endTime - note.startTime;
      this.getSynth(note.instrument, note.program)
          .triggerAttackRelease(freq, dur, time);
    }
  }

  private getSynth(instrument: number, program?: number) {
    if (this.synths.has(instrument)) {
      return this.synths.get(instrument);
    } else if (!isNullOrUndefined(program) && program >= 32 && program <= 39) {
      const bass = new Tone.Synth({oscillator: {type: 'triangle'}}).toMaster();
      bass.volume.value = 5;
      this.synths.set(instrument, bass);
    } else {
      this.synths.set(instrument, new Tone.Synth().toMaster());
    }
    return this.synths.get(instrument);
  }

  /**
   * Stop playing the currently playing sequence right away.
   */
  stop() {
    if (this.currentPart) {
      this.currentPart.stop();
      this.currentPart = null;
    }
    Tone.Transport.clear(this.scheduledStop);
    this.scheduledStop = null;
  }

  isPlaying() {
    return !!this.currentPart;
  }
}
