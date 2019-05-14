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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demos/simple.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demos/simple.js":
/*!*************************!*\
  !*** ./demos/simple.js ***!
  \*************************/
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

// import * as ms from './src/index';

// console.log(ms)

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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtb3Mvc2ltcGxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQiwyQkFBMkI7QUFDM0I7O0FBRUEsYUFBYTtBQUNiLFdBQVc7QUFDWCxvQkFBb0I7QUFDcEIsOEJBQThCO0FBQzlCLGVBQWU7O0FBRWY7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUM7QUFDekMsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJzaW1wbGVfYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9kZW1vcy9zaW1wbGUuanNcIik7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIGltcG9ydCAqIGFzIG1zIGZyb20gJy4vc3JjL2luZGV4JztcblxuLy8gY29uc29sZS5sb2cobXMpXG5cbmNvbnN0IHNrZXRjaCA9IGZ1bmN0aW9uKHApIHtcbiAgbGV0IG1vZGVsU3RhdGU7IC8vIFN0b3JlIHRoZSBoaWRkZW4gc3RhdGVzIG9mIHJubidzIG5ldXJvbnMuXG4gIGNvbnN0IHRlbXBlcmF0dXJlID0gMC40NTsgLy8gQ29udHJvbHMgdGhlIGFtb3VudCBvZiB1bmNlcnRhaW50eSBvZiB0aGUgbW9kZWwuXG4gIGxldCBtb2RlbExvYWRlZCA9IGZhbHNlO1xuXG4gIGxldCBkeCwgZHk7IC8vIE9mZnNldHMgb2YgdGhlIHBlbiBzdHJva2VzLCBpbiBwaXhlbHMuXG4gIGxldCB4LCB5OyAvLyBBYnNvbHV0ZSBjb29yZGluYXRlcyBvbiB0aGUgc2NyZWVuIG9mIHdoZXJlIHRoZSBwZW4gaXMuXG4gIGxldCBwZW4gPSBbMCwwLDBdOyAvLyBDdXJyZW50IHBlbiBzdGF0ZSwgW3Blbl9kb3duLCBwZW5fdXAsIHBlbl9lbmRdLlxuICBsZXQgcHJldmlvdXNQZW4gPSBbMSwgMCwgMF07IC8vIFByZXZpb3VzIHBlbiBzdGF0ZS5cbiAgY29uc3QgUEVOID0ge0RPV046IDAsIFVQOiAxLCBFTkQ6IDJ9O1xuXG4gIC8vIExvYWQgdGhlIG1vZGVsLlxuICBjb25zdCBtb2RlbCA9IG5ldyBtcy5Ta2V0Y2hSTk4oJ2h0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9xdWlja2RyYXctbW9kZWxzL3NrZXRjaFJOTi9sYXJnZV9tb2RlbHMvYmlyZC5nZW4uanNvbicpO1xuXG5cbiAgLypcbiAgICogTWFpbiBwNSBjb2RlXG4gICAqL1xuICBwLnNldHVwID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgY29udGFpbmVyU2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdza2V0Y2gnKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBJbml0aWFsaXplIHRoZSBjYW52YXMuXG4gICAgY29uc3Qgc2NyZWVuV2lkdGggPSBNYXRoLmZsb29yKGNvbnRhaW5lclNpemUud2lkdGgpO1xuICAgIGNvbnN0IHNjcmVlbkhlaWdodCA9IHAud2luZG93SGVpZ2h0IC8gMjtcbiAgICBwLmNyZWF0ZUNhbnZhcyhzY3JlZW5XaWR0aCwgc2NyZWVuSGVpZ2h0KTtcbiAgICBwLmZyYW1lUmF0ZSg2MCk7XG5cbiAgICBtb2RlbC5pbml0aWFsaXplKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIC8vIEluaXRpYWxpemUgdGhlIHNjYWxlIGZhY3RvciBmb3IgdGhlIG1vZGVsLiBCaWdnZXIgLT4gbGFyZ2Ugb3V0cHV0c1xuICAgICAgbW9kZWwuc2V0UGl4ZWxGYWN0b3IoMy4wKTtcbiAgICAgIG1vZGVsTG9hZGVkID0gdHJ1ZTtcbiAgICAgIHJlc3RhcnQoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdTa2V0Y2hSTk4gbW9kZWwgbG9hZGVkLicpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIERyYXdpbmcgbG9vcC5cbiAgcC5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFtb2RlbExvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHdlIGZpbmlzaGVkIHRoZSBwcmV2aW91cyBkcmF3aW5nLCBzdGFydCBhIG5ldyBvbmUuXG4gICAgaWYgKHByZXZpb3VzUGVuW1BFTi5FTkRdID09PSAxKSB7XG4gICAgICByZXN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy8gTmV3IHN0YXRlLlxuICAgIFtkeCwgZHksIC4uLnBlbl0gPSBzYW1wbGVOZXdTdGF0ZSgpO1xuXG4gICAgLy8gT25seSBkcmF3IG9uIHRoZSBwYXBlciBpZiB0aGUgcGVuIGlzIHN0aWxsIHRvdWNoaW5nIHRoZSBwYXBlci5cbiAgICBpZiAocHJldmlvdXNQZW5bUEVOLkRPV05dID09IDEpIHtcbiAgICAgIHAubGluZSh4LCB5LCB4K2R4LCB5K2R5KTsgLy8gRHJhdyBsaW5lIGNvbm5lY3RpbmcgcHJldiBwb2ludCB0byBjdXJyZW50IHBvaW50LlxuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0aGUgYWJzb2x1dGUgY29vcmRpbmF0ZXMgZnJvbSB0aGUgb2Zmc2V0c1xuICAgIHggKz0gZHg7XG4gICAgeSArPSBkeTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgcHJldmlvdXMgcGVuJ3Mgc3RhdGUgdG8gdGhlIGN1cnJlbnQgb25lIHdlIGp1c3Qgc2FtcGxlZC5cbiAgICBwcmV2aW91c1BlbiA9IHBlbjtcbiAgfTtcblxuICAvKlxuICAgKiBIZWxwZXJzLlxuICAgKi9cbiAgZnVuY3Rpb24gc2FtcGxlTmV3U3RhdGUoKSB7XG4gICAgLy8gVXNpbmcgdGhlIHByZXZpb3VzIHBlbiBzdGF0ZXMsIGFuZCBoaWRkZW4gc3RhdGUsIGdldCBuZXh0IGhpZGRlbiBzdGF0ZVxuICAgIC8vIHRoZSBiZWxvdyBsaW5lIHRha2VzIHRoZSBtb3N0IENQVSBwb3dlciwgZXNwZWNpYWxseSBmb3IgbGFyZ2UgbW9kZWxzLlxuICAgIG1vZGVsU3RhdGUgPSBtb2RlbC51cGRhdGUoW2R4LCBkeSwgLi4ucGVuXSwgbW9kZWxTdGF0ZSk7XG5cbiAgICAvLyBHZXQgdGhlIHBhcmFtZXRlcnMgb2YgdGhlIHByb2JhYmlsaXR5IGRpc3RyaWJ1dGlvbiAocGRmKSBmcm9tIGhpZGRlbiBzdGF0ZS5cbiAgICBjb25zdCBwZGYgPSBtb2RlbC5nZXRQREYobW9kZWxTdGF0ZSwgdGVtcGVyYXR1cmUpO1xuXG4gICAgLy8gU2FtcGxlIHRoZSBuZXh0IHBlbidzIHN0YXRlcyBmcm9tIG91ciBwcm9iYWJpbGl0eSBkaXN0cmlidXRpb24uXG4gICAgcmV0dXJuIG1vZGVsLnNhbXBsZShwZGYpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0dXBOZXdEcmF3aW5nKCkge1xuICAgIHAuYmFja2dyb3VuZCgyNTUsIDI1NSwgMjU1LCAyNTUpO1xuICAgIHggPSBwLndpZHRoIC8gMi4wO1xuICAgIHkgPSBwLmhlaWdodCAvIDMuMDtcbiAgICBjb25zdCBsaW5lQ29sb3IgPSBwLmNvbG9yKHAucmFuZG9tKDY0LCAyMjQpLCBwLnJhbmRvbSg2NCwgMjI0KSwgcC5yYW5kb20oNjQsIDIyNCkpO1xuXG4gICAgcC5zdHJva2VXZWlnaHQoMy4wKTtcbiAgICBwLnN0cm9rZShsaW5lQ29sb3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzdGFydCgpIHtcbiAgICBbZHgsIGR5LCAuLi5wZW5dID0gbW9kZWwuemVyb0lucHV0KCk7ICAvLyBSZXNldCB0aGUgcGVuIHN0YXRlLlxuICAgIG1vZGVsU3RhdGUgPSBtb2RlbC56ZXJvU3RhdGUoKTsgIC8vIFJlc2V0IHRoZSBtb2RlbCBzdGF0ZS5cbiAgICBzZXR1cE5ld0RyYXdpbmcoKTtcbiAgfVxufTtcblxubmV3IHA1KHNrZXRjaCwgJ3NrZXRjaCcpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==