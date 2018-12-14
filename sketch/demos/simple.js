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
const sketch = function( p ) {
  // Load the model.
  const model = new ms.SketchRNN("https://storage.googleapis.com/quickdraw-models/sketchRNN/large_models/bird.gen.json");

  let rnn_state; // Store the hidden states of rnn's neurons.
  const temperature = 0.45; // Controls the amount of uncertainty of the model.
  let model_loaded = false;

  let dx, dy; // Offsets of the pen strokes, in pixels.
  let x, y; // Absolute coordinates on the screen of where the pen is.
  let pen = [0,0,0]; // Current pen state, [pen_down, pen_up, pen_end].
  let prev_pen = [1, 0, 0]; // Previous pen state.
  const PEN = {DOWN: 0, UP: 1, END: 2};


  Promise.all([model.initialize()]).then(function() {
    // Initialize the scale factor for the model. Bigger -> large outputs
    model.setPixelFactor(3.0);
    restart();
    model_loaded = true;
    console.log("SketchRNN model loaded.");
  });

  /*
   * Main p5 code
   */
  p.setup = function() {
    // Initialize the canvas.
    const screen_width = p.windowWidth;
    const screen_height = p.windowHeight;
    p.createCanvas(screen_width, screen_height);
    p.frameRate(60);

    setupNewDrawing();
  };

  // Drawing loop.
  p.draw = function() {
    if (!model_loaded) {
      return;
    }

    // If we finished the previous drawing, start a new one.
    if (prev_pen[PEN.END] === 1) {
      restart();
    }

    // New state.
    [dx, dy, ...pen] = sampleNewState();

    // Only draw on the paper if the pen is still touching the paper.
    if (prev_pen[PEN.DOWN] == 1) {
      p.line(x, y, x+dx, y+dy); // Draw line connecting prev point to current point.
    }

    // Update the absolute coordinates from the offsets
    x += dx;
    y += dy;

    // Update the previous pen's state to the current one we just sampled.
    prev_pen = pen;
  };

  function sampleNewState() {
    // Using the previous pen states, and hidden state, get next hidden state
    // the below line takes the most CPU power, especially for large models.
    rnn_state = model.update([dx, dy, ...pen], rnn_state);

    // Get the parameters of the probability distribution (pdf) from hidden state.
    const pdf = model.getPDF(rnn_state, temperature);

    // Sample the next pen's states from our probability distribution.
    return model.sample(pdf);
  }

  function setupNewDrawing() {
    x = screen_width / 2.0;
    y = screen_height / 3.0;
    const lineColor = p.color(p.random(64, 224), p.random(64, 224), p.random(64, 224));

    p.strokeWeight(3.0);
    p.stroke(lineColor);
  }

  function restart() {
    // Initialize pen's states to zero.
    [dx, dy, ...pen] = model.zeroInput();

    // Sero out the rnn's initial states.
    rnn_state = model.zeroState();

    // Clear the screen.
    p.background(255, 255, 255, 255);
  }
};

const custom_p5 = new p5(sketch, 'sketch');
