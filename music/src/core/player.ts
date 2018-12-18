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

import {INoteSequence, NoteSequence} from '../protobuf';

import {sequences} from '.';
import * as constants from './constants';
import {DEFAULT_DRUM_PITCH_CLASSES} from './data';
import * as soundfont from './soundfont';

function compareQuantizedNotes(a: NoteSequence.INote, b: NoteSequence.INote) {
  if (a.quantizedStartStep < b.quantizedStartStep) {
    return -1;
  }
  if (a.quantizedStartStep > b.quantizedStartStep) {
    return 1;
  }
  if (a.pitch < b.pitch) {
    return -1;
  }
  return 1;
}

/**
 * An abstract base class for providing arbitrary callbacks for each note
 * played.
 */
export abstract class BasePlayerCallback {
  /**
   * Will be called for each time/note pair in a sequence being played.
   *
   * @param n The note being played at the moment.
   * @param t The time at which the note is being played.
   */
  abstract run(n: NoteSequence.INote, t?: number): void;

  /*  Will be called when a sequence is stopped.
   */
  abstract stop(): void;
}

/**
 * Abstract base class for a `NoteSequence` player based on Tone.js.
 */
export abstract class BasePlayer {
  protected currentPart: any;  // tslint:disable-line:no-any
  protected scheduledStop: number;
  protected playClick: boolean;
  protected callbackObject: BasePlayerCallback;
  protected desiredQPM: number;

  protected abstract playNote(time: number, note: NoteSequence.INote): void;

  /**
   *   `BasePlayer` constructor.
   *
   *   @param playClick A boolean, determines whether the click will be played.
   *   @param callbackObject An optional BasePlayerCallback, specifies an
   *     object that contains run() and stop() methods to invode during
   *     playback.
   */
  constructor(playClick = false, callbackObject?: BasePlayerCallback) {
    this.playClick = playClick;
    this.callbackObject = callbackObject;
    this.desiredQPM = undefined;
  }

  /**
   * Changes the tempo of the playback.
   *
   * @param qpm The new qpm to use.
   */
  setTempo(qpm: number) {
    this.desiredQPM = qpm;
    if (Tone.Transport.state === 'started') {
      Tone.Transport.bpm.value = qpm;
    }
  }

  /**
   * Adds a click track to an existing note sequence.
   * @param seq The `NoteSequence` to augment with a click track.
   */
  private makeClickSequence(seq: INoteSequence): INoteSequence {
    const clickSeq = sequences.clone(seq);
    const sixteenthEnds = clickSeq.notes.map(n => n.quantizedEndStep);
    const lastSixteenth = Math.max(...sixteenthEnds);
    for (let i = 0; i < lastSixteenth; i += 4) {
      const click: NoteSequence.INote = {
        pitch: i % 16 === 0 ? constants.LO_CLICK_PITCH :
                              constants.HI_CLICK_PITCH,
        quantizedStartStep: i,
        isDrum: true,
        quantizedEndStep: i + 1
      };
      clickSeq.notes.push(click);
    }
    clickSeq.notes.sort(compareQuantizedNotes);
    return clickSeq;
  }

  /**
   * Resumes the Audio context. Due to autoplay restrictions, you must call
   * this function in a click handler (i.e. as a result of a user action) before
   * you can start playing audio with a player. This is already done in start(),
   * but you might have to call it yourself if you have any deferred/async
   * calls.
   */
  resumeContext() {
    Tone.context.resume();
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
    this.resumeContext();
    const isQuantized = sequences.isQuantizedSequence(seq);
    if (this.playClick && isQuantized) {
      seq = this.makeClickSequence(seq);
    }
    if (qpm) {
      Tone.Transport.bpm.value = qpm;
    } else if (seq.tempos && seq.tempos.length > 0 && seq.tempos[0].qpm > 0) {
      Tone.Transport.bpm.value = seq.tempos[0].qpm;
    } else {
      Tone.Transport.bpm.value = constants.DEFAULT_QUARTERS_PER_MINUTE;
    }
    if (isQuantized) {
      seq = sequences.unquantizeSequence(seq, qpm);
    } else if (qpm) {
      throw new Error('Cannot specify a `qpm` for a non-quantized sequence.');
    }

    this.currentPart = new Tone.Part((t: number, n: NoteSequence.INote) => {
      if (this.playClick ||
          (n.pitch !== constants.LO_CLICK_PITCH &&
           n.pitch !== constants.HI_CLICK_PITCH)) {
        this.playNote(t, n);
      }
      if (this.callbackObject) {
        Tone.Draw.schedule(() => {
          this.callbackObject.run(n, t);
        }, t);
      }
    }, seq.notes.map(n => [n.startTime, n]));
    if (this.desiredQPM) {
      Tone.Transport.bpm.value = this.desiredQPM;
    }
    this.currentPart.start();
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
    }
    return new Promise(resolve => {
      this.scheduledStop = Tone.Transport.schedule(() => {
        this.stop();
        resolve();
        if (this.callbackObject) {
          this.callbackObject.stop();
        }
      }, `+${seq.totalTime}`);
    });
  }

  /**
   * Stop playing the currently playing sequence right away.
   */
  stop() {
    if (this.currentPart) {
      this.currentPart.stop();
      Tone.Transport.stop();
      this.currentPart = null;
    }
    Tone.Transport.clear(this.scheduledStop);
    this.scheduledStop = undefined;
    this.desiredQPM = undefined;
  }

  /**
   * Pause playing the currently playing sequence right away. Call unpause()
   * to resume.
   */
  pause() {
    Tone.Transport.pause();
  }

  /**
   * Pause playing the currently playing sequence right away. Call resume()
   * to resume playing the sequence.
   */
  resume() {
    Tone.Transport.start();
  }

  /**
   * Returns true iff the player is completely stopped. This will only be
   * false after calling stop(), and will be true after calling
   * start(), pause() or unpause().
   */
  isPlaying() {
    return !!this.currentPart;
  }

  /**
   * Returns the playback state of the player, either "started",
   * "stopped", or "paused".
   */
  getPlayState() {
    return Tone.Transport.state;
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
    (time: number, velocity = 1) =>
        this.kick.triggerAttackRelease('C2', '8n', time, velocity),
    (time: number, velocity = 1) =>
        this.snare.triggerAttackRelease('16n', time, velocity),
    (time: number, velocity = 1) =>
        this.closedHihat.triggerAttack(time, 0.3, velocity),
    (time: number, velocity = 1) =>
        this.openHihat.triggerAttack(time, 0.3, velocity),
    (time: number, velocity = 0.5) =>
        this.tomLow.triggerAttack('G3', time, velocity),
    (time: number, velocity = 0.5) =>
        this.tomMid.triggerAttack('C4', time, velocity),
    (time: number, velocity = 0.5) =>
        this.tomHigh.triggerAttack('F4', time, velocity),
    (time: number, velocity = 1) =>
        this.crash.triggerAttack(time, 1.0, velocity),
    (time: number, velocity = 1) =>
        this.ride.triggerAttack(time, 0.5, velocity),
    (time: number, velocity = 0.5) =>
        this.loClick.triggerAttack('G5', time, velocity),
    (time: number, velocity = 0.5) =>
        this.hiClick.triggerAttack('C6', time, velocity)
  ];

  private constructor() {
    for (let c = 0; c < DEFAULT_DRUM_PITCH_CLASSES.length; ++c) {  // class
      DEFAULT_DRUM_PITCH_CLASSES[c].forEach((p) => {
        this.DRUM_PITCH_TO_CLASS.set(p, c);
      });
    }
    this.DRUM_PITCH_TO_CLASS.set(
        constants.LO_CLICK_PITCH, constants.LO_CLICK_CLASS);
    this.DRUM_PITCH_TO_CLASS.set(
        constants.HI_CLICK_PITCH, constants.HI_CLICK_CLASS);
  }

  static getInstance() {
    if (!DrumKit.instance) {
      DrumKit.instance = new DrumKit();
    }
    return DrumKit.instance;
  }

  public playNote(pitch: number, time: number, velocity: number) {
    this.pitchPlayers[this.DRUM_PITCH_TO_CLASS.get(pitch)](time, velocity);
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
    // If there's a velocity, use it.
    const velocity = note.hasOwnProperty('velocity') ?
        note.velocity / constants.MAX_MIDI_VELOCITY :
        undefined;

    if (note.isDrum) {
      this.drumKit.playNote(note.pitch, time, velocity);
    } else {
      const freq = new Tone.Frequency(note.pitch, 'midi');
      const dur = note.endTime - note.startTime;
      this.getSynth(note.instrument, note.program)
          .triggerAttackRelease(freq, dur, time, velocity);
    }
  }

  private getSynth(instrument: number, program?: number) {
    if (this.synths.has(instrument)) {
      return this.synths.get(instrument);
    } else if (program !== undefined && program >= 32 && program <= 39) {
      const bass = new Tone.Synth({oscillator: {type: 'triangle'}}).toMaster();
      bass.volume.value = 5;
      this.synths.set(instrument, bass);
    } else {
      this.synths.set(instrument, new Tone.PolySynth(10).toMaster());
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
 *
 *   `player.loadSamples(seq).then(() => {
 *      player.start(seq)
 *    })`
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
      programOutputs?: Map<number, any>,      // tslint:disable-line:no-any
      drumOutputs?: Map<number, any>,         // tslint:disable-line:no-any
      callbackObject?: BasePlayerCallback) {  // tslint:disable-line:no-any
    super(false, callbackObject);
    this.soundFont = new soundfont.SoundFont(soundFontURL);
    this.output = output;
    this.programOutputs = programOutputs;
    this.drumOutputs = drumOutputs;
  }

  async loadSamples(seq: INoteSequence): Promise<void> {
    await this.soundFont.loadSamples(
        seq.notes.map((note) => ({
                        pitch: note.pitch,
                        velocity: note.velocity,
                        program: note.program || 0,
                        isDrum: note.isDrum || false
                      })));
  }

  /**
   * Resumes the Audio context. Due to autoplay restrictions, you must call
   * this function in a click handler (i.e. as a result of a user action) before
   * you can start playing audio with a player. This is already done in start(),
   * but you might have to call it yourself if you have any deferred/async
   * calls.
   */
  resumeContext() {
    Tone.context.resume();
  }

  start(seq: INoteSequence, qpm?: number): Promise<void> {
    this.resumeContext();
    return this.loadSamples(seq).then(() => super.start(seq, qpm));
  }

  protected playNote(time: number, note: NoteSequence.INote) {
    this.soundFont.playNote(
        note.pitch, note.velocity, time, note.endTime - note.startTime,
        note.program, note.isDrum, this.getAudioNodeOutput(note));
  }

  /*
   * Plays the down stroke of a note (the attack and the sustain).
   * Note that this does not call `loadSamples`, and assumes that the
   * sample for this note is already loaded. If you call this
   * twice without calling playNoteUp() in between, it will implicitely release
   * the note before striking it the second time.
   */
  public playNoteDown(note: NoteSequence.INote) {
    this.soundFont.playNoteDown(
        note.pitch, note.velocity, note.program, note.isDrum,
        this.getAudioNodeOutput(note));
  }

  /*
   * Plays the up stroke of a note (the release).
   * Note that this does not call `loadSamples`, and assumes that the
   * sample for this note is already loaded. If you call this
   * twice without calling playNoteDown() in between, it will *not* implicitely
   * call playNoteDown() for you, and the second call will have no noticeable
   * effect.
   */
  public playNoteUp(note: NoteSequence.INote) {
    this.soundFont.playNoteUp(
        note.pitch, note.velocity, note.program, note.isDrum,
        this.getAudioNodeOutput(note));
  }

  getAudioNodeOutput(note: NoteSequence.INote) {
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
    return output;
  }
}

/**
 * A `NoteSequence` player based on Tone.js that includes a click track and a
 * callback object to be called while playing notes.
 */
export class PlayerWithClick extends Player {
  /**
   *   `PlayerWithClick constructor
   *
   *   @param callbackObject An optional BasePlayerCallback, specifies an
   *     object that contains run() and stop() methods to invode during
   *     playback.
   */
  constructor(callbackObject?: BasePlayerCallback) {
    super(true, callbackObject);
  }
}

/**
 * A `NoteSequence` player that uses a MIDI output for playing. Note that
 * WebMIDI is not supported in all browsers. A
 * [polyfill](https://cwilso.github.io/WebMIDIAPIShim/) exists, but it too
 * requires a plugin to be installed on the user's computer, so it might not
 * work in all cases.
 *
 * If you want to use a particular MIDI output port, you must update the
 * `output` property before calling `start`, otherwise a message will be sent to
 * all connected MIDI outputs:
 *
 * Example (easy mode):
 *
 *   ```
 *    const player = new mm.MIDIPlayer();
 *    player.requestMIDIAccess().then(() => {
 *      // For example, use only the first port. If you omit this,
 *      // a message will be sent to all ports.
 *      player.outputs = [player.availableOutputs[0]];
 *      player.start(seq);
 *    })```
 *
 * You can also explicitly request MIDI access outside of the player, in
 * your application, and just update the `output` property before playing:
 *
 * Example (advanced mode):
 *
 *   ```
 *    navigator.requestMIDIAccess().then((midi) => {
 *       // Get all the MIDI outputs to show them in a <select> (for example)
 *       const availableOutputs = [];
 *       const it = midi.outputs.values();
 *       for (let o = it.next(); o && !o.done; o = it.next()) {
 *          availableOutputs.push(o.value);
 *       }
 *       // Populate the <select>
 *       const el = document.querySelector('select');
 *       el.innerHTML = availableOutputs.map(i =>
 *           `<option>${i.name}</option>`).join('');
 *
 *       // Use the selected output port.
 *       player = new mm.MIDIPlayer();
 *       player.outputs = [availableOutputs[el.selectedIndex]];
 *       player.start(seq)
 *     });```
 */
export class MIDIPlayer extends BasePlayer {
  public outputs: WebMidi.MIDIOutput[] = [];
  public readonly availableOutputs: WebMidi.MIDIOutput[] = [];
  private NOTE_ON = 0x90;
  private NOTE_OFF = 0x80;

  /**
   *   `MIDIPlayer` constructor.
   *
   *   @param callbackObject An optional BasePlayerCallback, specifies an
   *     object that contains run() and stop() methods to invode during
   *     playback.
   */
  constructor(callbackObject?: BasePlayerCallback) {
    super(false, callbackObject);
  }

  /**
   * Requests MIDI access from the user, and stores all available MIDI outputs.
   */
  async requestMIDIAccess() {
    if (navigator.requestMIDIAccess) {
      return new Promise((resolve, reject) => {
        navigator.requestMIDIAccess().then((midi) => {
          // Also react to device changes.
          midi.addEventListener(
              'statechange',
              (event: WebMidi.MIDIMessageEvent) => this.initOutputs(midi));
          resolve(this.initOutputs(midi));
        }, (err) => console.log('Something went wrong', reject(err)));
      });
    } else {
      return null;
    }
  }

  private initOutputs(midi: WebMidi.MIDIAccess) {
    const outputs = midi.outputs.values();
    for (let output = outputs.next(); output && !output.done;
         output = outputs.next()) {
      this.availableOutputs.push(output.value);
    }
    return this.availableOutputs;
  }

  protected playNote(time: number, note: NoteSequence.INote) {
    // Some good defaults.
    const velocity = note.velocity || 100;
    const length = (note.endTime - note.startTime) * 1000;  // in ms.

    const msgOn = [this.NOTE_ON, note.pitch, velocity];
    const msgOff = [this.NOTE_OFF, note.pitch, velocity];

    const outputs = this.outputs ? this.outputs : this.availableOutputs;
    for (let i = 0; i < outputs.length; i++) {
      this.sendMessageToOutput(outputs[i], msgOn);
      this.sendMessageToOutput(
          outputs[i], msgOff, window.performance.now() + length);
    }
  }

  private sendMessageToOutput(
      output: WebMidi.MIDIOutput, message: number[], time?: number) {
    if (output) {
      output.send(message, time);
    }
  }

  /*
   * Plays the down stroke of a note (the attack and the sustain). If you call
   * this twice without calling playNoteUp() in between, it will implicitely
   * release the note before striking it the second time.
   */
  public playNoteDown(note: NoteSequence.INote) {
    const msgOn = [this.NOTE_ON, note.pitch, note.velocity];
    const outputs = this.outputs ? this.outputs : this.availableOutputs;
    for (let i = 0; i < outputs.length; i++) {
      this.sendMessageToOutput(outputs[i], msgOn);
    }
  }

  /*
   * Plays the up stroke of a note (the release). If you call this
   * twice without calling playNoteDown() in between, it will *not*
   * implicitely call playNoteDown() for you, and the second call will have no
   * noticeable effect.
   */
  public playNoteUp(note: NoteSequence.INote) {
    const msgOff = [this.NOTE_OFF, note.pitch, note.velocity];
    const outputs = this.outputs ? this.outputs : this.availableOutputs;
    for (let i = 0; i < outputs.length; i++) {
      this.sendMessageToOutput(
          outputs[i], msgOff, note.endTime - note.startTime);
    }
  }
}
