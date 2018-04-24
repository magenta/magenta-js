/// <reference path="./tone.d.ts" />

import * as mm from '../src/index';
import DEFAULT_DRUM_PITCH_CLASSES = mm.data.DEFAULT_DRUM_PITCH_CLASSES;
import * as Tone from 'tone';

const EIGHTH = new Tone.Time('8n').toSeconds();

const kick = new Tone.MembraneSynth().toMaster();
const tomLow = new Tone.MembraneSynth({
  pitchDecay: 0.008,
  envelope: {
    attack: 0.01,
    decay: 0.5,
    sustain: 0
  }
}).toMaster();
const tomMid = new Tone.MembraneSynth({
  pitchDecay: 0.008,
  envelope: {
    attack: 0.01,
    decay: 0.5,
    sustain: 0
  }
}).toMaster();
const tomHigh = new Tone.MembraneSynth({
  pitchDecay: 0.008,
  envelope: {
    attack: 0.01,
    decay: 0.5,
    sustain: 0
  }
}).toMaster();
const closedHihat = new Tone.MetalSynth({
  frequency: 400,
  envelope: { attack: 0.001, decay: 0.1, release: 0.8 },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1
}).toMaster();
const openHihat = new Tone.MetalSynth({
  frequency: 400,
  envelope: { attack: 0.001, decay: 0.5, release: 0.8, sustain: 1 },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1
}).toMaster();
const ride = new Tone.MetalSynth().toMaster();
const crash = new Tone.MetalSynth({
  frequency: 300,
  envelope: { attack: 0.001, decay: 1, release: 3 },
  harmonicity: 5.1,
  modulationIndex: 64,
  resonance: 4000,
  octaves: 1.5
}).toMaster();
const snare = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.005, decay: 0.05, sustain: 0.1, release: 0.4 }
}).toMaster();

const drumKit: ((time: number) => void)[] = [
  time => kick.triggerAttackRelease('C2', '8n', time),
  time => snare.triggerAttackRelease('16n', time),
  time => closedHihat.triggerAttack(time, 0.3),
  time => openHihat.triggerAttack(time, 0.3),
  time => tomLow.triggerAttack('G3', time, 0.5),
  time => tomMid.triggerAttack('C4', time, 0.5),
  time => tomHigh.triggerAttack('F4', time, 0.5),
  time => crash.triggerAttack(time, 1.0),
  time => ride.triggerAttack(time, 0.5)
];

export class Player {
  private currentPart: any;
  private scheduledStop: number;
  private synths = new Map<number, any>();

  /**
   * Start playing the note sequence, and return a Promisee
   * that resolves when it is done playing.
   */
  start(seq: mm.INoteSequence): Promise<void> {
    const events = seq.notes.map(note => [
      note.quantizedStartStep * EIGHTH,
      note
    ]);
    this.currentPart = new Tone.Part(
      (t: number, n: mm.NoteSequence.INote) => this.playNote(t, n),
      events
    );
    this.currentPart.start();
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
    }
    return new Promise(resolve => {
      this.scheduledStop = Tone.Transport.schedule(() => {
        this.stop();
        resolve();
      }, '+' + events[events.length - 1][0]);
    });
  }

  private playNote(time: number, n: mm.NoteSequence.INote) {
    if (n.isDrum) {
      const drumClass = DEFAULT_DRUM_PITCH_CLASSES.findIndex(
        classes => classes.indexOf(n.pitch) >= 0
      );
      drumKit[drumClass](time);
    } else {
      const freq = new Tone.Frequency(n.pitch, 'midi');
      const dur = (n.quantizedEndStep - n.quantizedStartStep) * EIGHTH;
      this.getSynth(n.instrument).triggerAttackRelease(freq, dur, time);
    }
  }

  private getSynth(instrument: number) {
    if (!this.synths.has(instrument)) {
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
