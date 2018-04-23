# MagentaMusic.js API

This JavaScript implementation of MusicVAE uses [TensorFlow.js](https://js.tensorflow.org) for GPU-accelerated inference 
with Magenta's note-based music models.

We have made an effort to port what we think are our most useful models, but please file an issue if you think something is
missing, or feel free to submit a Pull Request!

For the Python TensorFlow implementations, see the [main Magenta repo](https://github.com/tensorflow/magenta).

## Getting started

There are two main ways to get MagentaMusic.js in your JavaScript project:
via [script tags](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage) **or** by installing it from [NPM](https://www.npmjs.com/)
and using a build tool like [yarn](https://yarnpkg.com/en/).

### via Script Tag
      
Add the following code to an HTML file:

```html
<html>
  <head>
    <!-- Load MagentaMusic.js -->
    <script src="https://cdn.jsdelivr.net/npm/@magenta/music"> </script>

    <!-- Place your code in the script tag below. You can also use an external .js file -->
    <script>
      // Notice there is no 'import' statement. 'mm' is available on the index-page
      // because of the script tag above.
      const model = mm.MusicVAE('/path/to/checkpoint');
      const sample = model.sample();
      
      <!-- TODO(adarob, teropa) Add code to play back sample. -->

    </script>
  </head>

  <body>
  </body>
</html>
```

Open up that html file in your browser and the code should run!

### via NPM

Add MagentaMusic.js to your project using [yarn](https://yarnpkg.com/en/) **or** [npm](https://docs.npmjs.com/cli/npm).

```js
import * as mm from '@magenta/music';

const model = mm.MusicVAE('/path/to/checkpoint');
const sample = model.sample();

// TODO(adarob, teropa) Add code to play back sample.
```

See our [demos](./demos) for more details. 


## Pre-trained Checkpoints
Several pre-trained MusicRNN and MusicVAE checkpoints are hosted on GCS. While we do not plan to remove any of the current checkpoints, we will be adding more in the future, so your applications should reference the checkpoints.json file to see which checkpoints are available.

If your application has a high QPS, you must mirror these files on your own server.

## Example Applications

* [Beat Blender](https://g.co/beatblender) by [Google Creative Lab](https://github.com/googlecreativelab)
* [Melody Mixer](https://g.co/melodymixer) by [Google Creative Lab](https://github.com/googlecreativelab)
* [Latent Loops](https://goo.gl/magenta/latent-loops) by [Google Pie Shop](https://github.com/teampieshop)
* [Neural Drum Machine](https://codepen.io/teropa/pen/RMGxOQ) by [Tero Parviainen](https://github.com/teropa)

## Example Commands

`yarn install` to install dependencies.

`yarn build` to produce a commonjs version with typescript definitions for MusicVAE in the `es5/` folder that can then be consumed by others over NPM.

`yarn bundle` to produce a bundled version in `dist/`.

`yarn run-demo` to build and run the demo.
