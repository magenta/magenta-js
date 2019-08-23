/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as mm from '../src/index';

// tslint:disable-next-line:max-line-length
import {DRUM_SEQ_WITH_VELOCITIES, DRUM_SEQS, FULL_TWINKLE, FULL_TWINKLE_UNQUANTIZED, MEL_TWINKLE_WITH_VELOCITIES, SOUNDFONT_URL, TRIO_EXAMPLE, writeNoteSeqs} from './common';

const soundFontPlayers: mm.SoundFontPlayer[] = [];
const soundFontMelodies: mm.INoteSequence[] = [];

function setupPlayerControlsDemo() {
  const playBtn = document.getElementById('play') as HTMLButtonElement;
  const stopBtn = document.getElementById('stop') as HTMLButtonElement;
  const pauseBtn = document.getElementById('pause') as HTMLButtonElement;
  const resumeBtn = document.getElementById('resume') as HTMLButtonElement;
  const playState = document.getElementById('playState') as HTMLSpanElement;

  const player = new mm.Player();
  playState.textContent = player.getPlayState();

  playBtn.addEventListener('click', () => {
    player.start(FULL_TWINKLE);
    playState.textContent = player.getPlayState();
    playBtn.disabled = true;
    stopBtn.disabled = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
  });
  stopBtn.addEventListener('click', () => {
    player.stop();
    playState.textContent = player.getPlayState();
    playBtn.disabled = false;
    stopBtn.disabled = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
  });
  pauseBtn.addEventListener('click', () => {
    player.pause();
    playState.textContent = player.getPlayState();
    playBtn.disabled = true;
    stopBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
  });
  resumeBtn.addEventListener('click', () => {
    player.resume();
    playState.textContent = player.getPlayState();
    playBtn.disabled = true;
    stopBtn.disabled = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
  });
}

function setupAttackReleaseDemo() {
  const soundFontAttackBtn =
      document.getElementById('attackSoundFont') as HTMLButtonElement;
  const soundFontReleaseBtn =
      document.getElementById('releaseSoundFont') as HTMLButtonElement;

  const soundfontPlayer = new mm.SoundFontPlayer(SOUNDFONT_URL);
  soundfontPlayer.loadSamples(FULL_TWINKLE);

  soundFontAttackBtn.addEventListener('click', () => {
    soundfontPlayer.playNoteDown(FULL_TWINKLE.notes[0]);
  });
  soundFontReleaseBtn.addEventListener('click', () => {
    soundfontPlayer.playNoteUp(FULL_TWINKLE.notes[0]);
  });
}

function setupMIDIPlayerDemo() {
  const playBtn = document.getElementById('midi-play') as HTMLButtonElement;
  const midiOutputs =
      document.getElementById('midi-outputs') as HTMLSelectElement;
  const player = new mm.MIDIPlayer();

  player.requestMIDIAccess().then((outputs: WebMidi.MIDIOutput[]) => {
    midiOutputs.innerHTML =
        outputs.map(device => `<option>${device.name}</option>`).join('');
    playBtn.disabled = outputs.length === 0;
  });

  playBtn.addEventListener('click', () => {
    if (player.isPlaying()) {
      player.stop();
      playBtn.textContent = 'Play';
    } else {
      // Use the selected output, if any.
      player.outputs = [player.availableOutputs[midiOutputs.selectedIndex]];
      player.start(FULL_TWINKLE).then(() => playBtn.textContent = 'Play');
      playBtn.textContent = 'Stop';
    }
  });
}

function generatePlayers() {
  writeNoteSeqs('unq-player', [FULL_TWINKLE_UNQUANTIZED], false);
  writeNoteSeqs('unq-soundfont', [FULL_TWINKLE_UNQUANTIZED], true);
  writeNoteSeqs('q-player', [FULL_TWINKLE], false);
  writeNoteSeqs('q-soundfont', [FULL_TWINKLE], true);
  writeNoteSeqs('d-player', [DRUM_SEQS[1]], false);
  writeNoteSeqs('d-soundfont', [DRUM_SEQS[1]], true);
}

function generateTempoPlayer() {
  const visualizer = new mm.PianoRollSVGVisualizer(
      FULL_TWINKLE_UNQUANTIZED,
      document.getElementsByClassName('svg')[0] as SVGSVGElement);
  const player = new mm.Player(false, {
    run: (note: mm.NoteSequence.Note) => {
      visualizer.redraw(note);
    },
    stop: () => {}
  });

  const tempoSlider = document.getElementById('tempo') as HTMLInputElement;
  tempoSlider.addEventListener('change', () => {
    document.getElementById('tempoValue').textContent = tempoSlider.value;
    player.setTempo(parseFloat(tempoSlider.value));
  });

  const playBtn = document.getElementById('playBtn') as HTMLButtonElement;
  playBtn.addEventListener('click', () => {
    if (player.isPlaying()) {
      player.stop();
      playBtn.textContent = 'Play';
    } else {
      player.start(visualizer.noteSequence);
      playBtn.textContent = 'Stop';
    }
  });
}

function generateVelocityPlayers() {
  writeNoteSeqs('v-player', [MEL_TWINKLE_WITH_VELOCITIES], false);
  writeNoteSeqs('d-v-player', [DRUM_SEQ_WITH_VELOCITIES], false);
  writeNoteSeqs('s-v-player', [MEL_TWINKLE_WITH_VELOCITIES], true);
}

function generateSoundFontPlayers() {
  const baseUrl = 'https://storage.googleapis.com/magentadata/js/soundfonts/';
  soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'salamander'));
  soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'sgm_plus'));
  soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'jazz_kit'));

  soundFontMelodies.push(FULL_TWINKLE);
  soundFontMelodies.push(TRIO_EXAMPLE);
  soundFontMelodies.push(DRUM_SEQS[1]);

  // Preload the samples.
  for (let i = 0; i < soundFontPlayers.length; i++) {
    soundFontPlayers[i].loadSamples(soundFontMelodies[i]).then(() => {
      const el = document.getElementById('playSF_' + i) as HTMLButtonElement;
      el.removeAttribute('disabled');
      el.textContent = 'Play';
    });
  }

  document.getElementById('playSF_0')
      .addEventListener('click', (event) => playSoundFont(event, 0));
  document.getElementById('playSF_1')
      .addEventListener('click', (event) => playSoundFont(event, 1));
  document.getElementById('playSF_2')
      .addEventListener('click', (event) => playSoundFont(event, 2));
}

async function playSoundFont(event: MouseEvent, index: number) {
  const player = soundFontPlayers[index];
  const button = event.target as HTMLElement;
  if (player.isPlaying()) {
    player.stop();
    button.textContent = 'Play';
  } else {
    button.textContent = 'Stop';
    player.start(soundFontMelodies[index]);
  }
}
try {
  setupPlayerControlsDemo();
  setupAttackReleaseDemo();
  setupMIDIPlayerDemo();
  Promise.all([
    generatePlayers(), generateTempoPlayer(), generateVelocityPlayers(),
    generateSoundFontPlayers()
  ]);
} catch (err) {
  console.error(err);
}
