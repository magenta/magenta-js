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
const sketch = function(p) {
  let modelState; // Store the hidden states of rnn's neurons.
  const temperature = 0.45; // Controls the amount of uncertainty of the model.
  let modelLoaded = false;

  let dx, dy; // Offsets of the pen strokes, in pixels.
  let x, y; // Absolute coordinates on the screen of where the pen is.
  let pen = [0,0,0]; // Current pen state, [pen_down, pen_up, pen_end].
  let previousPen = [1, 0, 0]; // Previous pen state.
  const PEN = {DOWN: 0, UP: 1, END: 2};

  // Load the model.
  const model = new ms.SketchRNN('https://storage.googleapis.com/quickdraw-models/sketchRNN/large_models/bird.gen.json');


  /*
   * Main p5 code
   */
  p.setup = function() {
    const containerSize = document.getElementById('sketch').getBoundingClientRect();
    // Initialize the canvas.
    const screenWidth = Math.floor(containerSize.width);
    const screenHeight = p.windowHeight / 2;
    p.createCanvas(screenWidth, screenHeight);
    p.frameRate(60);

    model.initialize().then(function() {
      // Initialize the scale factor for the model. Bigger -> large outputs
      model.setPixelFactor(3.0);
      modelLoaded = true;
      restart();
      console.log('SketchRNN model loaded.');
    });
  };

  // Drawing loop.
  p.draw = function() {
    if (!modelLoaded) {
      return;
    }

    // If we finished the previous drawing, start a new one.
    if (previousPen[PEN.END] === 1) {
      restart();
    }

    // New state.
    [dx, dy, ...pen] = sampleNewState();

    // Only draw on the paper if the pen is still touching the paper.
    if (previousPen[PEN.DOWN] == 1) {
      p.line(x, y, x+dx, y+dy); // Draw line connecting prev point to current point.
    }

    // Update the absolute coordinates from the offsets
    x += dx;
    y += dy;

    // Update the previous pen's state to the current one we just sampled.
    previousPen = pen;
  };

  /*
   * Helpers.
   */
  function sampleNewState() {
    // Using the previous pen states, and hidden state, get next hidden state
    // the below line takes the most CPU power, especially for large models.
    modelState = model.update([dx, dy, ...pen], modelState);

    // Get the parameters of the probability distribution (pdf) from hidden state.
    const pdf = model.getPDF(modelState, temperature);

    // Sample the next pen's states from our probability distribution.
    return model.sample(pdf);
  }

  function setupNewDrawing() {
    p.background(255, 255, 255, 255);
    x = p.width / 2.0;
    y = p.height / 3.0;
    const lineColor = p.color(p.random(64, 224), p.random(64, 224), p.random(64, 224));

    p.strokeWeight(3.0);
    p.stroke(lineColor);
  }

  function restart() {
    [dx, dy, ...pen] = model.zeroInput();  // Reset the pen state.
    modelState = model.zeroState();  // Reset the model state.
    setupNewDrawing();
  }
};

new p5(sketch, 'sketch');
