/**
 * A module containing a visualizer for `NoteSequences`.
 *
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {INoteSequence} from '../protobuf';
import {Visualizer, VisualizerConfig} from '.';

/**
 * Displays a pianoroll with pitches on the vertical axis and time on the
 * horizontal. When connected to a player, the visualizer can also highlight the
 * notes being currently played.
 */
export class SVGVisualizer extends Visualizer {
  private svg: SVGSVGElement;

  /**
   *   `Visualizer` constructor.
   *
   *   @param sequence The `NoteSequence` to be visualized.
   *   @param canvas The element where the visualization should be displayed.
   *   @param config Visualization configuration options.
   */
  constructor(
      sequence: INoteSequence, svg: SVGSVGElement,
      config: VisualizerConfig = {}) {
    super(sequence, null, config);

    this.svg = svg;
    this.parentElement = svg.parentElement;

    // Make sure that if we've used this svg element before, it's now emptied.
    this.svg.innerHTML = '';
    const size = this.getCanvasSize();
    this.height = size.height;
    this.svg.style.width = `${size.width}px`;
    this.svg.style.height = `${size.height}px`;

    this.redraw();
  }

  protected redrawNote(
      x: number, y: number, w: number, h: number, fill: string) {
    if (!this.svg) {
      return;
    }
    const rect: SVGRectElement =
        document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('fill', fill);

    // Round values to the nearest integer to avoid partially filled pixels.
    rect.setAttribute('x', Math.round(x) + '');
    rect.setAttribute('y', Math.round(y) + '');
    rect.setAttribute('width', Math.round(w) + '');
    rect.setAttribute('height', h + '');
    this.svg.appendChild(rect);
  }
}
