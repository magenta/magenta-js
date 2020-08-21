import * as Tone from 'tone';
import * as mm from '../src/index';
import {CHECKPOINTS_DIR} from './common';

const playButton = document.getElementById('playButton') as HTMLButtonElement;

const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const player = new mm.Player();
const mvae = new mm.MusicVAE(MEL_CKPT);

async function start() {
  await mvae.initialize();
  const samples = await mvae.sample(1);
  
  playButton.textContent = "play";
  
  playButton.addEventListener("click", () => {
    const audioContext = Tone.context._context;
    if (audioContext.state !== "started") {
      audioContext.resume();
    }

    if (player.getPlayState() !== "started") {
      player.start(samples[0]);
    }
  });
}

start();