import * as Tone from 'tone';
import * as mm from '../src/index';
import {CHECKPOINTS_DIR} from './common';

const playButton = document.getElementById('playButton') as HTMLButtonElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const mvae = new mm.MusicVAE(MEL_CKPT);

interface ToneEvent {
  isEnd: boolean;
  note: string;
  duration: any;
  velocity: number;
  originalNote: mm.NoteSequence.INote;
}

async function start() {
  await mvae.initialize();
  const [sample] = await mvae.sample(1);
  const toneEvents = mm.noteSequenceToToneEvents(sample).notes;
  playButton.textContent = "play";
  
  const synth = new Tone.Synth();
  const part = new Tone.Part((time: number, value: ToneEvent) => {
    if (value.isEnd) {
      viz.clearActiveNotes();
      Tone.Transport.stop();
      playButton.textContent = "play";
      return;
    }

    const { note, duration, velocity, originalNote } = value;
    synth.triggerAttackRelease(note, duration, time, velocity);

    viz.redraw(originalNote, true);
  }, toneEvents);
  part.start(0)
  synth.toDestination ? synth.toDestination() : synth.toMaster();
  const viz = new mm.PianoRollCanvasVisualizer(sample, canvas);
  

  playButton.addEventListener("click", () => {
    if (Tone.context._context.state !== "started") {
      Tone.context._context.resume();
    }
    // play & stop
    if (Tone.Transport.state !== "started") {
      Tone.Transport.start();
      playButton.textContent = "stop";
    } else {
      Tone.Transport.stop();
      playButton.textContent = "play";
    }
  });
}

start();