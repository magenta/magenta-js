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
var sketch = function( p ) {
  "use strict";

  console.log("SketchRNN JS demo.");
  var model;
  var dx, dy; // offsets of the pen strokes, in pixels
  var pen_down, pen_up, pen_end; // keep track of whether pen is touching paper
  var x, y; // absolute coordinates on the screen of where the pen is
  var prev_pen = [1, 0, 0]; // group all p0, p1, p2 together
  var rnn_state; // store the hidden states of rnn's neurons
  var pdf; // store all the parameters of a mixture-density distribution
  var temperature = 0.45; // controls the amount of uncertainty of the model
  var line_color;
  var model_loaded = false;
  var screen_width, screen_height;

  model = new ms.SketchRNN("https://storage.googleapis.com/quickdraw-models/sketchRNN/large_models/bird.gen.json");


  var clear_screen = function() {
    p.background(255, 255, 255, 255);
    p.fill(255, 255, 255, 255);
  };

  var restart = function() {
    // initialize pen's states to zero.
    [dx, dy, pen_down, pen_up, pen_end] = model.zeroInput(); // the pen's states

    // zero out the rnn's initial states
    rnn_state = model.zeroState();

    clear_screen();

  }

  Promise.all([model.initialize()]).then(function() {
    // initialize the scale factor for the model. Bigger -> large outputs
    model.setPixelFactor(3.0);
    restart();
    model_loaded = true;
    console.log("model loaded.");
  });

  p.setup = function() {
    screen_width = p.windowWidth; //window.innerWidth
    screen_height = p.windowHeight; //window.innerHeight
    x = screen_width/2.0;
    y = screen_height/3.0;
    p.createCanvas(screen_width, screen_height);
    p.frameRate(60);

    // define color of line
    line_color = p.color(p.random(64, 224), p.random(64, 224), p.random(64, 224));
  };

  p.draw = function() {
    if (!model_loaded) {
      return;
    }
    // see if we finished drawing
    if (prev_pen[2] == 1) {
      //p.noLoop(); // stop drawing
      //return
      restart();
      x = screen_width/2.0;
      y = screen_height/3.0;
      line_color = p.color(p.random(64, 224), p.random(64, 224), p.random(64, 224));
    }

    // using the previous pen states, and hidden state, get next hidden state
    // the below line takes the most CPU power, especially for large models.
    rnn_state = model.update([dx, dy, pen_down, pen_up, pen_end], rnn_state);

    // get the parameters of the probability distribution (pdf) from hidden state
    pdf = model.getPDF(rnn_state, temperature);

    // sample the next pen's states from our probability distribution
    [dx, dy, pen_down, pen_up, pen_end] = model.sample(pdf);

    // only draw on the paper if the pen is touching the paper
    if (prev_pen[0] == 1) {
      p.stroke(line_color);
      p.strokeWeight(3.0);
      p.line(x, y, x+dx, y+dy); // draw line connecting prev point to current point.
    }

    // update the absolute coordinates from the offsets
    x += dx;
    y += dy;

    // update the previous pen's state to the current one we just sampled
    prev_pen = [pen_down, pen_up, pen_end];
  };

};
var custom_p5 = new p5(sketch, 'sketch');
