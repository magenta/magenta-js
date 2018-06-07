/**
 * A module containing a Tone.js-powered player for `NoteSequences`.
 *
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
 */

/**
 * Imports
 */
import * as Tone from 'tone';
import {isNullOrUndefined} from 'util';

import {INoteSequence, NoteSequence} from '../protobuf/index';

import {sequences} from '.';
import * as constants from './constants';
import {DEFAULT_DRUM_PITCH_CLASSES} from './data';
import * as soundfont from './soundfont';

function compareQuantizedNotes(a: NoteSequence.INote, b: NoteSequence.INote) {
  if (a.quantizedStartStep < b.quantizedStartStep)
    return -1;
  if (a.quantizedStartStep > b.quantizedStartStep)
    return 1;
  if (a.pitch < b.pitch)
    return -1;
  return 1;
}

/**
 * Abstract base class for a `NoteSequence` player based on Tone.js.
 */
export abstract class BasePlayer {
  private currentPart: any;  // tslint:disable-line:no-any
  private scheduledStop: number;

  protected abstract playNote(time: number, note: NoteSequence.INote): void;

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
   * specified, will use either the qpm specified in the sequence or the
   * default of 120. Only valid for quantized sequences.
   * @returns a Promise that resolves when playback is complete.
   */
  start(seq: INoteSequence, qpm?: number): Promise<void> {
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

/**
 * A singleton drum kit synthesizer with 9 pitch classed defined by
 * data.DEFAULT_DRUM_PITCH_CLASSES.
 */
class DrumKit {
  private static instance: DrumKit;
  private DRUM_PITCH_TO_CLASS = new Map<number, number>();
  private kick = new Tone.MembraneSynth().toMaster();
  private tomLow = new Tone
                       .MembraneSynth({
                         pitchDecay: 0.008,
                         envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                       })
                       .toMaster();
  private tomMid = new Tone
                       .MembraneSynth({
                         pitchDecay: 0.008,
                         envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                       })
                       .toMaster();
  private tomHigh = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.01, decay: 0.5, sustain: 0}
                        })
                        .toMaster();
  private closedHihat =
      new Tone
          .MetalSynth({
            frequency: 400,
            envelope: {attack: 0.001, decay: 0.1, release: 0.8},
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1
          })
          .toMaster();
  private openHihat =
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
  private ride = new Tone.MetalSynth().toMaster();
  private crash = new Tone
                      .MetalSynth({
                        frequency: 300,
                        envelope: {attack: 0.001, decay: 1, release: 3},
                        harmonicity: 5.1,
                        modulationIndex: 64,
                        resonance: 4000,
                        octaves: 1.5
                      })
                      .toMaster();
  private snare =
      new Tone
          .NoiseSynth({
            noise: {type: 'white'},
            envelope: {attack: 0.005, decay: 0.05, sustain: 0.1, release: 0.4}
          })
          .toMaster();
  private loClick = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.001, decay: 0.3, sustain: 0}
                        })
                        .toMaster();
  private hiClick = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.001, decay: 0.3, sustain: 0}
                        })
                        .toMaster();
  private pitchPlayers = [
    (time: number) => this.kick.triggerAttackRelease('C2', '8n', time),
    (time: number) => this.snare.triggerAttackRelease('16n', time),
    (time: number) => this.closedHihat.triggerAttack(time, 0.3),
    (time: number) => this.openHihat.triggerAttack(time, 0.3),
    (time: number) => this.tomLow.triggerAttack('G3', time, 0.5),
    (time: number) => this.tomMid.triggerAttack('C4', time, 0.5),
    (time: number) => this.tomHigh.triggerAttack('F4', time, 0.5),
    (time: number) => this.crash.triggerAttack(time, 1.0),
    (time: number) => this.ride.triggerAttack(time, 0.5),
    (time: number) => this.loClick.triggerAttack('G5', time, 0.5),
    (time: number) => this.hiClick.triggerAttack('C6', time, 0.5)
  ];

  private constructor() {
    for (let c = 0; c < DEFAULT_DRUM_PITCH_CLASSES.length; ++c) {  // class
      DEFAULT_DRUM_PITCH_CLASSES[c].forEach((p) => {
        this.DRUM_PITCH_TO_CLASS.set(p, c);
      });
    }
    this.DRUM_PITCH_TO_CLASS.set(constants.LO_CLICK_PITCH,
                                 constants.LO_CLICK_CLASS);
    this.DRUM_PITCH_TO_CLASS.set(constants.HI_CLICK_PITCH,
                                 constants.HI_CLICK_CLASS);
  }

  static getInstance() {
    if (!DrumKit.instance) {
      DrumKit.instance = new DrumKit();
    }
    return DrumKit.instance;
  }

  public playNote(pitch: number, time: number) {
    this.pitchPlayers[this.DRUM_PITCH_TO_CLASS.get(pitch)](time);
  }
}

/**
 * A `NoteSequence` player based on Tone.js.
 */
export class Player extends BasePlayer {
  private synths = new Map<number, any>();  // tslint:disable-line:no-any
  private drumKit = DrumKit.getInstance();

  /**
   * The Tone module being used.
   */
  static readonly tone = Tone;  // tslint:disable-line:no-any

  protected playNote(time: number, note: NoteSequence.INote) {
    if (note.isDrum) {
      this.drumKit.playNote(note.pitch, time);
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
}

/**
 * A `NoteSequence` player based on Tone.js that uses SoundFont samples. The
 * `loadSamples` method may be called before `start` so that the samples
 * necessary for playing the sequence will be loaded and playing will begin
 * immediately upon `start`.
 *
 * Example (explicitly loading samples):
 *
 *   `player.loadSamples(seq).then(() => player.start(seq))`
 *
 * Explicitly loads samples, so that playing starts immediately when `start` is
 * called.
 *
 * Example (implicitly loading samples):
 *
 *   `player.start(seq)`
 *
 * If the samples for `seq` have not already been loaded, playing will only
 * start after all necessary samples have been loaded.
 */
export class SoundFontPlayer extends BasePlayer {
  private soundFont: soundfont.SoundFont;
  private output: any;                       // tslint:disable-line:no-any
  private programOutputs: Map<number, any>;  // tslint:disable-line:no-any
  private drumOutputs: Map<number, any>;     // tslint:disable-line:no-any

  constructor(
      soundFontURL: string, output = Tone.Master,
      programOutputs?: Map<number, any>,  // tslint:disable-line:no-any
      drumOutputs?: Map<number, any>) {   // tslint:disable-line:no-any
    super();
    this.soundFont = new soundfont.SoundFont(soundFontURL);
    this.output = output;
    this.programOutputs = programOutputs;
    this.drumOutputs = drumOutputs;
  }

  async loadSamples(seq: INoteSequence): Promise<void> {
    await this.soundFont.loadSamples(seq.notes.map((note) => ({
                                                     pitch: note.pitch,
                                                     velocity: note.velocity,
                                                     program: note.program,
                                                     isDrum: note.isDrum
                                                   })));
  }

  start(seq: INoteSequence, qpm?: number): Promise<void> {
    return this.loadSamples(seq).then(() => super.start(seq, qpm));
  }

  protected playNote(time: number, note: NoteSequence.INote) {
    // Determine which `AudioNode` to use for output. Non-drums are mapped to
    // outputs by program number, while drums are mapped to outputs by MIDI
    // pitch value. A single output (defaulting to `Tone.Master`) is used as a
    // fallback.
    let output = this.output;
    if (this.programOutputs && !note.isDrum) {
      if (this.programOutputs.has(note.program)) {
        output = this.programOutputs.get(note.program);
      }
    } else if (this.drumOutputs && note.isDrum) {
      if (this.drumOutputs.has(note.pitch)) {
        output = this.drumOutputs.get(note.pitch);
      }
    }

    this.soundFont.playNote(
        note.pitch, note.velocity, time, note.endTime - note.startTime,
        note.program, note.isDrum, output);
  }
}

/**
 * A `NoteSequence` player based on Tone.js that includes a click track.
 */
export class PlayerWithClick extends Player {
  /**
   * Starts playing a `NoteSequence` (either quantized or unquantized) which
   * includes a click track, and returns a Promise that resolves when it is
   * done playing.  @param seq The `NoteSequence` to play.  @param qpm
   * (Optional) If specified, will play back at this qpm. If not specified,
   * will use either the qpm specified in the sequence or the default of 120.
   * Only valid for quantized sequences.  @returns a Promise that resolves when
   * playback is complete.
   */
  start(seq: INoteSequence, qpm?: number): Promise<void> {
    let clickSeq:INoteSequence = {
      notes: [],
      quantizationInfo: seq.quantizationInfo
    };
    for (let i = 0; i < seq.notes.length; ++i) {
      clickSeq.notes.push(seq.notes[i]);
    }
    var sixteenthEnds = clickSeq.notes.map(n => n.quantizedEndStep);
    var lastSixteenth = sixteenthEnds.reduce(
      function(a, b) { return Math.max(a, b); });
    for (let i = 0; i < lastSixteenth; i += 4) {
      let click:NoteSequence.INote = {
        pitch: i % 16 == 0 ? 90 : 89,
        quantizedStartStep: i,
        isDrum: true,
        quantizedEndStep: i + 1
      };
      clickSeq.notes.push(click);
    }
    clickSeq.notes.sort(compareQuantizedNotes);
    seq = clickSeq;
    return super.start(clickSeq, qpm);
  }
}
