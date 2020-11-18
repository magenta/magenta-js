/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
import { SPICE } from '../src/index';
import { AudioFeatures, ModelValues } from '../src/ddsp/interfaces';

enum MODEL {
  VIOLIN = 'violin',
  TENOR_SAXOPHONE = 'tenor_saxophone',
  TRUMPET = 'trumpet',
  FLUTE = 'flute',
}

export const PRESET_MODEL_URL =
  'https://storage.googleapis.com/magentadata/js/checkpoints/ddsp';

export const PRESET_MODELS = {
  [MODEL.VIOLIN]: {
    checkpointUrl: `${PRESET_MODEL_URL}/${MODEL.VIOLIN}`,
    settings: {
      averageMaxLoudness: -48.6,
      loudnessThreshold: -100.0,
      meanLoudness: -68.5,
      meanPitch: 62.0,
      postGain: 2,
      modelMaxFrameLength: 1250,
    },
  },
  [MODEL.TENOR_SAXOPHONE]: {
    checkpointUrl: `${PRESET_MODEL_URL}/${MODEL.TENOR_SAXOPHONE}`,
    settings: {
      averageMaxLoudness: -44.7,
      loudnessThreshold: -100.0,
      meanLoudness: -56,
      meanPitch: 58.9,
      postGain: 0.9,
      modelMaxFrameLength: 1250,
    },
  },
  [MODEL.TRUMPET]: {
    checkpointUrl: `${PRESET_MODEL_URL}/${MODEL.TRUMPET}`,
    settings: {
      averageMaxLoudness: -61.7,
      loudnessThreshold: -100.0,
      meanLoudness: -72.5,
      meanPitch: 68.6,
      postGain: 1.5,
      modelMaxFrameLength: 1250,
    },
  },
  [MODEL.FLUTE]: {
    checkpointUrl: `${PRESET_MODEL_URL}/${MODEL.FLUTE}`,
    settings: {
      averageMaxLoudness: -45.9,
      loudnessThreshold: -100.0,
      meanLoudness: -70.6,
      meanPitch: 63.2,
      postGain: 4,
      modelMaxFrameLength: 1250,
    },
  },
};

function floatTo16BitPCM(
  output: DataView,
  offset: number,
  input: Float32Array
) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function encodeWAV(samples: Float32Array, sampleRate: number) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const channels = 1;

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + samples.length * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, channels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 4, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, channels * 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  floatTo16BitPCM(view, 44, samples);

  return view;
}

window.onload = () => {
  let audioCtx: AudioContext, audioFeatures: AudioFeatures, spice: SPICE;

  document.getElementById('initialize').addEventListener('click', async () => {
    spice = new mm.SPICE();
    document.getElementById('initialize').style.display = 'none';
    document.getElementById('spice_initialized').textContent =
      'Loading SPICE model.';
    await spice.initialize();
    document.getElementById('spice_initialized').textContent =
      'SPICE model is ready.';
    audioCtx = new AudioContext();
    document.getElementById('extract_features').style.display = 'block';
  });

  document
    .getElementById('upload')
    .addEventListener('change', handleFileUpload);

  async function readFileAndProcessAudio(src: string) {
    const audioFile = await fetch(src);
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    audioFeatures = await spice.getAudioFeatures(audioBuffer);
    printJSONObj('audio_features', audioFeatures);
    displayButtons();
  }

  function displayButtons() {
    document.getElementById('buttons').style.display = 'block';

    document
      .getElementById('button_violin')
      .addEventListener('click', () =>
        toneTransfer(PRESET_MODELS[MODEL.VIOLIN])
      );
    document
      .getElementById('button_tenor_saxophone')
      .addEventListener('click', () =>
        toneTransfer(PRESET_MODELS[MODEL.TENOR_SAXOPHONE])
      );
    document
      .getElementById('button_flute')
      .addEventListener('click', () =>
        toneTransfer(PRESET_MODELS[MODEL.FLUTE])
      );
    document
      .getElementById('button_trumpet')
      .addEventListener('click', () =>
        toneTransfer(PRESET_MODELS[MODEL.TRUMPET])
      );
  }

  async function toneTransfer({
    checkpointUrl,
    settings,
  }: {
    checkpointUrl: string;
    settings: ModelValues;
  }) {
    document.getElementById('player').style.display = 'none';
    const ddsp = new mm.DDSP(checkpointUrl, settings);
    await ddsp.initialize();
    const toneTransferredAudioData: Float32Array = await ddsp.synthesize(
      audioFeatures
    );

    document.getElementById('player').style.display = 'block';
    const dataview = encodeWAV(toneTransferredAudioData, audioCtx.sampleRate);
    const blob = new Blob([dataview], { type: 'audio/wav' }),
      url = window.URL.createObjectURL(blob);
    (document.getElementById('player') as HTMLAudioElement).src = url;

    ddsp.dispose();
  }

  function printJSONObj(elementId: string, obj: AudioFeatures) {
    const element = document.getElementById(elementId);

    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = 'View Audio Features';
    details.appendChild(summary);

    const seqText = document.createElement('span');
    seqText.textContent = JSON.stringify(obj);
    details.appendChild(seqText);
    element.appendChild(details);
  }

  async function handleFileUpload(e: Event) {
    if ((e.currentTarget as HTMLInputElement).files.length > 0) {
      const file = (e.currentTarget as HTMLInputElement).files[0];
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        async () => {
          // convert uploaded file to blob
          await fetch(`${reader.result}`)
            .then((res) => res.blob())
            .then((res) => {
              readFileAndProcessAudio(reader.result as string);
              return {
                src: reader.result,
                type: file.type,
                blob: res,
              };
            })
            .catch((err) => console.log(err));
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }
};
