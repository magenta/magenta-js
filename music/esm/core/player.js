import * as Tone from 'tone';
import { performance } from '../core/compat/global';
import { NoteSequence } from '../protobuf/index';
import * as constants from './constants';
import * as soundfont from './soundfont';
import * as sequences from './sequences';
function compareQuantizedNotes(a, b) {
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
export class BasePlayerCallback {
}
export class BasePlayer {
    constructor(playClick = false, callbackObject) {
        this.playClick = playClick;
        this.callbackObject = callbackObject;
        this.desiredQPM = undefined;
    }
    setTempo(qpm) {
        this.desiredQPM = qpm;
        if (Tone.Transport.state === 'started') {
            Tone.Transport.bpm.value = qpm;
        }
    }
    makeClickSequence(seq) {
        const clickSeq = sequences.clone(seq);
        const sixteenthEnds = clickSeq.notes.map((n) => n.quantizedEndStep);
        const lastSixteenth = Math.max(...sixteenthEnds);
        for (let i = 0; i < lastSixteenth; i += 4) {
            const click = {
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
    resumeContext() {
        Tone.context.resume();
    }
    start(seq, qpm, offset = 0) {
        if (this.getPlayState() === 'started') {
            throw new Error('Cannot start playback; player is already playing.');
        }
        else if (this.getPlayState() === 'paused') {
            throw new Error('Cannot `start()` a paused player; use `resume()`.');
        }
        if (Tone.Transport.state !== 'stopped') {
            throw new Error('Cannot start playback while `Tone.Transport` is in use.');
        }
        this.resumeContext();
        const isQuantized = sequences.isQuantizedSequence(seq);
        if (this.playClick && isQuantized) {
            seq = this.makeClickSequence(seq);
        }
        if (qpm) {
            Tone.Transport.bpm.value = qpm;
        }
        else if (seq.tempos && seq.tempos.length > 0 && seq.tempos[0].qpm > 0) {
            Tone.Transport.bpm.value = seq.tempos[0].qpm;
        }
        else {
            Tone.Transport.bpm.value = constants.DEFAULT_QUARTERS_PER_MINUTE;
        }
        if (isQuantized) {
            seq = sequences.unquantizeSequence(seq, qpm);
        }
        else if (qpm) {
            throw new Error('Cannot specify a `qpm` for a non-quantized sequence.');
        }
        const thisPart = new Tone.Part((t, n) => {
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
        this.currentPart.start(undefined, offset);
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
    pause() {
        if (!this.isPlaying()) {
            throw new Error('Cannot pause playback while the player is stopped.');
        }
        Tone.Transport.pause();
    }
    resume() {
        if (this.getPlayState() !== 'paused') {
            throw new Error(`Cannot resume playback while "${this.getPlayState()}".`);
        }
        Tone.Transport.start();
    }
    seekTo(seconds) {
        if (!this.isPlaying()) {
            throw new Error('Cannot seek while the player is stopped.');
        }
        Tone.Transport.seconds = seconds;
    }
    isPlaying() {
        return !!this.currentPart;
    }
    getPlayState() {
        return this.isPlaying() ? Tone.Transport.state : 'stopped';
    }
}
class DrumKit {
    constructor() {
        this.DRUM_PITCH_TO_CLASS = new Map();
        this.kick = new Tone.MembraneSynth().toDestination();
        this.tomLow = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.01, decay: 0.5, sustain: 0 },
        })
            .toDestination();
        this.tomMid = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.01, decay: 0.5, sustain: 0 },
        })
            .toDestination();
        this.tomHigh = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.01, decay: 0.5, sustain: 0 },
        })
            .toDestination();
        this.closedHihat = new Tone
            .MetalSynth({
            frequency: 400,
            envelope: { attack: 0.001, decay: 0.1, release: 0.8 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1,
        })
            .toDestination();
        this.openHihat = new Tone
            .MetalSynth({
            frequency: 400,
            envelope: { attack: 0.001, decay: 0.5, release: 0.8, sustain: 1 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1,
        })
            .toDestination();
        this.ride = new Tone.MetalSynth().toDestination();
        this.crash = new Tone
            .MetalSynth({
            frequency: 300,
            envelope: { attack: 0.001, decay: 1, release: 3 },
            harmonicity: 5.1,
            modulationIndex: 64,
            resonance: 4000,
            octaves: 1.5,
        })
            .toDestination();
        this.snare = new Tone
            .NoiseSynth({
            noise: { type: 'white' },
            envelope: { attack: 0.005, decay: 0.05, sustain: 0.1, release: 0.4 },
        })
            .toDestination();
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
        this.pitchPlayers = [
            (time, velocity = 1) => this.kick.triggerAttackRelease('C2', '8n', time, velocity),
            (time, velocity = 1) => this.snare.triggerAttackRelease('16n', time, velocity),
            (time, velocity = 1) => this.closedHihat.triggerAttack(time, 0.3, velocity),
            (time, velocity = 1) => this.openHihat.triggerAttack(time, 0.3, velocity),
            (time, velocity = 0.5) => this.tomLow.triggerAttack('G3', time, velocity),
            (time, velocity = 0.5) => this.tomMid.triggerAttack('C4', time, velocity),
            (time, velocity = 0.5) => this.tomHigh.triggerAttack('F4', time, velocity),
            (time, velocity = 1) => this.crash.triggerAttack(time, 1.0, velocity),
            (time, velocity = 1) => this.ride.triggerAttack(time, 0.5, velocity),
            (time, velocity = 0.5) => this.loClick.triggerAttack('G5', time, velocity),
            (time, velocity = 0.5) => this.hiClick.triggerAttack('C6', time, velocity),
        ];
        for (let c = 0; c < constants.DEFAULT_DRUM_PITCH_CLASSES.length; ++c) {
            constants.DEFAULT_DRUM_PITCH_CLASSES[c].forEach((p) => {
                this.DRUM_PITCH_TO_CLASS.set(p, c);
            });
        }
        this.DRUM_PITCH_TO_CLASS.set(constants.LO_CLICK_PITCH, constants.LO_CLICK_CLASS);
        this.DRUM_PITCH_TO_CLASS.set(constants.HI_CLICK_PITCH, constants.HI_CLICK_CLASS);
    }
    static getInstance() {
        if (!DrumKit.instance) {
            DrumKit.instance = new DrumKit();
        }
        return DrumKit.instance;
    }
    playNote(pitch, time, velocity) {
        this.pitchPlayers[this.DRUM_PITCH_TO_CLASS.get(pitch)](time, velocity);
    }
}
export class Player extends BasePlayer {
    constructor() {
        super(...arguments);
        this.drumKit = DrumKit.getInstance();
        this.bassSynth = new Tone
            .Synth({
            volume: 5,
            oscillator: { type: 'triangle' },
        })
            .toDestination();
        this.polySynth = new Tone.PolySynth().toDestination();
    }
    playNote(time, note) {
        const velocity = note.hasOwnProperty('velocity') ?
            note.velocity / constants.MAX_MIDI_VELOCITY :
            undefined;
        if (note.isDrum) {
            this.drumKit.playNote(note.pitch, time, velocity);
        }
        else {
            const freq = Tone.Frequency(note.pitch, 'midi').toFrequency();
            const dur = note.endTime - note.startTime;
            this.getSynth(note.instrument, note.program)
                .triggerAttackRelease(freq, dur, time, velocity);
        }
    }
    getSynth(instrument, program) {
        if (program !== undefined && program >= 32 && program <= 39) {
            return this.bassSynth;
        }
        else {
            return this.polySynth;
        }
    }
}
Player.tone = Tone;
export class SoundFontPlayer extends BasePlayer {
    constructor(soundFontURL, output = Tone.Master, programOutputs, drumOutputs, callbackObject) {
        super(false, callbackObject);
        this.soundFont = new soundfont.SoundFont(soundFontURL);
        this.output = output;
        this.programOutputs = programOutputs;
        this.drumOutputs = drumOutputs;
    }
    async loadSamples(seq) {
        await this.soundFont.loadSamples(seq.notes.map((note) => ({
            pitch: note.pitch,
            velocity: note.velocity,
            program: note.program || 0,
            isDrum: note.isDrum || false,
        })));
    }
    async loadAllSamples(program = 0, isDrum = false) {
        const ns = NoteSequence.create();
        const min = isDrum ? constants.MIN_DRUM_PITCH : constants.MIN_PIANO_PITCH;
        const max = isDrum ? constants.MAX_DRUM_PITCH : constants.MAX_PIANO_PITCH;
        for (let i = min; i <= max; i++) {
            for (let j = constants.MIN_MIDI_VELOCITY; j < constants.MAX_MIDI_VELOCITY; j++) {
                ns.notes.push({ pitch: i, velocity: j, program, isDrum });
            }
        }
        return this.loadSamples(ns);
    }
    resumeContext() {
        Tone.context.resume();
    }
    start(seq, qpm, offset = 0) {
        this.resumeContext();
        return this.loadSamples(seq).then(() => super.start(seq, qpm, offset));
    }
    playNote(time, note) {
        this.soundFont.playNote(note.pitch, note.velocity, time, note.endTime - note.startTime, note.program, note.isDrum, this.getAudioNodeOutput(note));
    }
    playNoteDown(note) {
        this.soundFont.playNoteDown(note.pitch, note.velocity, note.program, note.isDrum, this.getAudioNodeOutput(note));
    }
    playNoteUp(note) {
        this.soundFont.playNoteUp(note.pitch, note.velocity, note.program, note.isDrum, this.getAudioNodeOutput(note));
    }
    getAudioNodeOutput(note) {
        let output = this.output;
        if (this.programOutputs && !note.isDrum) {
            if (this.programOutputs.has(note.program)) {
                output = this.programOutputs.get(note.program);
            }
        }
        else if (this.drumOutputs && note.isDrum) {
            if (this.drumOutputs.has(note.pitch)) {
                output = this.drumOutputs.get(note.pitch);
            }
        }
        return output;
    }
}
export class PlayerWithClick extends Player {
    constructor(callbackObject) {
        super(true, callbackObject);
    }
}
export class MIDIPlayer extends BasePlayer {
    constructor(callbackObject) {
        super(false, callbackObject);
        this.outputs = [];
        this.outputChannel = 0;
        this.availableOutputs = [];
        this.NOTE_ON = 0x90;
        this.NOTE_OFF = 0x80;
    }
    async requestMIDIAccess() {
        if (navigator.requestMIDIAccess) {
            return new Promise((resolve, reject) => {
                navigator.requestMIDIAccess().then((midi) => {
                    midi.addEventListener('statechange', (event) => this.initOutputs(midi));
                    resolve(this.initOutputs(midi));
                }, (err) => console.log('Something went wrong', reject(err)));
            });
        }
        else {
            return null;
        }
    }
    initOutputs(midi) {
        const outputs = midi.outputs.values();
        for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
            this.availableOutputs.push(output.value);
        }
        return this.availableOutputs;
    }
    playNote(time, note) {
        const velocity = note.velocity || 100;
        const length = (note.endTime - note.startTime) * 1000;
        const msgOn = [this.NOTE_ON + this.outputChannel, note.pitch, velocity];
        const msgOff = [this.NOTE_OFF + this.outputChannel, note.pitch, velocity];
        const outputs = this.outputs ? this.outputs : this.availableOutputs;
        for (let i = 0; i < outputs.length; i++) {
            this.sendMessageToOutput(outputs[i], msgOn);
            this.sendMessageToOutput(outputs[i], msgOff, performance.now() + length);
        }
    }
    sendMessageToOutput(output, message, time) {
        if (output) {
            output.send(message, time);
        }
    }
    playNoteDown(note) {
        const msgOn = [this.NOTE_ON, note.pitch, note.velocity];
        const outputs = this.outputs ? this.outputs : this.availableOutputs;
        for (let i = 0; i < outputs.length; i++) {
            this.sendMessageToOutput(outputs[i], msgOn);
        }
    }
    playNoteUp(note) {
        const msgOff = [this.NOTE_OFF, note.pitch, note.velocity];
        const outputs = this.outputs ? this.outputs : this.availableOutputs;
        for (let i = 0; i < outputs.length; i++) {
            this.sendMessageToOutput(outputs[i], msgOff, note.endTime - note.startTime);
        }
    }
}
//# sourceMappingURL=player.js.map