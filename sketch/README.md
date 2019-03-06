# @magenta/sketch

[![npm version](https://badge.fury.io/js/%40magenta%2Fsketch.svg)](https://badge.fury.io/js/%40magenta%2Fsketch) [![](https://data.jsdelivr.com/v1/package/npm/@magenta/sketch/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@magenta/sketch)


Link to Documentation: [tensorflow.github.io/magenta-js/sketch](https://tensorflow.github.io/magenta-js/sketch/)

This JavaScript implementation of Magenta's sketch-rnn model uses [TensorFlow.js](https://js.tensorflow.org) for GPU-accelerated inference. `sketch-rnn` is a recurrent neural network model described in [Teaching Machines to Draw](https://research.googleblog.com/2017/04/teaching-machines-to-draw.html) and [A Neural Representation of Sketch Drawings](https://arxiv.org/abs/1704.03477).

![Example Images](https://cdn.rawgit.com/tensorflow/magenta/master/magenta/models/sketch_rnn/assets/sketch_rnn_examples.svg)

*Examples of vector images produced by this generative model.*

## SketchRNN

This document is an introduction on how to use the Sketch RNN model in JavaScript to generate images.  The SketchRNN model is trained on stroke-based vector drawings. The model implementation here is able to handle unconditional (decoder-only) generation of vector images.

For more information, please read original the [model](https://magenta.tensorflow.org/sketch_rnn) description and for the Python TensorFlow implementation.

## Getting started

In the .html files, we need to include `magentasketch.js`. Our example sketch are built with [p5.js](https://p5js.org/) and stored in a file such as `sketch.js`, so we have also included p5 libraries here too. Please see this minimal example:

```html
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@magenta/sketch"></script>
  <script src="sketch.js"></script>
</head>
<body>
  <div id="sketch"></div>
</body>
</html>
```


### Generating a sketch

Below is the essence of how a sketch is generated. In addition to the original [paper](https://arxiv.org/abs/1704.03477), a simple tutorial for understanding how RNNs can generate a set of strokes is [here](http://blog.otoro.net/2017/01/01/recurrent-neural-network-artist/).

```js
let model;
let dx, dy; // offsets of the pen strokes, in pixels
let pen_down, pen_up, pen_end; // keep track of whether pen is touching paper
let x, y; // absolute coordinates on the screen of where the pen is
let prev_pen = [1, 0, 0]; // group all p0, p1, p2 together
let rnn_state; // store the hidden states of rnn's neurons
let pdf; // store all the parameters of a mixture-density distribution
let temperature = 0.45; // controls the amount of uncertainty of the model
let line_color;
let model_loaded = false;

// loads the TensorFlow.js version of sketch-rnn model, with the "cat" model's weights.
model = new ms.SketchRNN("https://storage.googleapis.com/quickdraw-models/sketchRNN/models/cat.gen.json");
// code that ensures the above line is run before the below lines are run.

function setup() {
  x = windowWidth / 2.0;
  y = windowHeight / 3.0;
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  // Initialize the scale factor for the model. Bigger -> large outputs.
  model.setPixelFactor(3.0);

  // Initialize pen's states to zero.
  [dx, dy, pen_down, pen_up, pen_end] = model.zeroInput(); // The pen's states.

  // Zero out the rnn's initial states.
  rnn_state = model.zeroState();

  // Define color of line.
  line_color = color(random(64, 224), random(64, 224), random(64, 224));
};

function draw() {
  // See if we finished drawing.
  if (prev_pen[2] == 1) {
    noLoop(); // Stop drawing.
    return;
  }

  // Using the previous pen states, and hidden state, get next hidden state
  // the below line takes the most CPU power, especially for large models.
  rnn_state = model.update([dx, dy, pen_down, pen_up, pen_end], rnn_state);

  // Get the parameters of the probability distribution (pdf) from hidden state.
  pdf = model.getPDF(rnn_state, temperature);

  // Sample the next pen's states from our probability distribution.
  [dx, dy, pen_down, pen_up, pen_end] = model.sample(pdf);

  // Only draw on the paper if the pen is touching the paper.
  if (prev_pen[0] == 1) {
    stroke(line_color);
    strokeWeight(3.0);
    line(x, y, x+dx, y+dy); // Draw line connecting prev point to current point.
  }

  // Update the absolute coordinates from the offsets
  x += dx;
  y += dy;

  // Update the previous pen's state to the current one we just sampled
  prev_pen = [pen_down, pen_up, pen_end];
};
```

## Demos

There are several demos available in `demos` directory that show how to use the SketchRNN model. You can also view the [hosted demos](https://tensorflow.github.io/magenta-js/sketch/demos), or run the
examples locally by running `yarn run-demos`. This command will first build the library `magentasketch.js` from the TypeScript source files, and then launch the server, where you can put in `http://127.0.0.1:8080` into your web browser to select the demos.

### 1) simple.html / simple.js
This demo generates a bird using the model using the example code in the earlier section.

See the [simple](https://tensorflow.github.io/magenta-js/sketch/demos/simple.html) demo.

### 2) predict.html / predict.js

This demo attempts to finish the drawing given starting set of strokes (a circle, drawn in red).
In this demo, you can also select other classes, like "cat", "ant", "bus", etc.  The demo will dynamically load the json files in the models directory but cache previously loaded json models.

See the [predict](https://tensorflow.github.io/magenta-js/sketch/demos/predict.html) demo.

### 3) interactive\_predict.html / interactive\_predict.js

Same as the previous demo, but made to be interactive so the user can draw the beginning of a sketch on the canvas. Similar to the first [AI experiment](https://magenta.tensorflow.org/sketch-rnn-demo). Hitting restart will clear the current human-entered drawing and start from scratch.

See the [interactive predict](https://tensorflow.github.io/magenta-js/sketch/demos/interactive_predict.html) demo.

## Pre-trained models
We have provided around 100 pre-trained sketch-rnn models. We have trained the models with a .gen.json extension.

The models are located in:

`https://storage.googleapis.com/quickdraw-models/sketchRNN/large_models/category.gen.json`

where *category* is a quickdraw category such as *cat*, *dog*, *the\_mona\_lisa* etc., Some models are trained on more than one category, such as *catpig* or *crabrabbitfacepig*.

i.e.

`https://storage.googleapis.com/quickdraw-models/sketchRNN/large_models/spider.gen.json`

or

`https://storage.googleapis.com/quickdraw-models/sketchRNN/large_models/the_mona_lisa.gen.json`

A set of smaller models (with LSTM node size = 512 only) are located in:

`https://storage.googleapis.com/quickdraw-models/sketchRNN/models/category.gen.json`

Here is a list of all the models provided:

|Models   | | | | |
|---|---|---|---|---|
|alarm_clock|ambulance|angel|ant|antyoga|
|backpack|barn|basket|bear|bee|
|beeflower|bicycle|bird|book|brain|
|bridge|bulldozer|bus|butterfly|cactus|
|calendar|castle|cat|catbus|catpig|
|chair|couch|crab|crabchair|crabrabbitfacepig|
|cruise_ship|diving_board|dog|dogbunny|dolphin|
|duck|elephant|elephantpig|eye|face|
|fan|fire_hydrant|firetruck|flamingo|flower|
|floweryoga|frog|frogsofa|garden|hand|
|hedgeberry|hedgehog|helicopter|kangaroo|key|
|lantern|lighthouse|lion|lionsheep|lobster|
|map|mermaid|monapassport|monkey|mosquito|
|octopus|owl|paintbrush|palm_tree|parrot|
|passport|peas|penguin|pig|pigsheep|
|pineapple|pool|postcard|power_outlet|rabbit|
|rabbitturtle|radio|radioface|rain|rhinoceros|
|rifle|roller_coaster|sandwich|scorpion|sea_turtle|
|sheep|skull|snail|snowflake|speedboat|
|spider|squirrel|steak|stove|strawberry|
|swan|swing_set|the_mona_lisa|tiger|toothbrush|
|toothpaste|tractor|trombone|truck|whale|
|windmill|yoga|yogabicycle|everything||


## Building the model

The implementation was written in TypeScript and built with the yarn tool:

`yarn install` to install dependencies.

`yarn build` to compile ts into js

`yarn bundle` to produce a bundled version in `dist/`.

## Train own model

There is a small IPython [notebook](https://github.com/tensorflow/magenta-demos/blob/master/jupyter-notebooks/Sketch_RNN_TF_To_JS_Tutorial.ipynb) to show how to quickly train a sketch-rnn model with Python-based TensorFlow model, and convert that model over to the JSON format that can be used by by this model.

## Additional Notes

### Scale Factors

When training the models, all the offset data has been normalized to have a standard deviation of 1.0 on the training set, after simplifying the strokes.  Neural nets work best when training on normalized data.  However, the original data recorded with the QuickDraw web app stored everything as pixels, which was scaled down so that on average the stroke offsets are ~ 1.0 length.  Thus each dataclass has its own `scale_factors` to scale down, and these numbers are usually between 60 to 120 depending on the dataset.  These scale factors are stored into `model.info.scale_factor`.  The model will assume all inputs and outputs to be in pixel space, not normalized space, and will do all the scaling for you.  You can modify these in the model directly, but it is not recommended.  Rather than overwriting the `scale_factor` value, modify the pixel_factor instead, as described in the next paragraph.

If using PaperJS, it is recommended that you leave everything as it is.  When using P5.JS, all the recorded data looks much bigger compared to the original app by a factor of exactly 2, and this is likely due to anti-aliasing functionality of web browsers.  Hence the extra scaling factor for the model called `pixel_factor`.  If you want to make interactive apps and receive realtime drawing data from the user, and you are using PaperJS, it is best to set do a `model.set_pixel_factor(1.0)`.  For p5.js, do a `model.set_pixel_factor(2.0)`.  For non-interactive applications, using a larger `set_pixel_factor` will reduce the size of the generated image.

### Line Data vs Stroke Data

Data collected by the original quickdraw app are stored in the below format, which is a list of list of ["x", "y"] pixel points.

```
[[["x": 123, "y": 456], ["x": 127, "y": 454], ["x": 137, "y": 450], ["x": 147, "y": 440],  ...], ...]
```

The first thing to do is to convert this format into line format, and get rid of the "x" and "y" orderings.  In the Line Data format, x always come before y:

```
Line Data: [[[123, 456], [127, 454], [137, 450], [147, 440],  ...], ...]
```

The model contains helper functions to convert between this formats. This Line Data format must be first simplified using `simplify_lines` or `simplify_line` (depending if it is a list of polylines or just a single polyline) first.  Afterwards, the simplified line will be fed into lines_to_strokes to convert into the Stroke Data format used by the model.

In the Stroke Data format, we assume the drawing starts at the origin, and store only the offset points from the previous location.  The format is 2 dimensional, rather than 3 dimensional as in the Line Data format:

Each row of the stroke will be 5 elements:

```
[dx, dy, p0, p1, p2]
```

`dx, dy` are the offsets in pixels from the previous point.

`p0, p1, p2` are binary values, and only one of them will be 1, the other 2 must be 0.

```text
p0 = 1 means the pen stays on the paper at the next stroke.
p1 = 1 means the pen will is now above the paper after this stroke.  The next stroke will be the start of a new line.
p2 = 1 means the drawing has stopped.  Stop drawing anything!
```

The drawing will be decomposed into a list of `[dx, dy, p0, p1, p2]` strokes.

The mapping from Line Data to Stroke Data will lose the information about the starting position of the drawing, so you may want to record `LineData[0][0]` to keep this info.

<!-- links -->
[sketch-rnn]: https://github.com/tensorflow/magenta/tree/master/magenta/models/sketch_rnn
