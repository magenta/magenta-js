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
import {NoteSequence} from '../protobuf';

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
}

/**
 * Class that records MIDI from any MIDI connected instrument, and converts it
 * to a `NoteSequence`.
 */
export class Recorder {
  private recording: boolean;
  public callbackObject: BaseRecorderCallback;
  private firstNoteTimestamp: number;
  private notes: NoteSequence.Note[] = [];
  private onNotes: Map<number, NoteSequence.Note>;
  private midiInputs: WebMidi.MIDIInput[] = [];
  /**
   * `Recorder` constructor.
   *
   * @param callbackObject An optional BasePlayerCallback, specifies an
   * object that contains run() and stop() methods to invode during
   * playback.
   */
  constructor(callbackObject?: BaseRecorderCallback) {
    this.callbackObject = callbackObject;
    this.recording = false;
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
            (err: Error) => console.log('Something went wrong', err));
  }

  private midiReady(midi: WebMidi.MIDIAccess) {
    console.log('Initialized Recorder');
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

    this.recording = true;
    // Reset all the things needed for the recording.
    this.firstNoteTimestamp = undefined;
    this.notes = [];
    this.onNotes = new Map<number, NoteSequence.Note>();
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

  midiMessageReceived(event: WebMidi.MIDIMessageEvent) {
    // Don't care about any messages we're receiving while we're not recording.
    if (!this.recording) {
      return;
    }

    // event.timeStamp doesn't seem to work reliably across all
    // apps and controllers (sometimes it isn't set, sometimes it doesn't
    // change between notes). Use the actual message time for now.
    const timeStamp: number = Date.now();

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

    // Some MIDI controllers don't send a separate NOTE_OFF command.
    if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
      this.noteOff(pitch, timeStamp);
      if (this.callbackObject) {
        this.callbackObject.run(this.getNoteSequence());
      }
    } else if (cmd === NOTE_ON) {
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
