import * as Tone from 'tone';
import * as mm from '../src/index';
import {CHECKPOINTS_DIR} from './common';
// const { sequences } = mm;

const playButton = document.getElementById('playButton') as HTMLButtonElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

// const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const MEL_CHORDS_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_chords`;
const mvae = new mm.MusicVAE(MEL_CHORDS_CKPT);

const TWINKLE_TWINKLE = {
  notes: [
    {pitch: 60, startTime: 0.0, endTime: 0.5},
    {pitch: 60, startTime: 0.5, endTime: 1.0},
    {pitch: 67, startTime: 1.0, endTime: 1.5},
    {pitch: 67, startTime: 1.5, endTime: 2.0},
    {pitch: 69, startTime: 2.0, endTime: 2.5},
    {pitch: 69, startTime: 2.5, endTime: 3.0},
    {pitch: 67, startTime: 3.0, endTime: 4.0},
    {pitch: 65, startTime: 4.0, endTime: 4.5},
    {pitch: 65, startTime: 4.5, endTime: 5.0},
    {pitch: 64, startTime: 5.0, endTime: 5.5},
    {pitch: 64, startTime: 5.5, endTime: 6.0},
    {pitch: 62, startTime: 6.0, endTime: 6.5},
    {pitch: 62, startTime: 6.5, endTime: 7.0},
    {pitch: 60, startTime: 7.0, endTime: 8.0},
  ],
  tempos: [{
    time: 0, 
    qpm: 120
  }],
  totalTime: 8
};

async function start() {
  await mvae.initialize();
  const samples = await mvae.sample(1, 0.5, {chordProgression: ['A', 'A', 'D', 'D']});
  console.log(TWINKLE_TWINKLE)
  console.log(samples[0])

  // const seq = TWINKLE_TWINKLE
  // const seq = sequences.unquantizeSequence(samples[0])
  const seq = samples[0]
  
  playButton.textContent = "play";
  
  const viz = new mm.PianoRollCanvasVisualizer(seq, canvas);
  console.log('is quantized?', viz);
  const vizPlayer = new mm.Player(false, {
    run: (note) => {
      console.log(viz.redraw(note, true))
    },
    stop: () => {
      viz.redraw();
    }
  });
  

  playButton.addEventListener("click", () => {
    const audioContext = Tone.context._context;
    if (audioContext.state !== "started") {
      audioContext.resume();
    }
    if (vizPlayer.isPlaying()) {
      vizPlayer.stop();
      return;
    } else {
      vizPlayer.start(seq);
    }
  });
}

start();