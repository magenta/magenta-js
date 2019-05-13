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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demos/predict.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demos/predict.js":
/*!**************************!*\
  !*** ./demos/predict.js ***!
  \**************************/
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
    const screenWidth = Math.floor(containerSize.width);
    const screenHeight = p.windowHeight / 2;
    p.createCanvas(screenWidth, screenHeight);
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

new p5(sketch, 'sketch');


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtb3MvcHJlZGljdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6Qjs7QUFFQSxhQUFhO0FBQ2IsV0FBVztBQUNYLG9CQUFvQjtBQUNwQiw4QkFBOEI7QUFDOUIsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVMsRUFBRSx1QkFBdUI7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBLHNDQUFzQztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBLGlFQUFpRSxFQUFFO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJwcmVkaWN0X2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZGVtb3MvcHJlZGljdC5qc1wiKTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbiAvKipcbiAqIEF1dGhvcjogRGF2aWQgSGEgPGhhZGF2aWRAZ29vZ2xlLmNvbT5cbiAqXG4gKiBAZmlsZW92ZXJ2aWV3IEJhc2ljIHA1LmpzIHNrZXRjaCB0byBzaG93IGhvdyB0byB1c2Ugc2tldGNoLXJublxuICogdG8gZmluaXNoIGEgZml4ZWQgaW5jb21wbGV0ZSBkcmF3aW5ncywgYW5kIGxvb3AgdGhyb3VnaCBtdWx0aXBsZVxuICogZW5kaW5ncyBhdXRvbWF0aWNhbGx5LlxuICovXG5cbmNvbnN0IHNrZXRjaCA9IGZ1bmN0aW9uKHApIHtcbiAgLy8gQXZhaWxhYmxlIFNrZXRjaFJOTiBtb2RlbHMuXG4gIGNvbnN0IEJBU0VfVVJMID0gJ2h0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9xdWlja2RyYXctbW9kZWxzL3NrZXRjaFJOTi9tb2RlbHMvJztcbiAgY29uc3QgYXZhaWxhYmxlTW9kZWxzID0gWydiaXJkJywnYW50JywnYW5nZWwnLCdiZWUnLCdiaWN5Y2xlJywnZmxhbWluZ28nLCdmbG93ZXInLCdtb3NxdWl0bycsJ293bCcsJ3NwaWRlcicsJ3lvZ2EnXTtcbiAgbGV0IG1vZGVsO1xuXG4gIC8vIE1vZGVsIHN0YXRlLlxuICBsZXQgbW9kZWxTdGF0ZTsgLy8gU3RvcmUgdGhlIGhpZGRlbiBzdGF0ZXMgb2Ygcm5uJ3MgbmV1cm9ucy5cbiAgbGV0IHRlbXBlcmF0dXJlID0gMC4yNTsgLy8gQ29udHJvbHMgdGhlIGFtb3VudCBvZiB1bmNlcnRhaW50eSBvZiB0aGUgbW9kZWwuXG4gIGxldCBtb2RlbExvYWRlZCA9IGZhbHNlO1xuXG4gIGxldCBkeCwgZHk7IC8vIE9mZnNldHMgb2YgdGhlIHBlbiBzdHJva2VzLCBpbiBwaXhlbHMuXG4gIGxldCB4LCB5OyAvLyBBYnNvbHV0ZSBjb29yZGluYXRlcyBvbiB0aGUgc2NyZWVuIG9mIHdoZXJlIHRoZSBwZW4gaXMuXG4gIGxldCBwZW4gPSBbMCwwLDBdOyAvLyBDdXJyZW50IHBlbiBzdGF0ZSwgW3Blbl9kb3duLCBwZW5fdXAsIHBlbl9lbmRdLlxuICBsZXQgcHJldmlvdXNQZW4gPSBbMSwgMCwgMF07IC8vIFByZXZpb3VzIHBlbiBzdGF0ZS5cbiAgY29uc3QgUEVOID0ge0RPV046IDAsIFVQOiAxLCBFTkQ6IDJ9O1xuXG4gIC8qXG4gICAqIE1haW4gcDUgY29kZVxuICAgKi9cbiAgcC5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lclNpemUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2tldGNoJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgY2FudmFzLlxuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gTWF0aC5mbG9vcihjb250YWluZXJTaXplLndpZHRoKTtcbiAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSBwLndpbmRvd0hlaWdodCAvIDI7XG4gICAgcC5jcmVhdGVDYW52YXMoc2NyZWVuV2lkdGgsIHNjcmVlbkhlaWdodCk7XG4gICAgcC5mcmFtZVJhdGUoNjApO1xuXG4gICAgc2V0dXBOZXdEcmF3aW5nKCk7XG4gICAgaW5pdE1vZGVsKDApO1xuICAgIGluaXRET01FbGVtZW50cygpO1xuICB9O1xuXG4gIHAuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghbW9kZWxMb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBmaW5pc2hlZCB0aGUgcHJldmlvdXMgZHJhd2luZywgc3RhcnQgYSBuZXcgb25lLlxuICAgIGlmIChwcmV2aW91c1BlbltQRU4uRU5EXSA9PT0gMSkge1xuICAgICAgcmVzdGFydCgpO1xuICAgIH1cblxuICAgIC8vIE5ldyBzdGF0ZS5cbiAgICBjb25zdCBwZGYgPSBtb2RlbC5nZXRQREYobW9kZWxTdGF0ZSwgdGVtcGVyYXR1cmUpO1xuICAgIFtkeCwgZHksIC4uLnBlbl0gPSBtb2RlbC5zYW1wbGUocGRmKTtcblxuICAgIC8vIE9ubHkgZHJhdyBvbiB0aGUgcGFwZXIgaWYgdGhlIHBlbiBpcyBzdGlsbCB0b3VjaGluZyB0aGUgcGFwZXIuXG4gICAgaWYgKHByZXZpb3VzUGVuW1BFTi5ET1dOXSA9PSAxKSB7XG4gICAgICBwLmxpbmUoeCwgeSwgeCtkeCwgeStkeSk7IC8vIERyYXcgbGluZSBjb25uZWN0aW5nIHByZXYgcG9pbnQgdG8gY3VycmVudCBwb2ludC5cbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGFic29sdXRlIGNvb3JkaW5hdGVzIGZyb20gdGhlIG9mZnNldHNcbiAgICB4ICs9IGR4O1xuICAgIHkgKz0gZHk7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHByZXZpb3VzIHBlbidzIHN0YXRlIHRvIHRoZSBjdXJyZW50IG9uZSB3ZSBqdXN0IHNhbXBsZWQuXG4gICAgcHJldmlvdXNQZW4gPSBwZW47XG4gICAgbW9kZWxTdGF0ZSA9IG1vZGVsLnVwZGF0ZShbZHgsIGR5LCAuLi5wZW5dLCBtb2RlbFN0YXRlKTtcbiAgfTtcbiAgIC8qXG4gICAqIEhlbHBlcnMuXG4gICAqL1xuICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIC8vIEluaXRpYWwgc3Ryb2tlcyB0aGF0IHdlIHdpbGwgYXR0ZW1wdCB0byBjb250aW51ZS5cbiAgICBjb25zdCBzdHJva2VzID0gW1stNCwwLDEsMCwwXSxbLTE1LDksMSwwLDBdLFstMTAsMTcsMSwwLDBdLFstMSwyOCwxLDAsMF0sWzE0LDEzLDEsMCwwXSxbMTIsNCwxLDAsMF0sWzIyLDEsMSwwLDBdLFsxNCwtMTEsMSwwLDBdLFs1LC0xMiwxLDAsMF0sWzIsLTE5LDEsMCwwXSxbLTEyLC0yMywxLDAsMF0sWy0xMywtNywxLDAsMF0sWy0xNCwtMSwwLDEsMF1dO1xuXG4gICAgLy8gRHJhdyBzdHJva2VzLlxuICAgIHNldHVwTmV3RHJhd2luZygpO1xuICAgIGNvbnN0IGxhc3RQb2ludCA9IGRyYXdTdHJva2VzKHN0cm9rZXMsIHgsIHkpO1xuXG4gICAgLy8gRW5jb2RlIHRoZSBzdHJva2VzIGluIHRoZSBtb2RlbC5cbiAgICBsZXQgbmV3U3RhdGUgPSBtb2RlbC56ZXJvU3RhdGUoKTtcbiAgICBuZXdTdGF0ZSA9IG1vZGVsLnVwZGF0ZShtb2RlbC56ZXJvSW5wdXQoKSwgbmV3U3RhdGUpO1xuICAgIG5ld1N0YXRlID0gbW9kZWwudXBkYXRlU3Ryb2tlcyhzdHJva2VzLCBuZXdTdGF0ZSk7XG5cbiAgICAvLyBSZXNldCB0aGUgYWN0dWFsIG1vZGVsIHdlJ3JlIHVzaW5nIHRvIHRoaXMgb25lIHRoYXQgaGFzIHRoZSBlbmNvZGVkIHN0cm9rZXMuXG4gICAgbW9kZWxTdGF0ZSA9IG1vZGVsLmNvcHlTdGF0ZShuZXdTdGF0ZSk7XG5cbiAgICAvLyBSZXNldCB0aGUgcGVuIHN0YXRlLlxuICAgIHggPSBsYXN0UG9pbnRbMF07XG4gICAgeSA9IGxhc3RQb2ludFsxXTtcbiAgICBwcmV2aW91c1BlbiA9IFswLCAxLCAwXTtcblxuICAgIC8vIFJlc2V0IHRoZSBsaW5lIGNvbG91ci5cbiAgICBwLnN0cm9rZShwLmNvbG9yKHAucmFuZG9tKDY0LCAyMjQpLCBwLnJhbmRvbSg2NCwgMjI0KSwgcC5yYW5kb20oNjQsIDIyNCkpKTtcbiAgfTtcblxuICBmdW5jdGlvbiBzZXR1cE5ld0RyYXdpbmcoKSB7XG4gICAgcC5iYWNrZ3JvdW5kKDI1NSwgMjU1LCAyNTUsIDI1NSk7XG4gICAgcC5zdHJva2VXZWlnaHQoMy4wKTtcbiAgICB4ID0gcC53aWR0aCAvIDIuMDtcbiAgICB5ID0gcC5oZWlnaHQgLyAzLjA7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0TW9kZWwoaW5kZXgpIHtcbiAgICBtb2RlbExvYWRlZCA9IGZhbHNlO1xuICAgIGlmIChtb2RlbCkge1xuICAgICAgbW9kZWwuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBtb2RlbCA9IG5ldyBtcy5Ta2V0Y2hSTk4oYCR7QkFTRV9VUkx9JHthdmFpbGFibGVNb2RlbHNbaW5kZXhdfS5nZW4uanNvbmApO1xuXG4gICAgUHJvbWlzZS5hbGwoW21vZGVsLmluaXRpYWxpemUoKV0pLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICBtb2RlbExvYWRlZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmxvZygnU2tldGNoUk5OIG1vZGVsIGxvYWRlZC4nKTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgc2NhbGUgZmFjdG9yIGZvciB0aGUgbW9kZWwuIEJpZ2dlciAtPiBsYXJnZSBvdXRwdXRzXG4gICAgICBtb2RlbC5zZXRQaXhlbEZhY3Rvcig1LjApO1xuICAgICAgcmVzdGFydCgpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgdmVyeSBzaW1pbGFyIHRvIHRoZSBwLmRyYXcoKSBsb29wLCBidXQgaW5zdGVhZCBvZlxuICAvLyBzYW1wbGluZyBmcm9tIHRoZSBtb2RlbCwgaXQgdXNlcyB0aGUgZ2l2ZW4gc2V0IG9mIHN0cm9rZXMuXG4gIGZ1bmN0aW9uIGRyYXdTdHJva2VzKHN0cm9rZXMsIHN0YXJ0WCwgc3RhcnRZKSB7XG4gICAgcC5zdHJva2UocC5jb2xvcigyNTUsMCwwKSk7XG5cbiAgICBsZXQgeCA9IHN0YXJ0WDtcbiAgICBsZXQgeSA9IHN0YXJ0WTtcbiAgICBsZXQgZHgsIGR5O1xuICAgIGxldCBwZW4gPSBbMCwwLDBdLCBwcmV2aW91c1BlbiA9IFswLDAsMF07XG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBzdHJva2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBbZHgsIGR5LCAuLi5wZW5dID0gc3Ryb2tlc1tpXTtcblxuICAgICAgaWYgKHByZXZpb3VzUGVuW1BFTi5FTkRdID09IDEpIHsgLy8gRW5kIG9mIGRyYXdpbmcuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IGRyYXcgb24gdGhlIHBhcGVyIGlmIHRoZSBwZW4gaXMgc3RpbGwgdG91Y2hpbmcgdGhlIHBhcGVyLlxuICAgICAgaWYgKHByZXZpb3VzUGVuW1BFTi5ET1dOXSA9PSAxKSB7XG4gICAgICAgIHAubGluZSh4LCB5LCB4K2R4LCB5K2R5KTtcbiAgICAgIH1cbiAgICAgIHggKz0gZHg7XG4gICAgICB5ICs9IGR5O1xuICAgICAgcHJldmlvdXNQZW4gPSBwZW47XG4gICAgfVxuICAgIHJldHVybiBbeCwgeV07IC8vIEZpbmFsIGNvb3JkaW5hdGVzLlxuICB9O1xuXG4gIGZ1bmN0aW9uIGluaXRET01FbGVtZW50cygpIHtcbiAgICAvLyBTZXR1cCB0aGUgRE9NIGJpdHMuXG4gICAgc2VsZWN0TW9kZWxzLmlubmVySFRNTCA9IGF2YWlsYWJsZU1vZGVscy5tYXAobSA9PiBgPG9wdGlvbj4ke219PC9vcHRpb24+YCkuam9pbignJyk7XG4gICAgc2VsZWN0TW9kZWxzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IGluaXRNb2RlbChzZWxlY3RNb2RlbHMuc2VsZWN0ZWRJbmRleCkpO1xuICAgIGlucHV0VGVtcGVyYXR1cmUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgdGVtcGVyYXR1cmUgPSBwYXJzZUZsb2F0KGlucHV0VGVtcGVyYXR1cmUudmFsdWUpO1xuICAgICAgdGV4dFRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gdGVtcGVyYXR1cmU7XG4gICAgfSk7XG4gICAgdGV4dFRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gaW5wdXRUZW1wZXJhdHVyZS52YWx1ZSA9IHRlbXBlcmF0dXJlO1xuICB9XG59O1xuXG5uZXcgcDUoc2tldGNoLCAnc2tldGNoJyk7XG4iXSwic291cmNlUm9vdCI6IiJ9