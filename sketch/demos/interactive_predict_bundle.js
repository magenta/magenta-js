/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demos/interactive_predict.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demos/interactive_predict.js":
/*!**************************************!*\
  !*** ./demos/interactive_predict.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  let startX, startY;
  let userPen = 0; // above or below the paper
  let previousUserPen = 0;
  let pen = [0,0,0]; // Current pen state, [pen_down, pen_up, pen_end].
  let previousPen = [1, 0, 0]; // Previous pen state.
  const PEN = {DOWN: 0, UP: 1, END: 2};
  const epsilon = 2.0; // to ignore data from user's pen staying in one spot.

  let userHasEverDrawn = false;
  let allRawLines;
  let currentRawLine = [];
  let strokes;
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

    restart();
    initModel(0);
    initDOMElements();
  };

  /*
  * Human is drawing.
  */
  p.mousePressed = function () {
    if (p.isInBounds()) {
      // First time anything is written.
      if (!userHasEverDrawn) {
        userHasEverDrawn = true;
        x = startX = p.mouseX;
        y = startY = p.mouseY;
        userPen = 1; // down!
      }

      modelIsActive = false;
      previousUserPen = userPen;
      p.stroke(p.color(255,0,0));  // User always draws in red.
    }
  }

  p.mouseReleased = function () {
    if (p.isInBounds()) {
      userPen = 0;  // Up!

      const currentRawLineSimplified = model.simplifyLine(currentRawLine);
      let lastX, lastY;

      // If it's an accident...ignore it.
      if (currentRawLineSimplified.length > 1) {
        // Need to keep track of the first point of the last line.
        if (allRawLines.length === 0) {
          lastX = startX;
          lastY = startY;
        } else {
          // The last line.
          const idx = allRawLines.length - 1;
          const lastPoint = allRawLines[idx][allRawLines[idx].length-1];
          lastX = lastPoint[0];
          lastY = lastPoint[1];
        }

        // Encode this line as a stroke, and feed it to the model.
        const stroke = model.lineToStroke(currentRawLineSimplified, [lastX, lastY]);
        allRawLines.push(currentRawLineSimplified);
        strokes = strokes.concat(stroke);

        initRNNStateFromStrokes(strokes);
      }
      currentRawLine = [];
    }
    modelIsActive = true;
    previousUserPen = userPen;
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
        currentRawLine.push([x, y]);
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
    p.background(255, 255, 255, 255);
    p.strokeWeight(3.0);

    // Start drawing in the middle-ish of the screen
    startX = x = p.width / 2.0;
    startY = y = p.height / 3.0;

    // Reset the user drawing state.
    userPen = 1;
    previousUserPen = 0;
    userHasEverDrawn = false;
    allRawLines = [];
    currentRawLine = [];
    strokes = [];

    // Reset the model drawing state.
    modelIsActive = false;
    previousPen = [0, 1, 0];
  };

  function initRNNStateFromStrokes(strokes) {
    // Initialize the RNN with these strokes.
    encodeStrokes(strokes);
    // Draw them.
    p.background(255, 255, 255, 255);
    drawStrokes(strokes, startX, startY);
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
    const idx = allRawLines.length - 1;
    const lastPoint = allRawLines[idx][allRawLines[idx].length-1];
    x = lastPoint[0];
    y = lastPoint[1];

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

new p5(sketch, 'sketch');


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtb3MvaW50ZXJhY3RpdmVfcHJlZGljdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxvQkFBb0I7QUFDcEIsOEJBQThCO0FBQzlCLGVBQWU7QUFDZixzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLCtCQUErQjtBQUMvQiw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVMsRUFBRSx1QkFBdUI7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQSx1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpRUFBaUUsRUFBRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBIiwiZmlsZSI6ImludGVyYWN0aXZlX3ByZWRpY3RfYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9kZW1vcy9pbnRlcmFjdGl2ZV9wcmVkaWN0LmpzXCIpO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuIC8qKlxuICogQXV0aG9yOiBEYXZpZCBIYSA8aGFkYXZpZEBnb29nbGUuY29tPlxuICpcbiAqIEBmaWxlb3ZlcnZpZXcgQmFzaWMgcDUuanMgc2tldGNoIHRvIHNob3cgaG93IHRvIHVzZSBza2V0Y2gtcm5uXG4gKiB0byBmaW5pc2ggYSBmaXhlZCBpbmNvbXBsZXRlIGRyYXdpbmdzLCBhbmQgbG9vcCB0aHJvdWdoIG11bHRpcGxlXG4gKiBlbmRpbmdzIGF1dG9tYXRpY2FsbHkuXG4gKi9cblxuY29uc3Qgc2tldGNoID0gZnVuY3Rpb24ocCkge1xuICAvLyBBdmFpbGFibGUgU2tldGNoUk5OIG1vZGVscy5cbiAgY29uc3QgQkFTRV9VUkwgPSAnaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3F1aWNrZHJhdy1tb2RlbHMvc2tldGNoUk5OL21vZGVscy8nO1xuICBjb25zdCBhdmFpbGFibGVNb2RlbHMgPSBbJ2JpcmQnLCAnYW50JywnYW1idWxhbmNlJywnYW5nZWwnLCdhbGFybV9jbG9jaycsJ2FudHlvZ2EnLCdiYWNrcGFjaycsJ2Jhcm4nLCdiYXNrZXQnLCdiZWFyJywnYmVlJywnYmVlZmxvd2VyJywnYmljeWNsZScsJ2Jvb2snLCdicmFpbicsJ2JyaWRnZScsJ2J1bGxkb3plcicsJ2J1cycsJ2J1dHRlcmZseScsJ2NhY3R1cycsJ2NhbGVuZGFyJywnY2FzdGxlJywnY2F0JywnY2F0YnVzJywnY2F0cGlnJywnY2hhaXInLCdjb3VjaCcsJ2NyYWInLCdjcmFiY2hhaXInLCdjcmFicmFiYml0ZmFjZXBpZycsJ2NydWlzZV9zaGlwJywnZGl2aW5nX2JvYXJkJywnZG9nJywnZG9nYnVubnknLCdkb2xwaGluJywnZHVjaycsJ2VsZXBoYW50JywnZWxlcGhhbnRwaWcnLCdldmVyeXRoaW5nJywnZXllJywnZmFjZScsJ2ZhbicsJ2ZpcmVfaHlkcmFudCcsJ2ZpcmV0cnVjaycsJ2ZsYW1pbmdvJywnZmxvd2VyJywnZmxvd2VyeW9nYScsJ2Zyb2cnLCdmcm9nc29mYScsJ2dhcmRlbicsJ2hhbmQnLCdoZWRnZWJlcnJ5JywnaGVkZ2Vob2cnLCdoZWxpY29wdGVyJywna2FuZ2Fyb28nLCdrZXknLCdsYW50ZXJuJywnbGlnaHRob3VzZScsJ2xpb24nLCdsaW9uc2hlZXAnLCdsb2JzdGVyJywnbWFwJywnbWVybWFpZCcsJ21vbmFwYXNzcG9ydCcsJ21vbmtleScsJ21vc3F1aXRvJywnb2N0b3B1cycsJ293bCcsJ3BhaW50YnJ1c2gnLCdwYWxtX3RyZWUnLCdwYXJyb3QnLCdwYXNzcG9ydCcsJ3BlYXMnLCdwZW5ndWluJywncGlnJywncGlnc2hlZXAnLCdwaW5lYXBwbGUnLCdwb29sJywncG9zdGNhcmQnLCdwb3dlcl9vdXRsZXQnLCdyYWJiaXQnLCdyYWJiaXR0dXJ0bGUnLCdyYWRpbycsJ3JhZGlvZmFjZScsJ3JhaW4nLCdyaGlub2Nlcm9zJywncmlmbGUnLCdyb2xsZXJfY29hc3RlcicsJ3NhbmR3aWNoJywnc2NvcnBpb24nLCdzZWFfdHVydGxlJywnc2hlZXAnLCdza3VsbCcsJ3NuYWlsJywnc25vd2ZsYWtlJywnc3BlZWRib2F0Jywnc3BpZGVyJywnc3F1aXJyZWwnLCdzdGVhaycsJ3N0b3ZlJywnc3RyYXdiZXJyeScsJ3N3YW4nLCdzd2luZ19zZXQnLCd0aGVfbW9uYV9saXNhJywndGlnZXInLCd0b290aGJydXNoJywndG9vdGhwYXN0ZScsJ3RyYWN0b3InLCd0cm9tYm9uZScsJ3RydWNrJywnd2hhbGUnLCd3aW5kbWlsbCcsJ3lvZ2EnLCd5b2dhYmljeWNsZSddO1xuICBsZXQgbW9kZWw7XG5cbiAgLy8gTW9kZWwgc3RhdGUuXG4gIGxldCBtb2RlbFN0YXRlOyAvLyBTdG9yZSB0aGUgaGlkZGVuIHN0YXRlcyBvZiBybm4ncyBuZXVyb25zLlxuICBsZXQgdGVtcGVyYXR1cmUgPSAwLjI1OyAvLyBDb250cm9scyB0aGUgYW1vdW50IG9mIHVuY2VydGFpbnR5IG9mIHRoZSBtb2RlbC5cbiAgbGV0IG1vZGVsTG9hZGVkID0gZmFsc2U7XG4gIGxldCBtb2RlbElzQWN0aXZlID0gZmFsc2U7XG5cbiAgbGV0IGR4LCBkeTsgLy8gT2Zmc2V0cyBvZiB0aGUgcGVuIHN0cm9rZXMsIGluIHBpeGVscy5cbiAgbGV0IHgsIHk7IC8vIEFic29sdXRlIGNvb3JkaW5hdGVzIG9uIHRoZSBzY3JlZW4gb2Ygd2hlcmUgdGhlIHBlbiBpcy5cbiAgbGV0IHN0YXJ0WCwgc3RhcnRZO1xuICBsZXQgdXNlclBlbiA9IDA7IC8vIGFib3ZlIG9yIGJlbG93IHRoZSBwYXBlclxuICBsZXQgcHJldmlvdXNVc2VyUGVuID0gMDtcbiAgbGV0IHBlbiA9IFswLDAsMF07IC8vIEN1cnJlbnQgcGVuIHN0YXRlLCBbcGVuX2Rvd24sIHBlbl91cCwgcGVuX2VuZF0uXG4gIGxldCBwcmV2aW91c1BlbiA9IFsxLCAwLCAwXTsgLy8gUHJldmlvdXMgcGVuIHN0YXRlLlxuICBjb25zdCBQRU4gPSB7RE9XTjogMCwgVVA6IDEsIEVORDogMn07XG4gIGNvbnN0IGVwc2lsb24gPSAyLjA7IC8vIHRvIGlnbm9yZSBkYXRhIGZyb20gdXNlcidzIHBlbiBzdGF5aW5nIGluIG9uZSBzcG90LlxuXG4gIGxldCB1c2VySGFzRXZlckRyYXduID0gZmFsc2U7XG4gIGxldCBhbGxSYXdMaW5lcztcbiAgbGV0IGN1cnJlbnRSYXdMaW5lID0gW107XG4gIGxldCBzdHJva2VzO1xuICAvKlxuICAgKiBNYWluIHA1IGNvZGVcbiAgICovXG4gIHAuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjb250YWluZXJTaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NrZXRjaCcpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIEluaXRpYWxpemUgdGhlIGNhbnZhcy5cbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IE1hdGguZmxvb3IoY29udGFpbmVyU2l6ZS53aWR0aCk7XG4gICAgY29uc3Qgc2NyZWVuSGVpZ2h0ID0gcC53aW5kb3dIZWlnaHQgLyAyO1xuICAgIHAuY3JlYXRlQ2FudmFzKHNjcmVlbldpZHRoLCBzY3JlZW5IZWlnaHQpO1xuICAgIHAuZnJhbWVSYXRlKDYwKTtcblxuICAgIHJlc3RhcnQoKTtcbiAgICBpbml0TW9kZWwoMCk7XG4gICAgaW5pdERPTUVsZW1lbnRzKCk7XG4gIH07XG5cbiAgLypcbiAgKiBIdW1hbiBpcyBkcmF3aW5nLlxuICAqL1xuICBwLm1vdXNlUHJlc3NlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAocC5pc0luQm91bmRzKCkpIHtcbiAgICAgIC8vIEZpcnN0IHRpbWUgYW55dGhpbmcgaXMgd3JpdHRlbi5cbiAgICAgIGlmICghdXNlckhhc0V2ZXJEcmF3bikge1xuICAgICAgICB1c2VySGFzRXZlckRyYXduID0gdHJ1ZTtcbiAgICAgICAgeCA9IHN0YXJ0WCA9IHAubW91c2VYO1xuICAgICAgICB5ID0gc3RhcnRZID0gcC5tb3VzZVk7XG4gICAgICAgIHVzZXJQZW4gPSAxOyAvLyBkb3duIVxuICAgICAgfVxuXG4gICAgICBtb2RlbElzQWN0aXZlID0gZmFsc2U7XG4gICAgICBwcmV2aW91c1VzZXJQZW4gPSB1c2VyUGVuO1xuICAgICAgcC5zdHJva2UocC5jb2xvcigyNTUsMCwwKSk7ICAvLyBVc2VyIGFsd2F5cyBkcmF3cyBpbiByZWQuXG4gICAgfVxuICB9XG5cbiAgcC5tb3VzZVJlbGVhc2VkID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChwLmlzSW5Cb3VuZHMoKSkge1xuICAgICAgdXNlclBlbiA9IDA7ICAvLyBVcCFcblxuICAgICAgY29uc3QgY3VycmVudFJhd0xpbmVTaW1wbGlmaWVkID0gbW9kZWwuc2ltcGxpZnlMaW5lKGN1cnJlbnRSYXdMaW5lKTtcbiAgICAgIGxldCBsYXN0WCwgbGFzdFk7XG5cbiAgICAgIC8vIElmIGl0J3MgYW4gYWNjaWRlbnQuLi5pZ25vcmUgaXQuXG4gICAgICBpZiAoY3VycmVudFJhd0xpbmVTaW1wbGlmaWVkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gTmVlZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBmaXJzdCBwb2ludCBvZiB0aGUgbGFzdCBsaW5lLlxuICAgICAgICBpZiAoYWxsUmF3TGluZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgbGFzdFggPSBzdGFydFg7XG4gICAgICAgICAgbGFzdFkgPSBzdGFydFk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVGhlIGxhc3QgbGluZS5cbiAgICAgICAgICBjb25zdCBpZHggPSBhbGxSYXdMaW5lcy5sZW5ndGggLSAxO1xuICAgICAgICAgIGNvbnN0IGxhc3RQb2ludCA9IGFsbFJhd0xpbmVzW2lkeF1bYWxsUmF3TGluZXNbaWR4XS5sZW5ndGgtMV07XG4gICAgICAgICAgbGFzdFggPSBsYXN0UG9pbnRbMF07XG4gICAgICAgICAgbGFzdFkgPSBsYXN0UG9pbnRbMV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmNvZGUgdGhpcyBsaW5lIGFzIGEgc3Ryb2tlLCBhbmQgZmVlZCBpdCB0byB0aGUgbW9kZWwuXG4gICAgICAgIGNvbnN0IHN0cm9rZSA9IG1vZGVsLmxpbmVUb1N0cm9rZShjdXJyZW50UmF3TGluZVNpbXBsaWZpZWQsIFtsYXN0WCwgbGFzdFldKTtcbiAgICAgICAgYWxsUmF3TGluZXMucHVzaChjdXJyZW50UmF3TGluZVNpbXBsaWZpZWQpO1xuICAgICAgICBzdHJva2VzID0gc3Ryb2tlcy5jb25jYXQoc3Ryb2tlKTtcblxuICAgICAgICBpbml0Uk5OU3RhdGVGcm9tU3Ryb2tlcyhzdHJva2VzKTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRSYXdMaW5lID0gW107XG4gICAgfVxuICAgIG1vZGVsSXNBY3RpdmUgPSB0cnVlO1xuICAgIHByZXZpb3VzVXNlclBlbiA9IHVzZXJQZW47XG4gIH1cblxuICBwLm1vdXNlRHJhZ2dlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIW1vZGVsSXNBY3RpdmUgJiYgcC5pc0luQm91bmRzKCkpIHtcbiAgICAgIGNvbnN0IGR4MCA9IHAubW91c2VYIC0geDsgLy8gQ2FuZGlkYXRlIGZvciBkeC5cbiAgICAgIGNvbnN0IGR5MCA9IHAubW91c2VZIC0geTsgLy8gQ2FuZGlkYXRlIGZvciBkeS5cbiAgICAgIGlmIChkeDAqZHgwK2R5MCpkeTAgPiBlcHNpbG9uKmVwc2lsb24pIHsgLy8gT25seSBpZiBwZW4gaXMgbm90IGluIHNhbWUgYXJlYS5cbiAgICAgICAgZHggPSBkeDA7XG4gICAgICAgIGR5ID0gZHkwO1xuICAgICAgICB1c2VyUGVuID0gMTtcbiAgICAgICAgaWYgKHByZXZpb3VzVXNlclBlbiA9PSAxKSB7XG4gICAgICAgICAgcC5saW5lKHgsIHksIHgrZHgsIHkrZHkpOyAvLyBkcmF3IGxpbmUgY29ubmVjdGluZyBwcmV2IHBvaW50IHRvIGN1cnJlbnQgcG9pbnQuXG4gICAgICAgIH1cbiAgICAgICAgeCArPSBkeDtcbiAgICAgICAgeSArPSBkeTtcbiAgICAgICAgY3VycmVudFJhd0xpbmUucHVzaChbeCwgeV0pO1xuICAgICAgfVxuICAgICAgcHJldmlvdXNVc2VyUGVuID0gdXNlclBlbjtcbiAgICB9XG4gIH1cblxuIC8qXG4gICogTW9kZWwgaXMgZHJhd2luZy5cbiAgKi9cbiAgcC5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFtb2RlbExvYWRlZCB8fCAhbW9kZWxJc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBOZXcgc3RhdGUuXG4gICAgcGVuID0gcHJldmlvdXNQZW47XG4gICAgbW9kZWxTdGF0ZSA9IG1vZGVsLnVwZGF0ZShbZHgsIGR5LCAuLi5wZW5dLCBtb2RlbFN0YXRlKTtcbiAgICBjb25zdCBwZGYgPSBtb2RlbC5nZXRQREYobW9kZWxTdGF0ZSwgdGVtcGVyYXR1cmUpO1xuICAgIFtkeCwgZHksIC4uLnBlbl0gPSBtb2RlbC5zYW1wbGUocGRmKTtcblxuICAgIC8vIElmIHdlIGZpbmlzaGVkIHRoZSBwcmV2aW91cyBkcmF3aW5nLCBzdGFydCBhIG5ldyBvbmUuXG4gICAgaWYgKHBlbltQRU4uRU5EXSA9PT0gMSkge1xuICAgICAgaW5pdFJOTlN0YXRlRnJvbVN0cm9rZXMoc3Ryb2tlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9ubHkgZHJhdyBvbiB0aGUgcGFwZXIgaWYgdGhlIHBlbiBpcyBzdGlsbCB0b3VjaGluZyB0aGUgcGFwZXIuXG4gICAgICBpZiAocHJldmlvdXNQZW5bUEVOLkRPV05dID09PSAxKSB7XG4gICAgICAgIHAubGluZSh4LCB5LCB4K2R4LCB5K2R5KTsgLy8gRHJhdyBsaW5lIGNvbm5lY3RpbmcgcHJldiBwb2ludCB0byBjdXJyZW50IHBvaW50LlxuICAgICAgfVxuICAgICAgLy8gVXBkYXRlLlxuICAgICAgeCArPSBkeDtcbiAgICAgIHkgKz0gZHk7XG4gICAgICBwcmV2aW91c1BlbiA9IHBlbjtcbiAgICB9XG4gIH07XG5cbiAgcC5pc0luQm91bmRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwLm1vdXNlWCA+PSAwICYmIHAubW91c2VZID49IDA7XG4gIH1cbiAgIC8qXG4gICAqIEhlbHBlcnMuXG4gICAqL1xuICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIHAuYmFja2dyb3VuZCgyNTUsIDI1NSwgMjU1LCAyNTUpO1xuICAgIHAuc3Ryb2tlV2VpZ2h0KDMuMCk7XG5cbiAgICAvLyBTdGFydCBkcmF3aW5nIGluIHRoZSBtaWRkbGUtaXNoIG9mIHRoZSBzY3JlZW5cbiAgICBzdGFydFggPSB4ID0gcC53aWR0aCAvIDIuMDtcbiAgICBzdGFydFkgPSB5ID0gcC5oZWlnaHQgLyAzLjA7XG5cbiAgICAvLyBSZXNldCB0aGUgdXNlciBkcmF3aW5nIHN0YXRlLlxuICAgIHVzZXJQZW4gPSAxO1xuICAgIHByZXZpb3VzVXNlclBlbiA9IDA7XG4gICAgdXNlckhhc0V2ZXJEcmF3biA9IGZhbHNlO1xuICAgIGFsbFJhd0xpbmVzID0gW107XG4gICAgY3VycmVudFJhd0xpbmUgPSBbXTtcbiAgICBzdHJva2VzID0gW107XG5cbiAgICAvLyBSZXNldCB0aGUgbW9kZWwgZHJhd2luZyBzdGF0ZS5cbiAgICBtb2RlbElzQWN0aXZlID0gZmFsc2U7XG4gICAgcHJldmlvdXNQZW4gPSBbMCwgMSwgMF07XG4gIH07XG5cbiAgZnVuY3Rpb24gaW5pdFJOTlN0YXRlRnJvbVN0cm9rZXMoc3Ryb2tlcykge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIFJOTiB3aXRoIHRoZXNlIHN0cm9rZXMuXG4gICAgZW5jb2RlU3Ryb2tlcyhzdHJva2VzKTtcbiAgICAvLyBEcmF3IHRoZW0uXG4gICAgcC5iYWNrZ3JvdW5kKDI1NSwgMjU1LCAyNTUsIDI1NSk7XG4gICAgZHJhd1N0cm9rZXMoc3Ryb2tlcywgc3RhcnRYLCBzdGFydFkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdE1vZGVsKGluZGV4KSB7XG4gICAgbW9kZWxMb2FkZWQgPSBmYWxzZTtcbiAgICBpZiAobW9kZWwpIHtcbiAgICAgIG1vZGVsLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgbW9kZWwgPSBuZXcgbXMuU2tldGNoUk5OKGAke0JBU0VfVVJMfSR7YXZhaWxhYmxlTW9kZWxzW2luZGV4XX0uZ2VuLmpzb25gKTtcblxuICAgIFByb21pc2UuYWxsKFttb2RlbC5pbml0aWFsaXplKCldKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgbW9kZWxMb2FkZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5sb2coJ1NrZXRjaFJOTiBtb2RlbCBsb2FkZWQuJyk7XG5cbiAgICAgIC8vIEluaXRpYWxpemUgdGhlIHNjYWxlIGZhY3RvciBmb3IgdGhlIG1vZGVsLiBCaWdnZXIgLT4gbGFyZ2Ugb3V0cHV0c1xuICAgICAgbW9kZWwuc2V0UGl4ZWxGYWN0b3IoNS4wKTtcblxuICAgICAgaWYgKHN0cm9rZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBpbml0Uk5OU3RhdGVGcm9tU3Ryb2tlcyhzdHJva2VzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBlbmNvZGVTdHJva2VzKHNlcXVlbmNlKSB7XG4gICAgaWYgKHNlcXVlbmNlLmxlbmd0aCA8PSA1KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRW5jb2RlIHRoZSBzdHJva2VzIGluIHRoZSBtb2RlbC5cbiAgICBsZXQgbmV3U3RhdGUgPSBtb2RlbC56ZXJvU3RhdGUoKTtcbiAgICBuZXdTdGF0ZSA9IG1vZGVsLnVwZGF0ZShtb2RlbC56ZXJvSW5wdXQoKSwgbmV3U3RhdGUpO1xuICAgIG5ld1N0YXRlID0gbW9kZWwudXBkYXRlU3Ryb2tlcyhzZXF1ZW5jZSwgbmV3U3RhdGUsIHNlcXVlbmNlLmxlbmd0aC0xKTtcblxuICAgIC8vIFJlc2V0IHRoZSBhY3R1YWwgbW9kZWwgd2UncmUgdXNpbmcgdG8gdGhpcyBvbmUgdGhhdCBoYXMgdGhlIGVuY29kZWQgc3Ryb2tlcy5cbiAgICBtb2RlbFN0YXRlID0gbW9kZWwuY29weVN0YXRlKG5ld1N0YXRlKTtcblxuICAgIC8vIFJlc2V0IHRoZSBzdGF0ZS5cbiAgICBjb25zdCBpZHggPSBhbGxSYXdMaW5lcy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGxhc3RQb2ludCA9IGFsbFJhd0xpbmVzW2lkeF1bYWxsUmF3TGluZXNbaWR4XS5sZW5ndGgtMV07XG4gICAgeCA9IGxhc3RQb2ludFswXTtcbiAgICB5ID0gbGFzdFBvaW50WzFdO1xuXG4gICAgY29uc3QgcyA9IHNlcXVlbmNlW3NlcXVlbmNlLmxlbmd0aC0xXTtcbiAgICBkeCA9IHNbMF07XG4gICAgZHkgPSBzWzFdO1xuICAgIHByZXZpb3VzUGVuID0gW3NbMl0sIHNbM10sIHNbNF1dO1xuXG4gICAgbW9kZWxJc0FjdGl2ZSA9IHRydWU7XG4gIH1cblxuICAvLyBUaGlzIGlzIHZlcnkgc2ltaWxhciB0byB0aGUgcC5kcmF3KCkgbG9vcCwgYnV0IGluc3RlYWQgb2ZcbiAgLy8gc2FtcGxpbmcgZnJvbSB0aGUgbW9kZWwsIGl0IHVzZXMgdGhlIGdpdmVuIHNldCBvZiBzdHJva2VzLlxuICBmdW5jdGlvbiBkcmF3U3Ryb2tlcyhzdHJva2VzLCBzdGFydFgsIHN0YXJ0WSkge1xuICAgIHAuc3Ryb2tlKHAuY29sb3IoMjU1LDAsMCkpO1xuXG4gICAgbGV0IHggPSBzdGFydFg7XG4gICAgbGV0IHkgPSBzdGFydFk7XG4gICAgbGV0IGR4LCBkeTtcbiAgICBsZXQgcGVuID0gWzAsMCwwXTtcbiAgICBsZXQgcHJldmlvdXNQZW4gPSBbMSwwLDBdO1xuICAgIGZvciggbGV0IGkgPSAwOyBpIDwgc3Ryb2tlcy5sZW5ndGg7IGkrKykge1xuICAgICAgW2R4LCBkeSwgLi4ucGVuXSA9IHN0cm9rZXNbaV07XG5cbiAgICAgIGlmIChwcmV2aW91c1BlbltQRU4uRU5EXSA9PT0gMSkgeyAvLyBFbmQgb2YgZHJhd2luZy5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIE9ubHkgZHJhdyBvbiB0aGUgcGFwZXIgaWYgdGhlIHBlbiBpcyBzdGlsbCB0b3VjaGluZyB0aGUgcGFwZXIuXG4gICAgICBpZiAocHJldmlvdXNQZW5bUEVOLkRPV05dID09PSAxKSB7XG4gICAgICAgIHAubGluZSh4LCB5LCB4K2R4LCB5K2R5KTtcbiAgICAgIH1cbiAgICAgIHggKz0gZHg7XG4gICAgICB5ICs9IGR5O1xuICAgICAgcHJldmlvdXNQZW4gPSBwZW47XG4gICAgfVxuXG4gICAgLy8gRHJhdyBpbiBhIHJhbmRvbSBjb2xvdXIgYWZ0ZXIgdGhlIHByZWRlZmluZWQgc3Ryb2tlcy5cbiAgICBwLnN0cm9rZShwLmNvbG9yKHAucmFuZG9tKDY0LCAyMjQpLCBwLnJhbmRvbSg2NCwgMjI0KSwgcC5yYW5kb20oNjQsIDIyNCkpKTtcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0RE9NRWxlbWVudHMoKSB7XG4gICAgLy8gU2V0dXAgdGhlIERPTSBiaXRzLlxuICAgIHRleHRUZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGlucHV0VGVtcGVyYXR1cmUudmFsdWUgPSB0ZW1wZXJhdHVyZTtcblxuICAgIC8vIExpc3RlbmVyc1xuICAgIHNlbGVjdE1vZGVscy5pbm5lckhUTUwgPSBhdmFpbGFibGVNb2RlbHMubWFwKG0gPT4gYDxvcHRpb24+JHttfTwvb3B0aW9uPmApLmpvaW4oJycpO1xuICAgIHNlbGVjdE1vZGVscy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiBpbml0TW9kZWwoc2VsZWN0TW9kZWxzLnNlbGVjdGVkSW5kZXgpKTtcbiAgICBpbnB1dFRlbXBlcmF0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgIHRlbXBlcmF0dXJlID0gcGFyc2VGbG9hdChpbnB1dFRlbXBlcmF0dXJlLnZhbHVlKTtcbiAgICAgIHRleHRUZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IHRlbXBlcmF0dXJlO1xuICAgIH0pO1xuICAgIGJ0bkNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzdGFydClcbiAgICBidG5SYW5kb20uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBzZWxlY3RNb2RlbHMuc2VsZWN0ZWRJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZU1vZGVscy5sZW5ndGgpO1xuICAgICAgaW5pdE1vZGVsKHNlbGVjdE1vZGVscy5zZWxlY3RlZEluZGV4KTtcbiAgICB9KTtcbiAgfVxufTtcblxubmV3IHA1KHNrZXRjaCwgJ3NrZXRjaCcpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==