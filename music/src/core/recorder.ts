/**
 * A module containing a MIDI recorder.
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
   * @param seq The note sequence up to this point
   */
  abstract run(seq: NoteSequence): void;
}

/**
 * Records
 */
export class Recorder {
  private _isRecording: boolean;
  public callbackObject: BaseRecorderCallback;
  private firstNoteTimestamp: number;
  private notes: NoteSequence.Note[] = [];
  private downNotes: {[pitch: number]: NoteSequence.Note} = {};

  /**
   *    `Recorder` constructor.
   *
   *     @param callbackObject An optional BasePlayerCallback, specifies an
   *     object that contains run() and stop() methods to invode during
   *     playback.
   */
  constructor(callbackObject?: BaseRecorderCallback) {
    this.callbackObject = callbackObject;
    this._isRecording = false;
  }

  /**
   * Initializes the `Recorder` by requesting MIDI access from the browser,
   * and connecting to any available MIDI inputs. If MIDI events are emitted,
   * they will be ignored until `startRecording()` is called.
   */
  async initialize() {
    // Start up WebMidi
    await (navigator as Navigator)
        .requestMIDIAccess()
        .then(
            (midi: WebMidi.MIDIAccess) => this.midiReady(midi),
            (err: Error) => console.log('Something went wrong', err));
  }

  private midiReady(midi: WebMidi.MIDIAccess) {
    const inputs = midi.inputs.values();
    for (let input = inputs.next(); input && !input.done;
         input = inputs.next()) {
      const midiInput = input.value;
      midiInput.onmidimessage = (event) => {
        this.midiMessageReceived(event);
      };
    }
  }

  isRecording() {
    return this._isRecording;
  }

  /**
   * Starts listening to MIDI events and records any messages received.
   */
  startRecording() {
    this._isRecording = true;

    // Reset all the things needed for the recording.
    this.firstNoteTimestamp = undefined;
    this.notes = [];
    this.downNotes = {};
  }

  /**
   * Stops listening to MIDI events. Note that all the MIDI inputs will still
   * be connected after calling this method, but any messages received from them
   * will be ignored.
   * @returns a `NoteSequence` containing all the recorded notes.
   */
  stopRecording(): NoteSequence {
    this._isRecording = false;
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
    if (!this._isRecording) {
      return;
    }

    // Save the first note.
    if (this.firstNoteTimestamp === undefined) {
      this.firstNoteTimestamp = event.timeStamp;
    }

    // MIDI commands we care about. See
    // tslint:disable-next-line
    // http://webaudio.github.io/web-midi-api/#a-simple-monophonic-sine-wave-midi-synthesizer.
    const NOTE_DOWN = 9;
    const NOTE_UP = 8;

    const cmd = event.data[0] >> 4;
    const pitch = event.data[1];
    const velocity = (event.data.length > 2) ? event.data[2] : 1;
    if (cmd === NOTE_DOWN) {
      const note = new NoteSequence.Note();
      note.pitch = pitch;
      note.startTime = (event.timeStamp - this.firstNoteTimestamp) / 1000;
      note.velocity = velocity;
      // Save this note so that we can finish it when we receive the note up
      this.downNotes[pitch] = note;
    } else if (cmd === NOTE_UP) {
      // Find the note that was originall pressed to finish it.
      const note = this.downNotes[pitch];
      if (note) {
        // Notes are saved in seconds, timestamps are in milliseconds.
        note.endTime = (event.timeStamp - this.firstNoteTimestamp) / 1000;
        this.notes.push(note);
      }
      this.downNotes[pitch] = null;

      if (this.callbackObject) {
        this.callbackObject.run(this.getNoteSequence());
      }
    }
  }
}
