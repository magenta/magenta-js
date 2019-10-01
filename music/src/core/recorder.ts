/**
 * A module containing a MIDI recorder. Note that WebMIDI only works natively
 * on Chrome. For this to work on other browsers, you need to load
 * the [WebMIDI polyfill]{@link http://cwilso.github.io/WebMIDIAPIShim/}
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
// @ts-ignore
import * as Tone from 'tone';

import {NoteSequence} from '../protobuf/index';

import {DEFAULT_QUARTERS_PER_MINUTE} from './constants';

/**
 * An interface for providing configurable properties to a Recorder.
 * @param qpm The tempo at which to play the click track.
 * @param playClick Whether to play a click track while recording.
 * @param playCountIn Whether to play a count-in click at the beginning of
 * the recording.
 * @param startRecordingAtFirstNote Whether to start the note time offset at
 * the first note received instead of the start of the recording.  Defaults to
 * false.
 */
interface RecorderConfig {
  qpm?: number;
  playClick?: boolean;
  playCountIn?: boolean;
  startRecordingAtFirstNote?: boolean;
}

/**
 * An abstract base class for providing arbitrary callbacks for each note
 * recorded.
 */
export abstract class BaseRecorderCallback {
  /**
   * Will be called for each time a note is recorded.
   *
   * @param seq The note sequence up to this point.
   */
  abstract run(seq: NoteSequence): void;
  /**
   * Will be called for each time a note on event is observed.
   *
   * @param pitch The pitch of the midi event received.
   * @param velocity The velocity of the midi event received.
   * @param device The device the midi event was received from.
   */
  abstract noteOn(pitch: number, velocity: number, device: EventTarget): void;
  /**
   * Will be called for each time a note off event is observed.
   *
   * @param pitch The pitch of the midi event received.
   * @param velocity The velocity of the midi event received.
   * @param device The device the midi event was received from.
   */
  abstract noteOff(pitch: number, velocity: number, device: EventTarget): void;
}

/**
 * Class that records MIDI from any MIDI connected instrument, and converts it
 * to a `NoteSequence`.
 */
export class Recorder {
  public callbackObject: BaseRecorderCallback;
  private config: RecorderConfig;
  private recording: boolean;
  private firstNoteTimestamp: number;
  private notes: NoteSequence.Note[] = [];
  private onNotes: Map<number, NoteSequence.Note>;
  private midiInputs: WebMidi.MIDIInput[] = [];
  private startRecordingAtFirstNote: boolean;

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
  // tslint:disable-next-line:no-any
  private clickLoop: any;

  /**
   * `Recorder` constructor.
   *
   * @param callbackObject An optional BasePlayerCallback, specifies an
   * object that contains run() and stop() methods to invode during
   * playback.
   */
  constructor(
      config = {} as RecorderConfig, callbackObject?: BaseRecorderCallback) {
    this.config = {
      playClick: config.playClick,
      qpm: config.qpm || DEFAULT_QUARTERS_PER_MINUTE,
      playCountIn: config.playCountIn,
      startRecordingAtFirstNote: config.startRecordingAtFirstNote || false
    };

    this.callbackObject = callbackObject;
    this.recording = false;
    this.onNotes = new Map<number, NoteSequence.Note>();
  }

  /**
   * Initializes the `Recorder` by requesting MIDI access from the browser,
   * and connecting to any available MIDI inputs. If MIDI events are emitted,
   * they will be ignored until `start()` is called.
   */
  async initialize() {
    // Start up WebMidi.
    await (navigator as Navigator)
        .requestMIDIAccess()
        .then(
            (midi: WebMidi.MIDIAccess) => this.midiReady(midi),
            (err: Error) => core.log('Something went wrong', err));
  }

  private midiReady(midi: WebMidi.MIDIAccess) {
    core.log('Initialized Recorder');
    const inputs = midi.inputs.values();
    for (let input = inputs.next(); input && !input.done;
         input = inputs.next()) {
      this.midiInputs.push(input.value);
    }
  }

  isRecording() {
    return this.recording;
  }

  /**
   * Changes the tempo of the click loop.
   *
   * @param qpm The new qpm to use.
   */
  setTempo(qpm: number) {
    this.config.qpm = qpm;
    if (Tone.Transport.state === 'started') {
      Tone.Transport.bpm.value = qpm;
    }
  }

  /**
   * Whether to play a click track while recording. If the recorder is
   * already recording, changes will not take place until it is restarted.
   *
   * @param playClick True if it should play a click track.
   */
  enablePlayClick(playClick: boolean) {
    this.config.playClick = playClick;
  }

  /**
   * Whether to play a count in at the beginning of the recording. If the
   * recorder is already recording, changes will not take place until it
   * is restarted.
   *
   * @param countIn True if it should play a count in.
   */
  enablePlayCountIn(countIn: boolean) {
    this.config.playCountIn = countIn;
  }

  private initClickLoop() {
    let clickStep = 0;
    this.clickLoop = new Tone.Loop((time: number) => {
      // TODO(notwaldorf): It would be nice if this took into account a
      // time signature.
      if (clickStep % 4 === 0) {
        this.loClick.triggerAttack('G5', time);
      } else {
        this.hiClick.triggerAttack('C6', time);
      }
      clickStep++;
      if (this.config.playCountIn && clickStep === 4) {
        Tone.Transport.stop();
        this.clickLoop.stop();
      }
    }, '4n');
  }

  /**
   * Returns a list of all the MIDI inputs that are currently available to
   * record.
   */
  getMIDIInputs(): WebMidi.MIDIInput[] {
    return this.midiInputs;
  }

  /**
   * Starts listening to MIDI events and records any messages received.
   *
   * @param midiInputs An optional list of MIDIInputs, that specifies which
   * inputs to start listening to MIDI messages for to record. If not specified,
   * all available inputs will be used.
   */
  start(midiInputs?: WebMidi.MIDIInput[]) {
    // Start listening to MIDI messages.
    const list = midiInputs ? midiInputs : this.midiInputs;
    for (const input of list) {
      input.onmidimessage = (event) => {
        this.midiMessageReceived(event);
      };
    }

    if (this.config.playClick || this.config.playCountIn) {
      this.initClickLoop();
      Tone.Transport.bpm.value = this.config.qpm;
      Tone.Transport.start();
      this.clickLoop.start();
    } else {
      this.clickLoop = null;
    }

    this.recording = true;
    // Reset all the things needed for the recording.
    this.firstNoteTimestamp = undefined;
    this.notes = [];
    this.onNotes = new Map<number, NoteSequence.Note>();

    if (!this.startRecordingAtFirstNote) {
      const timeStamp: number = Date.now();
      this.firstNoteTimestamp = timeStamp;
    }
  }

  /**
   * Stops listening to MIDI events. Note that all the MIDI inputs will still
   * be connected after calling this method, but any messages received from them
   * will be ignored.
   * @returns a `NoteSequence` containing all the recorded notes.
   */
  stop(): NoteSequence {
    this.recording = false;

    const timeStamp: number = Date.now();
    // End any open notes.
    this.onNotes.forEach((pitch, note) => {
      this.noteOff(note, timeStamp);
    });

    // Stop listening to MIDI messages.
    for (const input of this.midiInputs) {
      input.onmidimessage = null;
    }
    if (this.clickLoop) {
      Tone.Transport.stop();
      this.clickLoop.stop();
    }

    if (this.notes.length === 0) {
      return null;
    }

    return this.getNoteSequence();
  }

  /**
   * @returns a non-quantized `NoteSequence` containing all the currently
   * recorded notes.
   */
  getNoteSequence(): NoteSequence {
    if (this.notes.length === 0) {
      return null;
    }
    return NoteSequence.create({
      notes: this.notes,
      totalTime: this.notes[this.notes.length - 1].endTime,
    });
  }

  /**
   * Resets the `notes` array to an empty array and stops the recording.
   * @returns a non-quantized `NoteSequence` containing all the recorded notes.
   */
  reset(): NoteSequence {
    const noteSequence = this.stop();

    // Reset all the things needed for the recording.
    this.firstNoteTimestamp = undefined;
    this.notes = [];
    this.onNotes = new Map<number, NoteSequence.Note>();

    return noteSequence;
  }

  midiMessageReceived(event: WebMidi.MIDIMessageEvent) {
    // Don't care about any messages we're receiving while we're not recording.
    if (!this.recording) {
      return;
    }

    // event.timeStamp doesn't seem to work reliably across all
    // apps and controllers (sometimes it isn't set, sometimes it doesn't
    // change between notes). Use the performance now timing, unless it exists.
    let timeStampOffset;
    if (event.timeStamp !== undefined && event.timeStamp !== 0) {
      timeStampOffset = event.timeStamp;
    } else {
      timeStampOffset = performance.now();
    }
    const timeStamp = timeStampOffset + performance.timing.navigationStart;

    // Save the first note.
    if (this.firstNoteTimestamp === undefined) {
      this.firstNoteTimestamp = timeStamp;
    }

    // MIDI commands we care about. See
    // tslint:disable-next-line
    // http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
    const NOTE_ON = 9;
    const NOTE_OFF = 8;

    const cmd = event.data[0] >> 4;
    const pitch = event.data[1];
    const velocity = (event.data.length > 2) ? event.data[2] : 1;
    const device = event.srcElement;

    // Some MIDI controllers don't send a separate NOTE_OFF command.
    if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
      if (this.callbackObject && this.callbackObject.noteOff) {
        this.callbackObject.noteOff(pitch, velocity, device);
      }
      this.noteOff(pitch, timeStamp);
      if (this.callbackObject && this.callbackObject.run) {
        this.callbackObject.run(this.getNoteSequence());
      }
    } else if (cmd === NOTE_ON) {
      if (this.callbackObject && this.callbackObject.noteOn) {
        this.callbackObject.noteOn(pitch, velocity, device);
      }
      this.noteOn(pitch, velocity, timeStamp);
    }
  }

  private noteOn(pitch: number, velocity: number, timeStamp: number) {
    const MILLIS_PER_SECOND = 1000;

    const note = new NoteSequence.Note();
    note.pitch = pitch;
    note.startTime = (timeStamp - this.firstNoteTimestamp) / MILLIS_PER_SECOND;
    note.velocity = velocity;

    // Save this note so that we can finish it when we receive the note up
    this.onNotes.set(pitch, note);
  }

  private noteOff(pitch: number, timeStamp: number) {
    const MILLIS_PER_SECOND = 1000;

    // Find the note that was originally pressed to finish it.
    const note = this.onNotes.get(pitch);
    if (note) {
      // Notes are saved in seconds, timestamps are in milliseconds.
      note.endTime = (timeStamp - this.firstNoteTimestamp) / MILLIS_PER_SECOND;
      this.notes.push(note);
    }
    this.onNotes.delete(pitch);
  }
}
