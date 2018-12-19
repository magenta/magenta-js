# @magenta/image

This JavaScript implementation of Magenta's image models uses [TensorFlow.js](https://js.tensorflow.org) for GPU-accelerated inference.

Complete documentation is available at https://tensorflow.github.io/magenta-js/image.

## Contents

- [Example Applications](#example-applications)
- [Supported Models](#supported-models)
- [Getting Started](#getting-started)

## Example Applications

You can try our [hosted demos](https://tensorflow.github.io/magenta-js/image/demos) for each model and have a look at the [demo code](./demos).

## Supported Models

### Fast Arbitrary Image Stylization

Implements Ghiasi et al.'s fast arbitrary style transfer model ([paper](https://arxiv.org/abs/1705.06830), [code](https://github.com/tensorflow/magenta/tree/master/magenta/models/arbitrary_image_stylization)). Wraps around Reiichiro Nakano's [TensorFlow.js port](https://github.com/reiinakano/arbitrary-image-stylization-tfjs) of the model checkpoint.

## Getting started

There are two main ways to get MagentaImage.js in your JavaScript project:
via [script tags](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_JavaScript_within_a_webpage) **or** by installing it from [NPM](https://www.npmjs.com/)
and using a build tool like [yarn](https://yarnpkg.com/en/).

### via Script Tag

Add the following code to an HTML file, and place a content (`content.jpg`) and style (`style.jpg`) image in the same directory:

```html
<html>
  <head>
    <!-- Load @magenta/image -->
    <script src="https://cdn.jsdelivr.net/npm/@magenta/image@^0.1.2"></script>
  </head>
  <body>
    <img id="content" height="256" src="content.jpg"/>
    <img id="style" height="256" src="style.jpg"/>
    <canvas id="stylized" height="256"></canvas>
      <script>
        const model = new mi.ArbitraryStyleTransferNetwork();
        const contentImg = document.getElementById('content');
        const styleImg = document.getElementById('style');
        const stylizedCanvas = document.getElementById('stylized');

        function stylize() {
          model.stylize(contentImg, styleImg).then((imageData) => {
            stylizedCanvas.getContext('2d').putImageData(imageData, 0, 0);
          });
        }

        model.initialize().then(stylize);
      </script>
  </body>
</html>
```

Launch a simple HTTP server (e.g. `python3 -m http.server`) and point your browser to [http://0.0.0.0:8000/](http://0.0.0.0:8000/). You should see your content and style images displayed and, after a few seconds, the stylized output.

### via NPM

Add [MagentaImage.js][mi-npm] to your project using [yarn](https://yarnpkg.com/en/) **or** [npm](https://docs.npmjs.com/cli/npm).
For example, with yarn you can simply call `yarn add @magenta/image`.

Then, you can use the library in your own code as in the following example:

```js
import * as mi from '@magenta/image';

const model = new mi.ArbitraryStyleTransferNetwork();
const contentImg = document.getElementById('content') as HTMLImageElement;
const styleImg = document.getElementById('style') as HTMLImageElement;
const stylizedCanvas = document.getElementById('stylized') as HTMLCanvasElement;

function stylize() {
  model.stylize(contentImg, styleImg).then((imageData) => {
    stylizedCanvas.getContext('2d').putImageData(imageData, 0, 0);
  });
}

model.initialize().then(stylize);
```

See [style-transfer.glitch.me](https://style-transfer.glitch.me) and our [demos](./demos) for example usage.

#### Example Commands

`yarn install` to install dependencies.

`yarn test` to run tests.

`yarn bundle` to produce a bundled version in `dist/`.

`yarn run-demos` to build and run the demo.

<!-- links -->

[mi-npm]: https://www.npmjs.com/package/@magenta/image
