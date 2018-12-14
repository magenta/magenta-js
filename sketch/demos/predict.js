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
 /**
 * Author: David Ha <hadavid@google.com>
 *
 * @fileoverview Basic p5.js sketch to show how to use sketch-rnn
 * to finish a fixed incomplete drawings, and loop through multiple
 * endings automatically.
 */

const sketch = function(p) {
  // Available SketchRNN models.
  const BASE_URL = 'https://storage.googleapis.com/quickdraw-models/sketchRNN/models/';
  const availableModels = ['bird','ant','angel','bee','bicycle','flamingo','flower','mosquito','owl','spider','yoga'];
  let model;

  // Model state.
  let modelState; // Store the hidden states of rnn's neurons.
  let temperature = 0.25; // Controls the amount of uncertainty of the model.
  let modelLoaded = false;

  let dx, dy; // Offsets of the pen strokes, in pixels.
  let x, y; // Absolute coordinates on the screen of where the pen is.
  let pen = [0,0,0]; // Current pen state, [pen_down, pen_up, pen_end].
  let previousPen = [1, 0, 0]; // Previous pen state.
  const PEN = {DOWN: 0, UP: 1, END: 2};

  /*
   * Main p5 code
   */
  p.setup = function() {
    const containerSize = document.getElementById('sketch').getBoundingClientRect();
    // Initialize the canvas.
    const screen_width = Math.floor(containerSize.width);
    const screen_height = p.windowHeight / 2;
    p.createCanvas(screen_width, screen_height);
    p.frameRate(60);

    setupNewDrawing();
    initModel(0);
    initDOMElements();
  };

  p.draw = function() {
    if (!modelLoaded) {
      return;
    }

    // If we finished the previous drawing, start a new one.
    if (previousPen[PEN.END] === 1) {
      restart();
    }

    // New state.
    const pdf = model.getPDF(modelState, temperature);
    [dx, dy, ...pen] = model.sample(pdf);

    // Only draw on the paper if the pen is still touching the paper.
    if (previousPen[PEN.DOWN] == 1) {
      p.line(x, y, x+dx, y+dy); // Draw line connecting prev point to current point.
    }

    // Update the absolute coordinates from the offsets
    x += dx;
    y += dy;

    // Update the previous pen's state to the current one we just sampled.
    previousPen = pen;
    modelState = model.update([dx, dy, ...pen], modelState);
  };
   /*
   * Helpers.
   */
  function restart() {
    // Initial strokes that we will attempt to continue.
    const strokes = [[-4,0,1,0,0],[-15,9,1,0,0],[-10,17,1,0,0],[-1,28,1,0,0],[14,13,1,0,0],[12,4,1,0,0],[22,1,1,0,0],[14,-11,1,0,0],[5,-12,1,0,0],[2,-19,1,0,0],[-12,-23,1,0,0],[-13,-7,1,0,0],[-14,-1,0,1,0]];

    // Draw strokes.
    setupNewDrawing();
    const lastPoint = drawStrokes(strokes, x, y);

    // Encode the strokes in the model.
    let newState = model.zeroState();
    newState = model.update(model.zeroInput(), newState);
    newState = model.updateStrokes(strokes, newState);

    // Reset the actual model we're using to this one that has the encoded strokes.
    modelState = model.copyState(newState);

    // Reset the pen state.
    x = lastPoint[0];
    y = lastPoint[1];
    previousPen = [0, 1, 0];

    // Reset the line colour.
    p.stroke(p.color(p.random(64, 224), p.random(64, 224), p.random(64, 224)));
  };

  function setupNewDrawing() {
    p.background(255, 255, 255, 255);
    p.strokeWeight(3.0);
    x = p.width / 2.0;
    y = p.height / 3.0;
  }

  function initModel(index) {
    modelLoaded = false;
    if (model) {
      model.dispose();
    }
    model = new ms.SketchRNN(`${BASE_URL}${availableModels[index]}.gen.json`);

    Promise.all([model.initialize()]).then(function() {
      modelLoaded = true;
      console.log('SketchRNN model loaded.');

      // Initialize the scale factor for the model. Bigger -> large outputs
      model.setPixelFactor(5.0);
      restart();
    });
  };

  // This is very similar to the p.draw() loop, but instead of
  // sampling from the model, it uses the given set of strokes.
  function drawStrokes(strokes, startX, startY) {
    p.stroke(p.color(255,0,0));

    let x = startX;
    let y = startY;
    let dx, dy;
    let pen = [0,0,0], previousPen = [0,0,0];
    for( let i = 0; i < strokes.length; i++) {
      [dx, dy, ...pen] = strokes[i];

      if (previousPen[PEN.END] == 1) { // End of drawing.
        break;
      }

      // Only draw on the paper if the pen is still touching the paper.
      if (previousPen[PEN.DOWN] == 1) {
        p.line(x, y, x+dx, y+dy);
      }
      x += dx;
      y += dy;
      previousPen = pen;
    }
    return [x, y]; // Final coordinates.
  };

  function initDOMElements() {
    // Setup the DOM bits.
    selectModels.innerHTML = availableModels.map(m => `<option>${m}</option>`).join('');
    selectModels.addEventListener('change', () => initModel(selectModels.selectedIndex));
    inputTemperature.addEventListener('change', () => {
      temperature = parseFloat(inputTemperature.value);
      textTemperature.textContent = temperature;
    });
    textTemperature.textContent = inputTemperature.value = temperature;
  }
};

const custom_p5 = new p5(sketch, 'sketch');
