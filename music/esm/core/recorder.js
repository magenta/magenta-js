import * as Tone from 'tone';
import { performance } from '../core/compat/global';
import { NoteSequence } from '../protobuf/index';
import { DEFAULT_QUARTERS_PER_MINUTE } from './constants';
import * as logging from './logging';
export class BaseRecorderCallback {
}
export class Recorder {
    constructor(config = {}, callbackObject) {
        this.notes = [];
        this.midiInputs = [];
        this.loClick = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.001, decay: 0.3, sustain: 0 },
        })
            .toDestination();
        this.hiClick = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.001, decay: 0.3, sustain: 0 },
        })
            .toDestination();
        this.config = {
            playClick: config.playClick,
            qpm: config.qpm || DEFAULT_QUARTERS_PER_MINUTE,
            playCountIn: config.playCountIn,
            startRecordingAtFirstNote: config.startRecordingAtFirstNote || false,
        };
        this.callbackObject = callbackObject;
        this.recording = false;
        this.onNotes = new Map();
    }
    async initialize() {
        await navigator
            .requestMIDIAccess()
            .then((midi) => this.midiReady(midi), (err) => console.log('Something went wrong', err));
    }
    midiReady(midi) {
        logging.log('Initialized Recorder', 'Recorder');
        const inputs = midi.inputs.values();
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            this.midiInputs.push(input.value);
        }
    }
    isRecording() {
        return this.recording;
    }
    setTempo(qpm) {
        this.config.qpm = qpm;
        if (Tone.Transport.state === 'started') {
            Tone.Transport.bpm.value = qpm;
        }
    }
    enablePlayClick(playClick) {
        this.config.playClick = playClick;
    }
    enablePlayCountIn(countIn) {
        this.config.playCountIn = countIn;
    }
    initClickLoop() {
        let clickStep = 0;
        this.clickLoop = new Tone.Loop((time) => {
            if (clickStep % 4 === 0) {
                this.loClick.triggerAttack('G5', time);
            }
            else {
                this.hiClick.triggerAttack('C6', time);
            }
            clickStep++;
            if (this.config.playCountIn && clickStep === 4) {
                Tone.Transport.stop();
                this.clickLoop.stop();
            }
        }, '4n');
    }
    getMIDIInputs() {
        return this.midiInputs;
    }
    start(midiInputs) {
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
        }
        else {
            this.clickLoop = null;
        }
        this.recording = true;
        this.firstNoteTimestamp = undefined;
        this.notes = [];
        this.onNotes = new Map();
        if (!this.startRecordingAtFirstNote) {
            const timeStamp = Date.now();
            this.firstNoteTimestamp = timeStamp;
        }
    }
    stop() {
        this.recording = false;
        const timeStamp = Date.now();
        this.onNotes.forEach((pitch, note) => {
            this.noteOff(note, timeStamp);
        });
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
    getNoteSequence() {
        if (this.notes.length === 0) {
            return null;
        }
        return NoteSequence.create({
            notes: this.notes,
            totalTime: this.notes[this.notes.length - 1].endTime,
        });
    }
    reset() {
        const noteSequence = this.stop();
        this.firstNoteTimestamp = undefined;
        this.notes = [];
        this.onNotes = new Map();
        return noteSequence;
    }
    midiMessageReceived(event) {
        if (!this.recording) {
            return;
        }
        let timeStampOffset;
        if (event.timeStamp !== undefined && event.timeStamp !== 0) {
            timeStampOffset = event.timeStamp;
        }
        else {
            timeStampOffset = performance.now();
        }
        const timeStamp = timeStampOffset + performance.timing.navigationStart;
        if (this.firstNoteTimestamp === undefined) {
            this.firstNoteTimestamp = timeStamp;
        }
        const NOTE_ON = 9;
        const NOTE_OFF = 8;
        const cmd = event.data[0] >> 4;
        const pitch = event.data[1];
        const velocity = event.data.length > 2 ? event.data[2] : 1;
        const device = event.srcElement;
        if (cmd === NOTE_OFF || (cmd === NOTE_ON && velocity === 0)) {
            if (this.callbackObject && this.callbackObject.noteOff) {
                this.callbackObject.noteOff(pitch, velocity, device);
            }
            this.noteOff(pitch, timeStamp);
            if (this.callbackObject && this.callbackObject.run) {
                this.callbackObject.run(this.getNoteSequence());
            }
        }
        else if (cmd === NOTE_ON) {
            if (this.callbackObject && this.callbackObject.noteOn) {
                this.callbackObject.noteOn(pitch, velocity, device);
            }
            this.noteOn(pitch, velocity, timeStamp);
        }
    }
    noteOn(pitch, velocity, timeStamp) {
        const MILLIS_PER_SECOND = 1000;
        const note = new NoteSequence.Note();
        note.pitch = pitch;
        note.startTime = (timeStamp - this.firstNoteTimestamp) / MILLIS_PER_SECOND;
        note.velocity = velocity;
        this.onNotes.set(pitch, note);
    }
    noteOff(pitch, timeStamp) {
        const MILLIS_PER_SECOND = 1000;
        const note = this.onNotes.get(pitch);
        if (note) {
            note.endTime = (timeStamp - this.firstNoteTimestamp) / MILLIS_PER_SECOND;
            this.notes.push(note);
        }
        this.onNotes.delete(pitch);
    }
}
//# sourceMappingURL=recorder.js.map