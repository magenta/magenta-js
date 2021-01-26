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
// @ts-ignore
import * as Tone from 'tone';

import {performance} from '../core/compat/global';
import {INoteSequence, NoteSequence} from '../protobuf/index';

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
    const sixteenthEnds = clickSeq.notes.map((n) => n.quantizedEndStep);
    const lastSixteenth = Math.max(...sixteenthEnds);
    for (let i = 0; i < lastSixteenth; i += 4) {
      const click: NoteSequence.INote = {
        pitch: i % 16 === 0 ? constants.LO_CLICK_PITCH :
                              constants.HI_CLICK_PITCH,
        quantizedStartStep: i,
        isDrum: true,
        quantizedEndStep: i + 1,
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
   * @throws {Error} If this or a different player is currently playing.
   */

  start(seq: INoteSequence, qpm?: number): Promise<void> {
    if (this.getPlayState() === 'started') {
      throw new Error('Cannot start playback; player is already playing.');
    } else if (this.getPlayState() === 'paused') {
      throw new Error('Cannot `start()` a paused player; use `resume()`.');
    }
    if (Tone.Transport.state !== 'stopped') {
      throw new Error(
          'Cannot start playback while `Tone.Transport` is in use.');
    }

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

    const thisPart = new Tone.Part((t: number, n: NoteSequence.INote) => {
      // Prevent playback after the part has been removed.
      if (this.currentPart !== thisPart) {
        return;
      }

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
    }, seq.notes.map((n) => [n.startTime, n]));
    this.currentPart = thisPart;

    if (this.desiredQPM) {
      Tone.Transport.bpm.value = this.desiredQPM;
    }
    this.currentPart.start();
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
    }
    return new Promise((resolve) => {
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
   * Returns a new NoteSequence with sustain pedal control changes applied.
   * Extends each note within a sustain to either the beginning of the next
   * note of the same pitch or the end of the sustain period, whichever happens
   * first. This is done on a per instrument basis, so notes are only affected
   * by sustain events for the same instrument. Drum notes will not be modified
   * @param noteSequence The NoteSequence for which to apply sustain. This
   * object will not be modified.
   * @param sustainControlNumber The MIDI control number for sustain pedal.
   * Control events with this number and value 0-63 will be treated as sustain
   * pedal OFF events, and control events with this number and value 64-127
   * will be treated as sustain pedal ON events.
   * @returns A copy of `note_sequence` but with note end times extended to
   * account for sustain.
   * @throws {Error}: If `note_sequence` is quantized.
   * Sustain can only be applied to unquantized note sequences.
   */

  applySustainControlChanges(
    noteSequence: INoteSequence, sustainControlNumber = 64): INoteSequence {

    const _SUSTAIN_ON = 0;
    const _SUSTAIN_OFF = 1;
    const _NOTE_ON = 2;
    const _NOTE_OFF = 3;

    const isQuantized = sequences.isQuantizedSequence(noteSequence);
    if (isQuantized) {
      throw new Error('Can only apply sustain to unquantized NoteSequence.');
    }

    const sequence = sequences.clone(noteSequence);

    // Sort all note on/off and sustain on/off events.
    const events: Array<{ time: number, type: string, event:{} }> = [];
    sequence.notes.forEach(note => {
      if (note.isDrum === false) {
        if (note.startTime !== null) {
          events.push({
            time: note.startTime,
            type: _NOTE_ON,
            event: note
          });
        }
        if (note.endTime !== null) {
          events.push({
            time: note.endTime,
            type: _NOTE_OFF,
            event: note
          });
        }
      }
    });
    sequence.controlChanges.forEach(cc => {
      if (cc.controlNumber === sustainControlNumber) {
        const value = cc.controlValue;
        if ( (value < 0) || (value > 127) ) {
          // warning: out of range
        }
        if (value >= 64) {
          events.push({
            time: cc.time,
            type: _SUSTAIN_ON,
            event: cc
          });
        } else if (value < 64) {
          events.push({
            time: cc.time,
            type: _SUSTAIN_OFF,
            event: cc
          });
        }
      }
    });

    // Sort, using the time and event type constants to ensure the order events
    // are processed.
    events.sort((a,b) => a.time-b.time );

    // Lists of active notes, keyed by instrument.
    const activeNotes = {};
    // Whether sustain is active for a given instrument.
    const susActive = {};
    // Iterate through all sustain on/off and note on/off events in order.
    let time = 0;
    events.forEach(item => {
      time = item.time;
      const type = item.type;
      const event = item.event;

      if (type === _SUSTAIN_ON) {
        susActive[event.instrument] = true;
      } else if (type === _SUSTAIN_OFF) {
        susActive[event.instrument] = false;
        // End all notes for the instrument that were being extended.
        const newActiveNotes: INote[] = [];
        activeNotes[event.instrument].forEach(note => {
          if (note.endTime < time) {
            // This note was being extended because of sustain.
            // Update the end time and don't keep it in the list.
            note.endTime = time;
            if (time > sequence.totalTime) {
              sequence.totalTime = time;
            }
          } else {
            // This note is actually still active, keep it.
            newActiveNotes.append(note);
          }
        });
        activeNotes[event.instrument] = newActiveNotes;
      } else if (type === _NOTE_ON) {
        if (susActive[event.instrument] === true) {
          // If sustain is on, end all previous notes with the same pitch.
          const newActiveNotes: INote[] = [];
          activeNotes[event.instrument].forEach(note => {
            if (note.pitch === event.pitch) {
              note.endTime = time;
              if (note.startTime === note.endTime) {
                // This note now has no duration because another note of the
                // same pitch started at the same time. Only one of these
                // notes should be preserved, so delete this one.
                sequence.notes.push(note);
              }
            } else {
              newActiveNotes.push(note);
            }
          });
          activeNotes[event.instrument] = newActiveNotes;
        }
        // Add this new note to the list of active notes.
        activeNotes[event.instrument].push(event);
      } else if(type === _NOTE_OFF) {
        if (susActive[event.instrument] === true) {
        //pass
        } else {
          // Remove this particular note from the active list.
          // It may have already been removed if a note of the same pitch was
          // played when sustain was active.
          const index = activeNotes[event.instrument].indexOf(event);
          if (index > -1) {
            activeNotes[event.instrument].splice(index, 1);
          }
        }
      } else {
        throw new Error(`Invalid event_type: ${event_type}`);
      }
    });
    // End any notes that were still active due to sustain.
    for (const instrument of activeNotes.values()) {
      for (const note of instrument) {
        note.endTime = time;
        sequence.totalTime = time;
      }
    }
    return sequence;
  }

  /**
   * Stop playing the currently playing sequence right away.
   */
  stop() {
    if (this.isPlaying()) {
      this.currentPart.stop();
      Tone.Transport.stop();
      this.currentPart = null;
    }
    Tone.Transport.clear(this.scheduledStop);
    this.scheduledStop = undefined;
    this.desiredQPM = undefined;
  }

  /**
   * Pause playing the currently playing sequence right away. Call resume()
   * to resume.
   * @throws {Error} If the player is stopped.
   */
  pause() {
    if (!this.isPlaying()) {
      throw new Error('Cannot pause playback while the player is stopped.');
    }
    Tone.Transport.pause();
  }

  /**
   * Resume playing the sequence after pause().
   * @throws {Error} If the player is not paused.
   */
  resume() {
    if (this.getPlayState() !== 'paused') {
      throw new Error(`Cannot resume playback while "${this.getPlayState()}".`);
    }
    Tone.Transport.start();
  }

  /**
   * Seek to a number of seconds in the NoteSequence.
   * @throws {Error} If the player is stopped.
   */
  seekTo(seconds: number) {
    if (!this.isPlaying()) {
      throw new Error('Cannot seek while the player is stopped.');
    }
    Tone.Transport.seconds = seconds;
  }

  /**
   * Returns false iff the player is completely stopped. This will only be
   * false after creating the player or after calling stop(), and will be true
   * after calling start(), pause() or resume().
   */
  isPlaying() {
    return !!this.currentPart;
  }

  /**
   * Returns the playback state of the player, either "started",
   * "stopped", or "paused".
   */
  getPlayState() {
    // Return "stopped" if some other player is playing.
    return this.isPlaying() ? Tone.Transport.state : 'stopped';
  }
}

/**
 * A singleton drum kit synthesizer with 9 pitch classed defined by
 * data.DEFAULT_DRUM_PITCH_CLASSES.
 */
class DrumKit {
  private static instance: DrumKit;
  private DRUM_PITCH_TO_CLASS = new Map<number, number>();
  private kick = new Tone.MembraneSynth().toDestination();
  private tomLow = new Tone
                       .MembraneSynth({
                         pitchDecay: 0.008,
                         envelope: {attack: 0.01, decay: 0.5, sustain: 0},
                       })
                       .toDestination();
  private tomMid = new Tone
                       .MembraneSynth({
                         pitchDecay: 0.008,
                         envelope: {attack: 0.01, decay: 0.5, sustain: 0},
                       })
                       .toDestination();
  private tomHigh = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.01, decay: 0.5, sustain: 0},
                        })
                        .toDestination();
  private closedHihat =
      new Tone
          .MetalSynth({
            frequency: 400,
            envelope: {attack: 0.001, decay: 0.1, release: 0.8},
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1,
          })
          .toDestination();
  private openHihat =
      new Tone
          .MetalSynth({
            frequency: 400,
            envelope: {attack: 0.001, decay: 0.5, release: 0.8, sustain: 1},
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1,
          })
          .toDestination();
  private ride = new Tone.MetalSynth().toDestination();
  private crash = new Tone
                      .MetalSynth({
                        frequency: 300,
                        envelope: {attack: 0.001, decay: 1, release: 3},
                        harmonicity: 5.1,
                        modulationIndex: 64,
                        resonance: 4000,
                        octaves: 1.5,
                      })
                      .toDestination();
  private snare =
      new Tone
          .NoiseSynth({
            noise: {type: 'white'},
            envelope: {attack: 0.005, decay: 0.05, sustain: 0.1, release: 0.4},
          })
          .toDestination();
  private loClick = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.001, decay: 0.3, sustain: 0},
                        })
                        .toDestination();
  private hiClick = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.001, decay: 0.3, sustain: 0},
                        })
                        .toDestination();
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
        this.hiClick.triggerAttack('C6', time, velocity),
  ];

  private constructor() {
    for (let c = 0; c < DEFAULT_DRUM_PITCH_CLASSES.length; ++c) {
      // class
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
  private drumKit = DrumKit.getInstance();

  private bassSynth = new Tone
                          .Synth({
                            volume: 5,
                            oscillator: {type: 'triangle'},
                          })
                          .toDestination();

  private polySynth = new Tone.PolySynth().toDestination();

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
      const freq = Tone.Frequency(note.pitch, 'midi').toFrequency();
      const dur = note.endTime - note.startTime;
      this.getSynth(note.instrument, note.program)
          .triggerAttackRelease(freq, dur, time, velocity);
    }
  }

  private getSynth(instrument: number, program?: number) {
    if (program !== undefined && program >= 32 && program <= 39) {
      return this.bassSynth;
    } else {
      return this.polySynth;
    }
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
      programOutputs?: Map<number, any>,  // tslint:disable-line:no-any
      drumOutputs?: Map<number, any>,     // tslint:disable-line:no-any
      callbackObject?: BasePlayerCallback) {
    super(false, callbackObject);
    this.soundFont = new soundfont.SoundFont(soundFontURL);
    this.output = output;
    this.programOutputs = programOutputs;
    this.drumOutputs = drumOutputs;
  }

  /**
   * Loads the audio samples required to play a NoteSequence.
   * @param seq The NoteSequence to be played.
   */
  async loadSamples(seq: INoteSequence): Promise<void> {
    await this.soundFont.loadSamples(
        seq.notes.map((note) => ({
                        pitch: note.pitch,
                        velocity: note.velocity,
                        program: note.program || 0,
                        isDrum: note.isDrum || false,
                      })));
  }

  /**
   * Loads the audio samples for all valid midi pitches, for a specific program.
   * **Note**: this method is rather slow; only use it if you're sure
   * that you need to load _all_ possible samples (for example, you're
   * playing a stream of live notes from the user) -- otherwise, if you already
   * have the NoteSequence you have to play, use `loadSamples` instead.
   *
   * If you do end up using `loadAllSamples`, make sure you're calling it
   * asynchronously, as to not block other main thread work (like UI
   * interactions) while waiting for it to finish.
   *
   * @param program (optional) Program number to use for instrument lookup.
   * Default is 0.
   * @param isDrum (optional) True if the drum status should be used for
   * instrument lookup. Default is false.
   */
  async loadAllSamples(program = 0, isDrum = false): Promise<void> {
    // Create a NoteSequence that has all the possible pitches and all the
    // possible velocities for the given program.
    const ns = NoteSequence.create();
    const min = isDrum ? constants.MIN_DRUM_PITCH : constants.MIN_PIANO_PITCH;
    const max = isDrum ? constants.MAX_DRUM_PITCH : constants.MAX_PIANO_PITCH;
    for (let i = min; i <= max; i++) {
      for (let j = constants.MIN_MIDI_VELOCITY; j < constants.MAX_MIDI_VELOCITY;
           j++) {
        ns.notes.push({pitch: i, velocity: j, program, isDrum});
      }
    }
    return this.loadSamples(ns);
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
   * twice without calling playNoteUp() in between, it will implicitly release
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
   * twice without calling playNoteDown() in between, it will *not* implicitly
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
 *    })
 *   ```
 *
 * If you want to specify which MIDI channel the messages should be sent on,
 * you can set the `outputChannel` property before calling `start`. By
 * default, the `outputChannel` is 0.
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
 *     });
 *   ```
 */
export class MIDIPlayer extends BasePlayer {
  public outputs: WebMidi.MIDIOutput[] = [];
  public outputChannel = 0;
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

    const msgOn = [this.NOTE_ON + this.outputChannel, note.pitch, velocity];
    const msgOff = [this.NOTE_OFF + this.outputChannel, note.pitch, velocity];

    const outputs = this.outputs ? this.outputs : this.availableOutputs;
    for (let i = 0; i < outputs.length; i++) {
      this.sendMessageToOutput(outputs[i], msgOn);
      this.sendMessageToOutput(outputs[i], msgOff, performance.now() + length);
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
   * this twice without calling playNoteUp() in between, it will implicitly
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
   * implicitly call playNoteDown() for you, and the second call will have no
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
