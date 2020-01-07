# @magenta/music

[![npm version](https://badge.fury.io/js/%40magenta%2Fmusic.svg)](https://badge.fury.io/js/%40magenta%2Fmusic) [![](https://data.jsdelivr.com/v1/package/npm/@magenta/music/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@magenta/music)


This JavaScript implementation of Magenta's musical note-based models uses [TensorFlow.js](https://js.tensorflow.org) for GPU-accelerated inference.

Complete documentation is available at https://tensorflow.github.io/magenta-js/music.

For the Python TensorFlow implementations, see the [main Magenta repo](https://github.com/tensorflow/magenta).

## Contents

- [Example Applications](#example-applications)
- [Supported Models](#supported-models)
- [Getting Started](#getting-started)
- [Model Checkpoints](#model-checkpoints)

## Example Applications

Here are a few applications built with `@magenta/music`:

- [Piano Scribe](https://piano-scribe.glitch.me) by [Monica Dinculescu](https://github.com/notwaldorf) and [Adam Roberts](https://github.com/adarob)
- [Beat Blender](https://g.co/beatblender) by [Google Creative Lab](https://github.com/googlecreativelab)
- [Melody Mixer](https://g.co/melodymixer) by [Google Creative Lab](https://github.com/googlecreativelab)
- [Latent Loops](https://goo.gl/magenta/latent-loops) by [Google Pie Shop](https://github.com/teampieshop)
- [Neural Drum Machine](https://goo.gl/magenta/neuraldrum) by [Tero Parviainen](https://github.com/teropa)
- [Tenori-Off](https://tenori-off.glitch.me) by [Monica Dinculescu](https://github.com/notwaldorf)

You can also try our [hosted demos](https://tensorflow.github.io/magenta-js/music/demos) for each model and have a look at the [demo code](./demos).

## Supported Models

We have made an effort to port our most useful models, but please file an issue if you think something is
missing, or feel free to submit a Pull Request!

### Piano Transcription w/ Onsets and Frames

[OnsetsAndFrames](https://tensorflow.github.io/magenta-js/music/classes/_transcription_model_.onsetsandframes.html) implements Magenta's [piano transcription model](g.co/magenta/onsets-frames) for converting raw audio to MIDI in the browser. While it is somewhat flexible, it works best on solo piano recordings. The algorithm takes half the duration of audio to run on most browsers, but due to a [Webkit bug](https://github.com/WebKit/webkit/blob/4a4870b75b95a836b516163d45a5cbd6f5222562/Source/WebCore/Modules/webaudio/AudioContext.cpp#L109), audio resampling will make this it significantly slower on Safari.

**Demo Application:** [Piano Scribe](https://piano-scribe.glitch.me)

### MusicRNN

[MusicRNN](https://tensorflow.github.io/magenta-js/music/classes/_music_rnn_model_.musicrnn.html) implements Magenta's LSTM-based language models. These include [MelodyRNN][melody-rnn], [DrumsRNN][drums-rnn], [ImprovRNN][improv-rnn], and [PerformanceRNN][performance-rnn].

**Demo Application:** [Neural Drum Machine](https://goo.gl/magenta/neuraldrum)

### MusicVAE

[MusicVAE](https://tensorflow.github.io/magenta-js/music/classes/_music_vae_model_.musicvae.html) implements several configurations of Magenta's variational autoencoder model called [MusicVAE][music-vae] including melody and drum "loop" models, 4- and 16-bar "trio" models, chord-conditioned [multi-track](https://g.co/magenta/multitrack) models, and drum performance "humanizations" with [GrooVAE][https://g.co/magenta/groovae].

**Demo Application:** [Endless Trios](https://goo.gl/magenta/endless-trios)

### Piano Genie
[Piano Genie](https://g.co/magenta/pianogenie) is a VQ-VAE model that that maps 8-button input to a full 88-key piano in real time.

**Demo Application:** [Piano Genie](https://goo.gl/magenta/piano-genie)

## Getting started

There are several ways to get `magentamusic.js` in your JavaScript project,
either in the browser, or in Node:

### Including an ES5 bundle in a [`<script>` tag](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage)

This has all the models and all the core library helpers all bundled into
one file. This is the simplest way to use Magenta.js.

To use this bundle, add the following code to an HTML file:

```html
<html>
  <head>
    <!-- Load @magenta/music -->
    <script src="https://cdn.jsdelivr.net/npm/@magenta/music@^1.0.0"></script>
    <script>
      // Instantiate model by loading desired config.
      const model = new mm.MusicVAE(
        'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar');
      const player = new mm.Player();

      function play() {
        player.resumeContext(); // enable audio
        model.sample(1)
          .then((samples) => player.start(samples[0], 80));
      }
    </script>
  </head>
  <body><button onclick="play()"><h1>Play Trio</h1></button></body>
</html>
```

Open up that html file in your browser (or [click here](https://goo.gl/magenta/simpletrio) for a hosted version)
and the code will run. Click the "Play Trio" button to hear 4-bar trios that are randomly generated by MusicVAE.

It's also easy to add the ability to download MIDI for generated outputs, which is demonstrated in [this example](https://goo.gl/magenta/simpletriodl).

See our [demos](./demos) for example usage.

### Using a smaller ES6 bundle for just the code you need
We have also split all the models and the core library into smaller ES6 bundles (not ESModules, unfortunately 😢), so that you can use a model independent of the rest of the
library. These bundles don't package `Tone.js` or `TensorFlow.js` (since
there would be a risk of downloading multiple copies on the same page). Here is an example:
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
    //...
  });
</script>
</html>
```

### In Node
You can use [MagentaMusic.js][mm-npm] in your project using [yarn](https://yarnpkg.com/en/)
(by calling `yarn add @magenta/music`) **or** [npm](https://docs.npmjs.com/cli/npm)
(by calling `npm install --save @magenta/music`).

The node-specific bundles (that don't transpile the CommonJS modules) are under
`@magenta/music/node`. For example:

```js
const model = require('@magenta/music/node/music_vae');
const core = require('@magenta/music/node/core');

// These hacks below are needed because the library uses performance and fetch which
// exist in browsers but not in node. We are working on simplifying this!
const globalAny: any = global;
globalAny.performance = Date;
globalAny.fetch = require('node-fetch');

// Your code:
const model = new mode.MusicVAE('/path/to/checkpoint');
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

## Model Checkpoints

Since MagentaMusic.js does not support training models, you must use weights from a model trained with the Python-based [Magenta models][magenta-models]. We are also making available our own hosted pre-trained checkpoints.

### Magenta-Hosted Checkpoints

Several pre-trained MusicRNN and MusicVAE checkpoints are hosted on GCS. The full list can is available in [this table](https://github.com/tensorflow/magenta-js/blob/master/music/checkpoints/README.md#table) and can be accessed programmatically via a JSON index at https://goo.gl/magenta/js-checkpoints-json.

More information is available at https://goo.gl/magenta/js-checkpoints.

### Your Own Checkpoints

#### Dumping Your Weights

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

You can explore what each of them sounds like on this [demo page](https://tensorflow.github.io/magenta-js/music/demos/player.html#soundfonts).

<!-- links -->

[melody-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/melody_rnn
[drums-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/drums_rnn
[improv-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/improv_rnn
[performance-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/performance_rnn
[magenta-models]: https://github.com/tensorflow/magenta/tree/master/magenta/models
[music-vae]: https://g.co/magenta/musicvae
[mm-npm]: https://www.npmjs.com/package/@magenta/music
