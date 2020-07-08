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
import {fetch} from '../src/core/compat/fetch';

// tslint:disable-next-line:max-line-length
import {DRUM_SEQ_WITH_VELOCITIES, DRUM_SEQS, FULL_TWINKLE, FULL_TWINKLE_UNQUANTIZED, MEL_TWINKLE_WITH_VELOCITIES, SOUNDFONT_URL, writeNoteSeqs} from './common';

const soundFontPlayers: mm.SoundFontPlayer[] = [];
const soundFontMelodies: mm.INoteSequence[] = [];

function setupPlayerControlsDemo() {
  const playBtn = document.getElementById('play') as HTMLButtonElement;
  const stopBtn = document.getElementById('stop') as HTMLButtonElement;
  const pauseBtn = document.getElementById('pause') as HTMLButtonElement;
  const resumeBtn = document.getElementById('resume') as HTMLButtonElement;
  const playState = document.getElementById('playState') as HTMLSpanElement;
  const slider = document.getElementById('slider') as HTMLInputElement;
  const currentTime = document.getElementById('currentTime') as HTMLDivElement;

  const player = new mm.Player(false, {
    run: (note) => {
      slider.value = currentTime.textContent = note.startTime.toFixed(1);
    },
    stop: () => {}
  });
  playState.textContent = player.getPlayState();

  playBtn.addEventListener('click', () => {
    player.start(FULL_TWINKLE_UNQUANTIZED);
    slider.max = document.getElementById('totalTime').textContent =
        FULL_TWINKLE_UNQUANTIZED.totalTime.toFixed(1);
    slider.value = '0';
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
  slider.addEventListener('change', () => {
    const t = parseFloat(slider.value);
    currentTime.textContent = t.toFixed(1);

    // You don't _have_ to pause and resume the context, but it makes
    // the UI jump around less.
    const playing = (player.getPlayState() === 'started');
    if (playing) {
      player.pause();
    }
    player.seekTo(t);
    if (playing) {
      player.resume();
    }
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

async function generateSoundFontPlayers() {
  const baseUrl = 'https://storage.googleapis.com/magentadata/js/soundfonts/';
  soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'salamander'));
  soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'sgm_plus'));
  soundFontPlayers.push(new mm.SoundFontPlayer(baseUrl + 'jazz_kit'));

  soundFontMelodies.push(FULL_TWINKLE);
  soundFontMelodies.push(FULL_TWINKLE);
  soundFontMelodies.push(DRUM_SEQS[1]);

  // Load the sgm instruments.
  const response =
      await (await fetch(`${baseUrl}sgm_plus/soundfont.json`)).json();
  const instruments = Object.values(response.instruments);
  const select = document.getElementById('select') as HTMLSelectElement;
  select.innerHTML = instruments.map(i => `<option>${i}</option>`).join('');

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

  // If this is the sgm player, use the right instrument.
  if (index === 1) {
    const instrument =
        (document.getElementById('select') as HTMLSelectElement).selectedIndex;
    soundFontMelodies[1].notes.forEach(n => n.program = instrument);
  }

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
