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
  const availableModels = ['bird', 'ant','ambulance','angel','alarm_clock','antyoga','backpack','barn','basket','bear','bee','beeflower','bicycle','book','brain','bridge','bulldozer','bus','butterfly','cactus','calendar','castle','cat','catbus','catpig','chair','couch','crab','crabchair','crabrabbitfacepig','cruise_ship','diving_board','dog','dogbunny','dolphin','duck','elephant','elephantpig','everything','eye','face','fan','fire_hydrant','firetruck','flamingo','flower','floweryoga','frog','frogsofa','garden','hand','hedgeberry','hedgehog','helicopter','kangaroo','key','lantern','lighthouse','lion','lionsheep','lobster','map','mermaid','monapassport','monkey','mosquito','octopus','owl','paintbrush','palm_tree','parrot','passport','peas','penguin','pig','pigsheep','pineapple','pool','postcard','power_outlet','rabbit','rabbitturtle','radio','radioface','rain','rhinoceros','rifle','roller_coaster','sandwich','scorpion','sea_turtle','sheep','skull','snail','snowflake','speedboat','spider','squirrel','steak','stove','strawberry','swan','swing_set','the_mona_lisa','tiger','toothbrush','toothpaste','tractor','trombone','truck','whale','windmill','yoga','yogabicycle'];
  let model;

  // Model state.
  let modelState; // Store the hidden states of rnn's neurons.
  let temperature = 0.25; // Controls the amount of uncertainty of the model.
  let modelLoaded = false;
  let modelIsActive = false;

  let dx, dy; // Offsets of the pen strokes, in pixels.
  let x, y; // Absolute coordinates on the screen of where the pen is.
  let start_x, start_y;
  let userPen = 0; // above or below the paper
  let previousUserPen = 0;
  let pen = [0,0,0]; // Current pen state, [pen_down, pen_up, pen_end].
  let previousPen = [1, 0, 0]; // Previous pen state.
  const PEN = {DOWN: 0, UP: 1, END: 2};
  const epsilon = 2.0; // to ignore data from user's pen staying in one spot.

  let just_finished_line;
  let has_started = false;
  let raw_lines;
  let current_raw_line = [];
  let strokes;
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

  /*
  * Human is drawing.
  */
  p.mousePressed = function () {
    if (p.isInBounds()) {
      // First time anything is written.
      if (!has_started) {
        has_started = true;
        x = start_x = p.mouseX;
        y = start_y = p.mouseY;
        userPen = 1; // down!
      }

      modelIsActive = false;
      previousUserPen = userPen;
      p.stroke(p.color(255,0,0));  // User always draws in red.
      p.mouseDragged();
    }
  }

  p.mouseReleased = function () {
    if (p.isInBounds()) {
      userPen = 0;  // Up!

      if (just_finished_line) {
        const current_raw_line_simple = model.simplifyLine(current_raw_line);
        let last_x, last_y;

        if (current_raw_line_simple.length > 1) {
          if (raw_lines.length === 0) {
            last_x = start_x;
            last_y = start_y;
          } else {
            const idx = raw_lines.length-1;
            const last_point = raw_lines[idx][raw_lines[idx].length-1];
            last_x = last_point[0];
            last_y = last_point[1];
          }
          const stroke = model.lineToStroke(current_raw_line_simple, [last_x, last_y]);
          raw_lines.push(current_raw_line_simple);
          strokes = strokes.concat(stroke);

          initRNNStateFromStrokes(strokes);
        }
        current_raw_line = [];
        just_finished_line = false;
      }
      modelIsActive = true;
      previousUserPen = userPen;

    }
  }

  p.mouseDragged = function () {
    if (!modelIsActive && p.isInBounds()) {
      const dx0 = p.mouseX - x; // Candidate for dx.
      const dy0 = p.mouseY - y; // Candidate for dy.
      if (dx0*dx0+dy0*dy0 > epsilon*epsilon) { // Only if pen is not in same area.
        dx = dx0;
        dy = dy0;
        userPen = 1;
        if (previousUserPen == 1) {
          p.line(x, y, x+dx, y+dy); // draw line connecting prev point to current point.
        }
        x += dx;
        y += dy;
        // update raw_lines
        current_raw_line.push([x, y]);
        just_finished_line = true;
      }
      previousUserPen = userPen;

    }
  }

 /*
  * Model is drawing.
  */
  p.draw = function() {
    if (!modelLoaded || !modelIsActive) {
      return;
    }
    // New state.
    pen = previousPen;
    modelState = model.update([dx, dy, ...pen], modelState);
    const pdf = model.getPDF(modelState, temperature);
    [dx, dy, ...pen] = model.sample(pdf);

    // If we finished the previous drawing, start a new one.
    if (pen[PEN.END] === 1) {
      initRNNStateFromStrokes(strokes);
    } else {
      // Only draw on the paper if the pen is still touching the paper.
      if (previousPen[PEN.DOWN] === 1) {
        p.line(x, y, x+dx, y+dy); // Draw line connecting prev point to current point.
      }
      // Update.
      x += dx;
      y += dy;
      previousPen = pen;
    }
  };

  p.isInBounds = function () {
    return p.mouseX >= 0 && p.mouseY >= 0;
  }
   /*
   * Helpers.
   */
  function restart() {
    setupNewDrawing();
    start_x = x;
    start_y = y;

    // Reset the user drawing state.
    userPen = 1;
    previousUserPen = 0;
    just_finished_line = false;
    modelIsActive = false;
    raw_lines = [];
    current_raw_line = [];
    strokes = [];
    previousPen = [0, 1, 0];
    has_started = false;
  };

  function initRNNStateFromStrokes(strokes) {
    // Initialize the RNN with these strokes.
    encodeStrokes(strokes);

    // Redraw simplified strokes
    p.background(255, 255, 255, 255);
    drawStrokes(strokes, start_x, start_y);
  }

  function setupNewDrawing() {
    p.background(255, 255, 255, 255);
    p.strokeWeight(3.0);
    // Start drawing in the middle-ish of the screen
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

      if (strokes.length > 0) {
        initRNNStateFromStrokes(strokes);
      }
    });
  };

  function encodeStrokes(sequence) {
    if (sequence.length <= 5) {
      return;
    }

    // Encode the strokes in the model.
    let newState = model.zeroState();
    newState = model.update(model.zeroInput(), newState);
    newState = model.updateStrokes(sequence, newState, sequence.length-1);

    // Reset the actual model we're using to this one that has the encoded strokes.
    modelState = model.copyState(newState);

    // Reset the state.
    const idx = raw_lines.length - 1;
    const last_point = raw_lines[idx][raw_lines[idx].length-1];
    x = last_point[0];
    y = last_point[1];

    const s = sequence[sequence.length-1];
    dx = s[0];
    dy = s[1];
    previousPen = [s[2], s[3], s[4]];

    modelIsActive = true;
  }

  // This is very similar to the p.draw() loop, but instead of
  // sampling from the model, it uses the given set of strokes.
  function drawStrokes(strokes, startX, startY) {
    p.stroke(p.color(255,0,0));

    let x = startX;
    let y = startY;
    let dx, dy;
    let pen = [0,0,0];
    let previousPen = [1,0,0];
    for( let i = 0; i < strokes.length; i++) {
      [dx, dy, ...pen] = strokes[i];

      if (previousPen[PEN.END] === 1) { // End of drawing.
        break;
      }

      // Only draw on the paper if the pen is still touching the paper.
      if (previousPen[PEN.DOWN] === 1) {
        p.line(x, y, x+dx, y+dy);
      }
      x += dx;
      y += dy;
      previousPen = pen;
    }

    // Draw in a random colour after the predefined strokes.
    p.stroke(p.color(p.random(64, 224), p.random(64, 224), p.random(64, 224)));
  };

  function initDOMElements() {
    // Setup the DOM bits.
    textTemperature.textContent = inputTemperature.value = temperature;

    // Listeners
    selectModels.innerHTML = availableModels.map(m => `<option>${m}</option>`).join('');
    selectModels.addEventListener('change', () => initModel(selectModels.selectedIndex));
    inputTemperature.addEventListener('change', () => {
      temperature = parseFloat(inputTemperature.value);
      textTemperature.textContent = temperature;
    });
    btnClear.addEventListener('click', restart)
    btnRandom.addEventListener('click', () => {
      selectModels.selectedIndex = Math.floor(Math.random() * availableModels.length);
      initModel(selectModels.selectedIndex);
    });
  }
};

const custom_p5 = new p5(sketch, 'sketch');
