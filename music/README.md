# @magenta/music

[![npm version](https://badge.fury.io/js/%40magenta%2Fmusic.svg)](https://badge.fury.io/js/%40magenta%2Fmusic) [![](https://data.jsdelivr.com/v1/package/npm/@magenta/music/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@magenta/music)

This JavaScript implementation of Magenta's musical note-based models uses [TensorFlow.js](https://js.tensorflow.org) for GPU-accelerated inference. For the Python TensorFlow implementations, see the [main Magenta repo](https://github.com/tensorflow/magenta).

Complete API documentation is available [here](https://magenta.github.io/magenta-js/music).

# Table of Contents

- [Getting started](#getting-started)
- [Usage](#usage)
  - [In the browser](#in-the-browser)
  - [In Node](#in-node)
- [API docs](https://magenta.github.io/magenta-js/music)
- [Supported Models](#supported-models)
  - [Onsets and Frames](#piano-transcription-w-onsets-and-frames)
  - [MusicRNN](#musicrnn)
  - [MusicVAE](#musicvae)
  - [MidiMe](#midime)
  - [Piano Genie](#piano-genie)
  - [GANSynth](#gansynth)
- [Model Checkpoints](#model-checkpoints)
  - [Pre-trained hosted checkpoints](#pre-trained-hosted-checkpoints)
  - [Your own checkpoints](#your-own-checkpoints)
- [Soundfonts](#soundfonts)
- [How To](#how-to)
  - [Use with a WebWorker](#use-with-a-web-worker)
  - [Use with a ServiceWorker](#use-with-a-service-worker)
  - [Use with TypeScript](#use-with-typescript)

## Getting started
If you want to get hands-on with Magenta, we've put together a small
[interactive tutorial](https://hello-magenta.glitch.me/) that takes you through
generating a small melody in the browser using a Machine Learning model.

Here are some examples of applications that have been built with `@magenta/music`. A
more complete list is available on the [Magenta site](https://magenta.tensorflow.org/demos).

- [Fruit Genie](https://magenta.tensorflow.org/fruitgenie) by [Deeplocal](https://www.deeplocal.com/)
- [Drumbot](https://drumbot.glitch.me) by [Monica Dinculescu](https://github.com/notwaldorf)
- [Neural Drum Machine](https://goo.gl/magenta/neuraldrum) by [Tero Parviainen](https://github.com/teropa)
- [Piano Scribe](https://piano-scribe.glitch.me) by [Monica Dinculescu](https://github.com/notwaldorf) and [Adam Roberts](https://github.com/adarob)
- [Beat Blender](https://g.co/beatblender) by [Google Creative Lab](https://github.com/googlecreativelab)
- [Melody Mixer](https://g.co/melodymixer) by [Google Creative Lab](https://github.com/googlecreativelab)
- [Latent Loops](https://goo.gl/magenta/latent-loops) by [Google Pie Shop](https://github.com/teampieshop)

You can also try our [hosted demos](https://magenta.github.io/magenta-js/music/demos) for each model and have a look at their [code](./demos).

## Usage
There are several ways to get `@magenta/music` in your JavaScript project,
either in the browser, or in Node:

### In the browser
The models and the core library is split into smaller ES6 bundles (not ESModules, unfortunately 😢), so that you can use a model independent of the rest of the
library. These bundles don't package the `Tone.js` or `TensorFlow.js` dependencies (since
there would be a risk of downloading multiple copies on the same page). Here is an example (or
[click here](https://codepen.io/adarob/pen/gzwJZL) for a CodePen version):

```html
<html>
<head>
  ...
  <!-- You need to bring your own Tone.js for the player, and tfjs for the model -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.8.21/Tone.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tensorflow/1.2.8/tf.min.js"></script>
  <!-- Core library, since we're going to use a player -->
  <script src="https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0/es6/core.js"></script>
  <!--Model we want to use -->
  <script src="https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0/es6/music_vae.js"></script>
</head>
<script>
  // Each bundle exports a global object with the name of the bundle.
  const player = new core.Player();
  //...
  const mvae = new music_vae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small');
  mvae.initialize().then(() => {
    model.sample(1).then((samples) => player.start(samples[0]));
  });
</script>
</html>
```

We also have an [ES5 bundle](https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0) that contains all the models and the core functions, but using in production is not recommended due to its size.

### In Node

You can use [@magenta/music][mm-npm] in your project using [yarn](https://yarnpkg.com/en/)
(by calling `yarn add @magenta/music`) **or** [npm](https://docs.npmjs.com/cli/npm)
(by calling `npm install --save @magenta/music`).

The node-specific bundles (that don't transpile the CommonJS modules) are under
`@magenta/music/node`. For example:

```js
const mvae = require('@magenta/music/node/music_vae');
const core = require('@magenta/music/node/core');

// Your code:
const model = new mvae.MusicVAE('/path/to/checkpoint');
const player = new core.Player();
model
  .initialize()
  .then(() => model.sample(1))
  .then(samples => {
    player.resumeContext();
    player.start(samples[0])
  });
```

#### Example Commands
`yarn install` to install dependencies.

`yarn test` to run tests.

`yarn build` to produce the different bundled versions.

`yarn run-demos` to build and serve the demos, with live reload.

*(Note: the default behavior is to build/watch all demos - specific demos can be built by passing a comma-separated list of specific demo names as follows: `yarn run-demos --demos=transcription,visualizer`)*

## Supported Models

We have made an effort to port our most useful models, but please file an issue if you think something is
missing, or feel free to submit a Pull Request!

### Piano Transcription w/ Onsets and Frames

[OnsetsAndFrames](https://magenta.github.io/magenta-js/music/classes/_transcription_model_.onsetsandframes.html) implements Magenta's [piano transcription model](g.co/magenta/onsets-frames) for converting raw audio to MIDI in the browser. While it is somewhat flexible, it works best on solo piano recordings. The algorithm takes half the duration of audio to run on most browsers, but due to a [Webkit bug](https://github.com/WebKit/webkit/blob/4a4870b75b95a836b516163d45a5cbd6f5222562/Source/WebCore/Modules/webaudio/AudioContext.cpp#L109), audio resampling will make this significantly slower on Safari.

**⭐️Demo:** [Piano Scribe](https://piano-scribe.glitch.me)

### MusicRNN

[MusicRNN](https://magenta.github.io/magenta-js/music/classes/_music_rnn_model_.musicrnn.html) implements Magenta's LSTM-based language models. These include [MelodyRNN][melody-rnn], [DrumsRNN][drums-rnn], [ImprovRNN][improv-rnn], and [PerformanceRNN][performance-rnn].

**⭐️Demo:** [Neural Drum Machine](https://goo.gl/magenta/neuraldrum)

### MusicVAE

[MusicVAE](https://magenta.github.io/magenta-js/music/classes/_music_vae_model_.musicvae.html) implements several configurations of Magenta's variational autoencoder model called [MusicVAE][music-vae] including melody and drum "loop" models, 4- and 16-bar "trio" models, chord-conditioned [multi-track](https://g.co/magenta/multitrack) models, and drum performance "humanizations" with [GrooVAE](https://g.co/magenta/groovae).

**⭐️Demo:** [Endless Trios](https://goo.gl/magenta/endless-trios)

### MidiMe
[MidiMe](https://g.co/magenta/pianogenie) allows you to personalize a pre-trained
MusicVAE model by quickly training a smaller model directly in the browser,
with very little user data.

**⭐️Demo:** [MidiMe](https://midi-me.glitch.me/)

### Piano Genie
[Piano Genie](https://g.co/magenta/pianogenie) is a VQ-VAE model that maps 8-button input to a full 88-key piano in real time.

**⭐️Demo:** [Piano Genie](https://goo.gl/magenta/piano-genie)

### GANSynth
[GANSynth](https://magenta.tensorflow.org/gansynth) is a method for generating high-fidelity audio with Generative Adversarial Networks (GANs).

**⭐️Demo:** [GANHarp](https://ganharp.ctpt.co/) by [Counterpoint](https://ctpt.co/).

## Model Checkpoints
Most `@magenta/music` models (with the exception of MidiMe) do not support training in the browser
(because they require a large amount of data, which would take an incredibly long time), and they use weights from a model trained with the Python-based [Magenta models][magenta-models]. We are also making available our own hosted pre-trained checkpoints.

### Pre-trained hosted checkpoints
Several pre-trained checkpoints for all of our models are available and hosted on GCS. The full list is available in [this table](https://github.com/tensorflow/magenta-js/blob/master/music/checkpoints/README.md#table) and can be accessed programmatically via a JSON index [here](https://goo.gl/magenta/js-checkpoints-json).

### Your own checkpoints

#### Dumping your weights

To use your own checkpoints with one of our models, you must first convert the weights to the appropriate format using the provided [checkpoint_converter](https://github.com/tensorflow/magenta-js/blob/master/scripts/checkpoint_converter.py) script.

This tool is dependent on [tfjs-converter](https://github.com/tensorflow/tfjs-converter), which you must first install using `pip install tensorflowjs`. Once installed, you can execute the script as follows:

```bash
../scripts/checkpoint_converter.py /path/to/model.ckpt /path/to/output_dir
```

There are additional flags available to reduce the size of the output by removing unused (training) variables or using weight quantization. Call `../scripts/checkpoint_converter.py -h` to list the available options.

#### Specifying the Model Configuration

The model configuration should be placed in a JSON file named `config.json` in the same directory as your checkpoint. This configuration file contains all the information needed (besides the weights) to instantiate and run your model: the model type and data converter specification plus optional chord encoding, auxiliary inputs, and attention length. An example `config.json` file might look like:

```json
{
  "type": "MusicRNN",
  "dataConverter": {
    "type": "MelodyConverter",
    "args": {
      "minPitch": 48,
      "maxPitch": 83
    }
  },
  "chordEncoder": "PitchChordEncoder"
}
```

This configuration corresponds to a chord-conditioned melody MusicRNN model.

## SoundFonts
There are several SoundFonts that you can use with the `mm.SoundFontPlayer`,
for more realistic sounding instruments:

| Instrument  | URL | License  |
|---|---|---|
| Piano | [salamander](https://storage.googleapis.com/magentadata/js/soundfonts/salamander) |Audio samples from [Salamander Grand Piano](https://archive.org/details/SalamanderGrandPianoV3)|
| Multi | [sgm_plus](https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus) | Audio samples based on [SGM](https://www.polyphone-soundfonts.com/en/files/27-instrument-sets/256-sgm-v2-01) with modifications by [John Nebauer](https://sites.google.com/site/soundfonts4u/)|
| Percussion | [jazz_kit](https://storage.googleapis.com/magentadata/js/soundfonts/jazz_kit) | Audio samples from [Jazz Kit (EXS)](https://musical-artifacts.com/artifacts/686) by Lithalean |

You can explore what each of them sounds like on this [demo page](https://magenta.github.io/magenta-js/music/demos/player.html#soundfonts).

## How Tos

### Use with a WebWorker
A [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) is a script that can run in the background,
separate from the main UI thread. This allows you to perform expensive computatios (like
model inference, etc) without blocking any of the user interaction (like animations, scrolling, etc).
All `@magenta/music` models should work in a WebWorker,
_except for_ GANSynth and Onsets and Frames, which need to use the browser's AudioContext
to manipulate audio data. (You can work around this by separating the audio processing code
from the actual inference code, but we don't currently have an example of this).

Here is an example of using a MusicVAE model in a WebWorker. In your main `app.js`,

```js
const worker = new Worker('worker.js');

// Tell the worker to use the model
worker.postMessage({sequence: someNoteSequence});

// Worker returns the result.
worker.onmessage = (event) => {
  if (event.data.fyi) {
    console.log(event.data.fyi);
  } else {
    const sample = event.data.sample;
    // Do something with this sample
  }
};
```

In your worker, `worker.js`,

```js
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.4.0/dist/tf.min.js");
importScripts("https://cdn.jsdelivr.net/npm/@magenta/music@^1.12.0/es6/core.js");
importScripts("https://cdn.jsdelivr.net/npm/@magenta/music@^1.12.0/es6/music_vae.js");

const mvae = new music_vae.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small');

// Main script asks for work.
self.onmessage = async (e) => {
  if (!mvae.isInitialized()) {
    await mvae.initialize();
    postMessage({fyi: 'model initialized'});
  }

  const output = await mvae.sample(1);
  // Send main script the result.
  postMessage({sample: output[0]});
};
```

### Use with a ServiceWorker
A [ServiceWorker](https://developers.google.com/web/fundamentals/primers/service-workers) is a script that your browser runs in the background, separate from a web page. In particular, ServiceWorkers allow
you to provide offline interactions by controlling what data your browser caches (like soundfont files,
model checkpoint chunks). For a full example, check out the [Piano Genie PWA](https://piano-genie-pwa.glitch.me/) code, that lets you install Piano Genie as a PWA app, and use it entirely offline.

This is also extremely useful if you want to test a very large model checkpoint, but
don't want to download it every time you refresh the page.

The main things to look out for are the [manifest.json](https://glitch.com/edit/#!/piano-genie-pwa?path=manifest.json:2:12) and the [meta tags](https://glitch.com/edit/#!/piano-genie-pwa?path=index.html:15:4). Then, in your main script, load the service worker:

```js
  // Force HTTP.
  if (location.protocol == 'http:') location.protocol = 'https:';
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service Worker **not** registered', err));
  }
  else {
    console.warn('Service Worker not supported in this browser');
  }
```

In `sw.js`,

```js
self.addEventListener('install', e => {
  e.waitUntil(
  (async function() {
    const cache = await caches.open("your-app-name-assets");

    const resources = [
      // Static files you want to cache.
      "index.html",
      "style.css",
      "script.js",
      "helpers.js",
      "manifest.json",
      // A built, minified bundle of dependencies.
      "magenta-1.7.0.js",
      // SoundFont manifest.
      'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus/soundfont.json',
      // Model checkpoint.
      "https://storage.googleapis.com/magentadata/js/checkpoints/piano_genie/model/epiano/stp_iq_auto_contour_dt_166006/weights_manifest.json",
      "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus/acoustic_grand_piano/instrument.json",
      // List here all the actual shards of your model.
      "https://storage.googleapis.com/magentadata/js/checkpoints/piano_genie/model/epiano/stp_iq_auto_contour_dt_166006/group1-shard1of1"
    ];
    // The actual SoundFont files you will use.
    for (let i = 21; i < 105; i++) {
      resources.push(`https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus/acoustic_grand_piano/p${i}_v79.mp3`)
    }

    // Cache all of these
    const local = cache.addAll(resources);
    await Promise.all([local]);
  })()
  );
});

self.addEventListener('fetch', e => {
  // If the resource is cached, send it.
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
});
```

### Use with TypeScript
If you want to use `@magenta/music` as a dependency in a TypeScript project,
here is a [sample project](https://github.com/notwaldorf/example-magenta-in-ts/)
that does that and uses webpack to build and transpile it.

<!-- links -->

[melody-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/melody_rnn
[drums-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/drums_rnn
[improv-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/improv_rnn
[performance-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/performance_rnn
[magenta-models]: https://github.com/tensorflow/magenta/tree/master/magenta/models
[music-vae]: https://g.co/magenta/musicvae
[mm-npm]: https://www.npmjs.com/package/@magenta/music
