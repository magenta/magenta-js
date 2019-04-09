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

import {INoteSequence, NoteSequence} from '../protobuf';

import {logging, sequences} from '.';
import {MAX_MIDI_PITCH, MIN_MIDI_PITCH} from './constants';

/**
 * An interface for providing configurable properties to a Visualizer.
 * @param noteHeight The vertical height in pixels of a note.
 * @param noteSpacing Number of horizontal pixels between each note.
 * @param pixelsPerTimeStep The horizontal scale at which notes are drawn. The
 * bigger this value, the "wider" a note looks.
 * @param noteRGB The color (as an RGB comma separated string) of a note.
 * @param activeNoteRGB The color (as an RGB comma separated string) of an
 * active note being played.
 * @param minPitch The smallest pitch to be included in the visualization. If
 * undefined, this will be computed from the NoteSequence being visualized.
 * @param maxPitch The biggest pitch to be included in the visualization. If
 * undefined, this will be computed from the NoteSequence being visualized.
 */
interface VisualizerConfig {
  noteHeight?: number;
  noteSpacing?: number;
  pixelsPerTimeStep?: number;
  noteRGB?: string;
  activeNoteRGB?: string;
  minPitch?: number;
  maxPitch?: number;
}

/**
 * Abstract base class for a `NoteSequence` visualizer.
 */
export abstract class BaseVisualizer {
  public noteSequence: INoteSequence;
  protected config: VisualizerConfig;
  protected height: number;
  protected width: number;
  protected sequenceIsQuantized: boolean;
  protected parentElement: HTMLElement;

  /**
   * Redraws the entire note sequence, optionally painting a note as
   * active
   * @param activeNote (Optional) If specified, this `Note` will be painted
   * in the active color.
   * @param scrollIntoView (Optional) If specified and the note being painted is
   * offscreen, the parent container will be scrolled so that the note is
   * in view.
   * @returns The x position of the painted active note. Useful for
   * automatically advancing the visualization if the note was painted outside
   * of the screen.
   */
  public abstract redraw(
      activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number;

  // Clears the current visualization.
  protected abstract clear(): void;

  /**
   *   `BaseVisualizer` constructor.
   *
   *   @param sequence The `NoteSequence` to be visualized.
   *   @param canvas The element where the visualization should be displayed.
   *   @param config Visualization configuration options.
   */
  constructor(sequence: INoteSequence, config: VisualizerConfig = {}) {
    this.noteSequence = sequence;
    this.sequenceIsQuantized = sequences.isQuantizedSequence(this.noteSequence);

    const defaultPixelsPerTimeStep = 30;
    this.config = {
      noteHeight: config.noteHeight || 6,
      noteSpacing: config.noteSpacing || 1,
      pixelsPerTimeStep: config.pixelsPerTimeStep || defaultPixelsPerTimeStep,
      noteRGB: config.noteRGB || '8, 41, 64',
      activeNoteRGB: config.activeNoteRGB || '240, 84, 119',
      minPitch: config.minPitch,
      maxPitch: config.maxPitch,
    };

    // Quantized sequences appear "longer" because there's usually more
    // quantized per note (vs seconds), so pick a better default by using
    // the steps per quarter.
    if (this.sequenceIsQuantized) {
      const spq = sequence.quantizationInfo.stepsPerQuarter;
      this.config.pixelsPerTimeStep = spq ? 
          this.config.pixelsPerTimeStep / spq : 7;
    }

    const size = this.getSize();
    this.width = size.width;
    this.height = size.height;
  }

  protected getSize(): {width: number; height: number} {
    // If the pitches haven't been specified already, figure them out
    // from the NoteSequence.
    if (this.config.minPitch === undefined ||
        this.config.maxPitch === undefined) {
      this.config.minPitch = MAX_MIDI_PITCH;
      this.config.maxPitch = MIN_MIDI_PITCH;

      // Find the smallest pitch so that we can scale the drawing correctly.
      for (const note of this.noteSequence.notes) {
        this.config.minPitch = Math.min(note.pitch, this.config.minPitch);
        this.config.maxPitch = Math.max(note.pitch, this.config.maxPitch);
      }

      // Add a little bit of padding at the top and the bottom.
      this.config.minPitch -= 2;
      this.config.maxPitch += 2;
    }

    // Height of the canvas based on the range of pitches in the sequence.
    const height =
        (this.config.maxPitch - this.config.minPitch) * this.config.noteHeight;

    // Calculate a nice width based on the length of the sequence we're
    // playing.
    const endTime = this.sequenceIsQuantized ?
        this.noteSequence.totalQuantizedSteps :
        this.noteSequence.totalTime;

    const width = (endTime * this.config.pixelsPerTimeStep);

    return {width, height};
  }

  protected getNotePosition(note: NoteSequence.INote, noteIndex: number):
      {x: number; y: number, w: number, h: number} {
    // Size of this note.
    const x = (this.getNoteStartTime(note) * this.config.pixelsPerTimeStep);
    const w = this.config.pixelsPerTimeStep *
            (this.getNoteEndTime(note) - this.getNoteStartTime(note)) -
        this.config.noteSpacing;

    // The canvas' y=0 is at the top, but a smaller pitch is actually
    // lower, so we're kind of painting backwards.
    const y = this.height -
        ((note.pitch - this.config.minPitch) * this.config.noteHeight);

    return {x, y, w, h: this.config.noteHeight};
  }

  protected scrollIntoViewIfNeeded(
      scrollIntoView: boolean, activeNotePosition: number) {
    if (scrollIntoView && this.parentElement) {
      // See if we need to scroll the container.
      const containerWidth = this.parentElement.getBoundingClientRect().width;
      if (activeNotePosition >
          (this.parentElement.scrollLeft + containerWidth)) {
        this.parentElement.scrollLeft = activeNotePosition - 20;
      }
    }
  }

  protected getNoteStartTime(note: NoteSequence.INote) {
    return this.sequenceIsQuantized ? note.quantizedStartStep : 
        Math.round(note.startTime * 100000000) / 100000000;
  }

  protected getNoteEndTime(note: NoteSequence.INote) {
    return this.sequenceIsQuantized ? note.quantizedEndStep : 
        Math.round(note.endTime * 100000000) / 100000000;
  }

  protected isPaintingActiveNote(
      note: NoteSequence.INote, playedNote: NoteSequence.INote): boolean {
    // A note is active if it's literally the same as the note we are
    // playing (aka activeNote), or if it overlaps because it's a held note.
    const isPlayedNote =
        this.getNoteStartTime(note) === this.getNoteStartTime(playedNote);
    const heldDownDuringPlayedNote =
        this.getNoteStartTime(note) <= this.getNoteStartTime(playedNote) &&
        this.getNoteEndTime(note) >= this.getNoteEndTime(playedNote);
    return isPlayedNote || heldDownDuringPlayedNote;
  }
}

/**
 * Displays a pianoroll on a canvas. Pitches are the vertical axis and time is
 * the horizontal. When connected to a player, the visualizer can also highlight
 * the notes being currently played.
 */
export class PianoRollCanvasVisualizer extends BaseVisualizer {
  protected ctx: CanvasRenderingContext2D;
  /**
   *   `PianoRollCanvasVisualizer` constructor.
   *
   *   @param sequence The `NoteSequence` to be visualized.
   *   @param canvas The element where the visualization should be displayed.
   *   @param config Visualization configuration options.
   */
  constructor(
      sequence: INoteSequence, canvas: HTMLCanvasElement,
      config: VisualizerConfig = {}) {
    super(sequence, config);

    // Initialize the canvas.
    this.ctx = canvas.getContext('2d');
    this.parentElement = canvas.parentElement;

    // Use the correct device pixel ratio so that the canvas isn't blurry
    // on retina screens. See:
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
    const dpr = window.devicePixelRatio || 1;
    if (this.ctx) {
      this.ctx.canvas.width = dpr * this.width;
      this.ctx.canvas.height = dpr * this.height;

      // If we don't do this, then the canvas will look 2x bigger than we
      // want to.
      canvas.style.width = `${this.width}px`;
      canvas.style.height = `${this.height}px`;

      this.ctx.scale(dpr, dpr);
    }

    this.redraw();
  }

  /**
   * Redraws the entire note sequence, optionally painting a note as
   * active
   * @param activeNote (Optional) If specified, this `Note` will be painted
   * in the active color.
   * @param scrollIntoView (Optional) If specified and the note being painted is
   * offscreen, the parent container will be scrolled so that the note is
   * in view.
   * @returns The x position of the painted active note. Useful for
   * automatically advancing the visualization if the note was painted outside
   * of the screen.
   */
  redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number {
    this.clear();

    let activeNotePosition;
    for (let i = 0; i < this.noteSequence.notes.length; i++) {
      const note = this.noteSequence.notes[i];

      const size = this.getNotePosition(note, i);

      // Color of this note.
      const opacityBaseline = 0.2;  // Shift all the opacities up a little.
      const opacity = note.velocity ? note.velocity / 100 + opacityBaseline : 1;

      const isActive =
          activeNote && this.isPaintingActiveNote(note, activeNote);
      const fill =
          `rgba(${isActive ? this.config.activeNoteRGB : this.config.noteRGB},
  ${opacity})`;

      this.redrawNote(size.x, size.y, size.w, size.h, fill);

      if (isActive && note === activeNote) {
        activeNotePosition = size.x;
      }
    }
    this.scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition);
    return activeNotePosition;
  }

  protected clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private redrawNote(x: number, y: number, w: number, h: number, fill: string) {
    this.ctx.fillStyle = fill;

    // Round values to the nearest integer to avoid partially filled pixels.
    this.ctx.fillRect(
        Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }
}

/**
 * @deprecated
 * Alias for PianoRollCanvasVisualizer to maintain backwards compatibility.
 */
export class Visualizer extends PianoRollCanvasVisualizer {
  constructor(
      sequence: INoteSequence, canvas: HTMLCanvasElement,
      config: VisualizerConfig = {}) {
    super(sequence, canvas, config);

    logging.log(
        'mm.Visualizer is deprecated, and will be removed in a future \
         version. Please use mm.PianoRollCanvasVisualizer instead',
        'mm.Visualizer', logging.Level.WARN);
  }
}
/**
 * Displays a pianoroll as an SVG. Pitches are the vertical axis and time is
 * the horizontal. When connected to a player, the visualizer can also highlight
 * the notes being currently played.
 *
 * Unlike PianoRollCanvasVisualizer which looks similar, PianoRollSVGVisualizer
 * does not redraw the entire sequence when activating a note.
 */
export class PianoRollSVGVisualizer extends BaseVisualizer {
  private svg: SVGSVGElement;
  private drawn: boolean;

  /**
   *   `PianoRollSVGVisualizer` constructor.
   *
   *   @param sequence The `NoteSequence` to be visualized.
   *   @param svg The element where the visualization should be displayed.
   *   @param config Visualization configuration options.
   */
  constructor(
      sequence: INoteSequence, svg: SVGSVGElement,
      config: VisualizerConfig = {}) {
    super(sequence, config);

    this.svg = svg;
    this.parentElement = svg.parentElement;
    this.drawn = false;
    // Make sure that if we've used this svg element before, it's now emptied.
    this.svg.style.width = `${this.width}px`;
    this.svg.style.height = `${this.height}px`;

    this.clear();
    this.draw();
  }

  /**
   * Redraws the entire note sequence if it hasn't been drawn before, optionally
   * painting a note as active
   * @param activeNote (Optional) If specified, this `Note` will be painted
   * in the active color.
   * @param scrollIntoView (Optional) If specified and the note being painted
   *     is
   * offscreen, the parent container will be scrolled so that the note is
   * in view.
   * @returns The x position of the painted active note. Useful for
   * automatically advancing the visualization if the note was painted outside
   * of the screen.
   */
  redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number {
    if (!this.drawn) {
      this.draw();
    }

    if (!activeNote) {
      return null;
    }

    // Remove the current active note, if one exists.
    const els = this.svg.querySelectorAll('rect.active');
    for (let i = 0; i < els.length; ++i) {
      const el = els[i];
      const fill = this.getNoteFillColor(
          this.noteSequence.notes[parseInt(el.getAttribute('data-index'), 10)],
          false);
      el.setAttribute('fill', fill);
      el.removeAttribute('class');
    }

    let activeNotePosition;
    for (let i = 0; i < this.noteSequence.notes.length; i++) {
      const note = this.noteSequence.notes[i];
      const isActive =
          activeNote && this.isPaintingActiveNote(note, activeNote);

      // We're only looking to re-paint the active notes.
      if (!isActive) {
        continue;
      }
      const el = this.svg.querySelector(`rect[data-index="${i}"]`);
      const fill = this.getNoteFillColor(note, true);
      el.setAttribute('fill', fill);
      el.setAttribute('class', 'active');
      if (note === activeNote) {
        activeNotePosition = parseFloat(el.getAttribute('x'));
      }
    }

    this.scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition);
    return activeNotePosition;
  }

  private draw() {
    for (let i = 0; i < this.noteSequence.notes.length; i++) {
      const note = this.noteSequence.notes[i];
      const size = this.getNotePosition(note, i);
      const fill = this.getNoteFillColor(note, false);

      this.drawNote(size.x, size.y, size.w, size.h, fill, i);
    }
    this.drawn = true;
  }

  private getNoteFillColor(note: NoteSequence.INote, isActive: boolean) {
    const opacityBaseline = 0.2;  // Shift all the opacities up a little.
    const opacity = note.velocity ? note.velocity / 100 + opacityBaseline : 1;
    const fill =
        `rgba(${isActive ? this.config.activeNoteRGB : this.config.noteRGB},
  ${opacity})`;
    return fill;
  }

  private drawNote(
      x: number, y: number, w: number, h: number, fill: string, index: number) {
    if (!this.svg) {
      return;
    }
    const rect: SVGRectElement =
        document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('fill', fill);

    // Round values to the nearest integer to avoid partially filled pixels.
    rect.setAttribute('x', `${Math.round(x)}`);
    rect.setAttribute('y', `${Math.round(y)}`);
    rect.setAttribute('width', `${Math.round(w)}`);
    rect.setAttribute('height', `${Math.round(h)}`);
    rect.setAttribute('data-index', `${index}`);
    this.svg.appendChild(rect);
  }

  protected clear() {
    this.svg.innerHTML = '';
    this.drawn = false;
  }
}

const SVGNS = 'http://www.w3.org/2000/svg';

function drawSVGPath(
  e: SVGElement, path: string, x: number, y: number, 
  scaleX: number, scaleY: number, opacity = 1
): SVGElement {
  const child = document.createElementNS(SVGNS, 'path');
  child.setAttributeNS(null, 'd', path);
  child.setAttributeNS(
    null, 'transform', `translate(${x}, ${y}) scale(${scaleX}, ${scaleY})`
  );
  child.setAttributeNS(null, 'opacity', `${opacity}`);
  e.appendChild(child);
  return child;
}

function drawSVGText(
  e: SVGElement, text: string, x: number, y: number, 
  fontSize: string, isBold=false, scaleX = 1, scaleY = 1
): SVGElement {
  const child = document.createElementNS(SVGNS, 'text');
  child.setAttributeNS(null, 'font-family', 'Times');
  child.setAttributeNS(null, 'font-size', fontSize);
  if (isBold) {child.setAttributeNS(null, 'font-weight', 'bold');}
  child.setAttributeNS(
    null, 'transform', `translate(${x}, ${y}) scale(${scaleX}, ${scaleY})`
  );
  const textNode = document.createTextNode(text);
  child.appendChild(textNode);
  e.appendChild(child);
  return child;
}

function createSVGGroupChild(e: SVGElement, id: string): SVGElement {
  const child = document.createElementNS(SVGNS, 'g');
  child.setAttribute('data-id', id);
  e.appendChild(child);
  return child;
}

function setFade(
  e: SVGElement, bounce = false, from = 1, to = 0
): SVGElement {
  let animation = e.querySelector(`animate`);
  if (!animation){
    animation = document.createElementNS(SVGNS, 'animate');
    animation.setAttributeNS(null, 'attributeName', 'opacity');
    animation.setAttributeNS(null, 'dur', '4s');
    animation.setAttributeNS(null, 'fill', 'freeze');
    animation.setAttributeNS(null, 'keyTimes', '0; 0.25; 0.5; 0.75; 1');
    const easyIn = (from + 3 * to) / 4;
    animation.setAttributeNS(
      null, 'values', `${from}; ${easyIn}; ${to}; ${easyIn}; ${from}`
    );
  }
  if (bounce) {
    animation.setAttributeNS(null, 'repeatCount', 'indefinite');
  }
  else {
    animation.setAttributeNS(null, 'repeatCount', '1');
  }
  e.appendChild(animation);
  return e;
}

// All SVG paths have been drawn in a scale of PATH_SCALE * PATH_SCALE
// in a relative position to the staff middle line, anchoring to the
// leftmost side of a note head.
const PATH_SCALE = 100; 
const staffLinePath = 'm 0,0 h 100';
const extraLinePath = 'm -25,0 h 175';
const barPath = 'm 0,-200 v 400';
const gClefPath = `M 139,48 C 102,57 76,120 131,151 41,128 64,24 129,2 L 
117,-57 C -32,47 26,217 166,182 Z m 12,-1 27,131 C 242,153 216,46 151,47 
Z m -35,-177 c 34,-23 82,-117 50,-140 -23,-17 -71,33 -50,140 z m -10,10 c 
-23,-77 -20,-200 48,-213 19,-4 89,171 -26,266 l 13,66 c 120,-6 137,155 
39,191 l 12,58 c 30,131 -137,145 -138,47 0,-29 37,-59 63,-37 21,18 25,71 
-25,70 32,42 103,0 91,-65 L 167,193 C 56,232 -112,63 106,-120 Z`;
const fClefPath = `m 101,-199 c -49,0 -100,28 -100,83 0,39 58,57 82,26 15,-20 
-4,-47 -32,-47 -23,1 -25,0 -25,-8 0,-22 40,-46 71,-41 91,16 67,208 -105,302 
75,-27 198,-94 211,-201 6,-66 -42,-114 -102,-114 z m 143,33 c -13,0 -23,11 
-23,24 0,14 10,24 23,24 13,0 23,-11 23,-24 0,-13 -10,-24 -23,-24 z m 2,83 c 
-13,0 -23,11 -23,24 0,14 10,24 23,24 13,0 23,-11 23,-24 0,-13 -10,-24 -23,-24 
z`;
const stemPath = 'm 0,0 v 100 h 15 v -100 z';
const tiePath = `M 0,25 C 10,46 30,67 50,67 69,67 90,47 100,25 94,65 73,89 
50,89 26,89 5,63 0,25 Z`;
const wholeHeadPath = `m 0,0 c 0,-37 49,-51 79,-51 31,0 83,13 83,51 0,39 
-55,51 -84,51 C 49,51 0,37 0,0 Z m 111,31 c 13,-19 0,-58 -22,-68 -33,-15 
-53,10 -39,49 9,27 48,39 61,19 z`;
const halfHeadPath = `m 0,10 c 0,-25 35,-60 80,-60 15,0 45,4 45,40 C 125,16 
89,50 45,50 17,50 0,36 0,10 Z m 71,7 c 17,-11 45,-34 38,-45 -7,-10 -39,1 
-57,12 -19,11 -42,31 -36,42 6,10 37,2 55,-9 z`;
const quarterHeadPath = `M 0,10 C 0,-15 35,-50 80,-50 110,-50 125,-35 125,-10 
125,15 90,50 45,50 15,50 0,35 0,10 Z`;
const sharpPath = `m -49,-121 v 52 l -29,9 v -48 h -8 v 51 l -20,6 v 29 l 
20,-6 v 70 l -20,6 v 30 l 20,-6 v 51 h 8 V 69 l 30,-8 v 50 h 8 V 58 l 20,-6 
V 23 l -20,6 v -71 l 20,-6 v -29 l -20,6 v -50 z m 1,82 v 71 l -29,9 v -71 z`;
const flatPath = `M -106,-166 V 67 c 52,-42 85,-56 85,-94 0,-47 -46,-51 
-73,-22 v -117 z m 31,120 c 20,0 42,46 -20,91 V -7 c 0,-28 10,-39 20,-39 z`;
const normalPath = `m -81,-58 v -48 H -92 V 73 l 60,-13 v 50 h 11 V -72 Z m 
50,24 v 58 l -50,11 v -58 z`;
const wholeRestPath = 'm 0,-50 h 125 v -50 H 0 Z';
const halfRestPath = 'M 0,0 H 125 V -50 H 0 Z';
const quarterRestPath = `m 0,-25 c 39,-39 37,-75 8,-120 l 6,-5 61,103 C 
40,-13 31,4 73,71 l -5,5 C 14,52 16,125 67,144 l -4,6 C -37,102 -1,22 59,60 Z`;
const eigthRestPath = `m 52,-47 c 26,-2 42,-21 48,-42 l 12,4 L 64,83 52,79 
88,-49 c 0,0 -17,22 -57,22 -16,0 -31,-13 -31,-27 0,-18 10,-31 27,-31 17,0 
33,15 25,38 z`;
const sixteenthRestPath = `m 129,-191 c -6,21 -22,40 -48,42 8,-23 -8,-38 
-25,-38 -17,0 -27,13 -27,31 0,14 15,27 31,27 40,0 57,-22 57,-22 l -20,69 
c -7,18 -22,33 -45,35 8,-23 -8,-38 -25,-38 -17,0 -27,13 -27,31 0,14 15,27 
31,27 40,0 57,-22 57,-22 l -36,128 12,4 77,-270 z`;
const thirtySecondRestPath = `m 129,-191 c -6,21 -22,40 -48,42 8,-23 -8,-38 
-25,-38 -17,0 -27,13 -27,31 0,14 15,27 31,27 40,0 57,-22 57,-22 l -20,69 
c -7,18 -22,33 -45,35 8,-23 -8,-38 -25,-38 -17,0 -27,13 -27,31 0,14 15,27 
31,27 40,0 57,-22 57,-22 L 68,20 C 61,37 46,51 24,52 32,29 16,14 -1,14 c 
-17,0 -27,13 -27,31 0,14 15,27 31,27 38,0 55,-20 57,-22 l -36,128 12,4 
105,-369 z`;
const sixtyFourthRestPath = `m 158,-292 c -6,21 -22,40 -48,42 8,-23 -8,-38 
-25,-38 -17,0 -27,13 -27,31 0,14 15,27 31,27 40,0 57,-22 57,-22 l -17,61 
v 0 c -6,21 -22,40 -48,42 8,-23 -8,-38 -25,-38 -17,0 -27,13 -27,31 0,14 
15,27 31,27 40,0 57,-22 57,-22 l -20,69 c -7,18 -22,33 -45,35 8,-23 -8,-38 
-25,-38 -17,0 -27,13 -27,31 0,14 15,27 31,27 40,0 57,-22 57,-22 L 68,20 C 
61,37 46,51 24,52 32,29 16,14 -1,14 c -17,0 -27,13 -27,31 0,14 15,27 31,27 
38,0 55,-20 57,-22 l -36,128 12,4 134,-469 z`;
const dotPath = 'M 5 -20 a 20 20 0 1 0 0.00001 0 z';
const singleFlagPath = `M0,0 h 12 c 7,100 175,156 62,314 79,-177 -49,-193 
-61,-200 l -13,-5 z`;
const multiFlagPath = `m 0,0 h 10 c 6,72 173,64 84,227 44,-120 -44,-123 
-94,-167 z`;

interface NotePathDetails {
  path: string; width: number; stemVSteps: number; stemAnchor: number; 
  flags: number;
}

const NOTE_PATHS: {[index: number]: NotePathDetails} = {
  4: {
    path: wholeHeadPath, width: 150, stemVSteps: 0, stemAnchor: 0, 
    flags: 0
  },
  2: {
    path: halfHeadPath, width: 125, stemVSteps: 7, stemAnchor: -10, 
    flags: 0
  },
  1: {
    path: quarterHeadPath, width: 125, stemVSteps: 7, stemAnchor: -10, 
    flags: 0
  },
  0.5: {
    path: quarterHeadPath, width: 125, stemVSteps: 7, stemAnchor: -10, 
    flags: 1
  },
  0.25: {
    path: quarterHeadPath, width: 125, stemVSteps: 9, stemAnchor: -10, 
    flags: 2
  },
  0.125: {
    path: quarterHeadPath, width: 125, stemVSteps: 11, stemAnchor: -10, 
    flags: 3
  },
  0.0625: {
    path: quarterHeadPath, width: 125, stemVSteps: 13, stemAnchor: -10, 
    flags: 4
  }
};

const REST_PATHS: {[index: number]: string} = {
  4: wholeRestPath,
  2: halfRestPath,
  1: quarterRestPath,
  0.5: eigthRestPath,
  0.25: sixteenthRestPath,
  0.125: thirtySecondRestPath,
  0.0625: sixtyFourthRestPath
};

const MIN_RESOLUTION = 0.0625;

const STEM_WIDTH = 15;
const LINE_STROKE = 1; // 1 pixel
const COMPACT_SPACING = 150; // 150% of accidentals width

const CLEF_PATHS: {
  [index: number]: {path: string, upper: number, lower: number}
} = {
  50: {path: fClefPath, upper: -4, lower: 3},
  71: {path: gClefPath, upper: -7, lower: 8}
};

const ACCIDENTAL_PATHS = [null, sharpPath, flatPath, normalPath];

const SCALES = [ // Accidentals: 0=none, 1=sharp, 2=flat, 3=normal
  { // Chromatic  C C#/Db D D#/Eb E   F F#/Gb G G#/Ab A A#/Bb B   / KEY
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // C
    accidental: [ 0,  1,  0,  1,  0,  0,  1,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Db
    accidental: [ 0,  0,  3,  0,  3,  0,  0,  3,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // D
    accidental: [ 3,  0,  0,  1,  0,  3,  0,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Eb
    accidental: [ 0,  2,  0,  0,  3,  0,  2,  0,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // E
    accidental: [ 3,  0,  3,  0,  0,  3,  0,  3,  0,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // F
    accidental: [ 0,  2,  0,  2,  0,  0,  2,  0,  2,  0,  0,  3] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -7], // Gb
    accidental: [ 3,  0,  3,  0,  3,  0,  0,  3,  0,  3,  0,  0] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // G
    accidental: [ 0,  1,  0,  1,  0,  3,  0,  0,  1,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Ab
    accidental: [ 0,  0,  3,  0,  3,  0,  2,  0,  0,  3,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // A
    accidental: [ 3,  0,  0,  1,  0,  3,  0,  3,  0,  0,  1,  0] }, {
    steps:      [ 0, -1, -1, -2, -2, -3, -4, -4, -5, -5, -6, -6], // Bb
    accidental: [ 0,  2,  0,  0,  3,  0,  2,  0,  2,  0,  0,  3] }, {
    steps:      [ 0,  0, -1, -1, -2, -3, -3, -4, -4, -5, -5, -6], // B
    accidental: [ 3,  0,  3,  0,  0,  3,  0,  3,  0,  3,  0,  0] }
];

const KEY_ACCIDENTALS = [
  {accidental: 1, pitches: []},                       // C
  {accidental: 2, pitches: [70, 75, 68, 73, 66]},     // Db
  {accidental: 1, pitches: [78, 73]},                 // D
  {accidental: 2, pitches: [70, 75, 68]},             // Eb
  {accidental: 1, pitches: [78, 73, 80, 75]},         // E
  {accidental: 2, pitches: [70]},                     // F
  {accidental: 2, pitches: [70, 75, 68, 73, 66, 71]}, // Gb
  {accidental: 1, pitches: [78]},                     // G
  {accidental: 2, pitches: [70, 75, 68, 73]},         // Ab
  {accidental: 1, pitches: [78, 73, 80]},             // A
  {accidental: 2, pitches: [70, 75]},                 // Bb
  {accidental: 1, pitches: [78, 73, 80, 75, 70]}      // B
];

interface QNote {
  start: number; // In quarter note quantities (float)
  length: number; // In quarter note quantities (float)
  vSteps: number; // In score steps (int, 2 per staff line), vertically invert.
  accidental: number; // Kind: -1 = natural, 0 = none, 1 = accidental
  opacity: number; // from 0.0 (fully transparent) to 1.0 (fully opaque)
  pitch: number; // MIDI/Protobuf pitch needed to name SVG Group
  xHeadRight: number; // x position at the right of the note head to draw ties
  tiedFrom?: QNote; // Reference to previous tied note
  g?: SVGElement; // SVG Group to hold tied notes into
}

interface BlockDetails {
    maxVStep: number;
    minVStep: number;
    restToNextLength: number;
    notes: QNote[];
}

/**
 * Enumeration of different ways of horizontal score scrolling, like paginaged
 * (PAGE is default value), note by note (NOTE) or in packed chunks by doing 
 * scroll just on bar starting (BAR).
 */
export enum ScrollType {
  PAGE = 0,
  NOTE = 1,
  BAR = 2
}

/**
 * An interface for providing extra configurable properties to a Visualizer
 * extending the basic configurable properties of `VisualizerConfig`.
 * @param defaultKey The musical key the score must use to adapt the score to 
 * the right accidentals. It can be overwritten with 
 * `NoteSequence.keySignatures` value at time or step 0. If not assigned it 
 * will be asumed C key.
 * @param instruments The subset of the `NoteSequence` instrument track numbers 
 * which should be merged and displayed. If not assigned or equal to [] it will 
 * be used all instruments altogether.
 * @param scrollType Sets scrolling to follow scoreplaying in different ways 
 * according to `ScrollType` enum values.
 */
export interface AdvancedVisualizerConfig extends VisualizerConfig {
  defaultKey?: number;
  instruments?: number[];
  scrollType?: ScrollType;
}

/**
 * Displays a `NoteSecuence` as a staff on a given SVG. Staff is scaled to fit 
 * vertically `config.noteHeight` and note horizontal position can behave in 
 * two different ways: If `config.pixelsPerTimeStep` is greater than zero, 
 * horizontal position will be proportional to its starting time, allowing to 
 * pile several instances for different voices (parts). Otherwise, resulting 
 * staff will display notes in a compact form, using minimum horizontal space 
 * between musical symbols as regular paper staff does. 
 * 
 * Clef, key and time signature will be displayed at the leftmost side and the 
 * rest of the staff will scroll under this initial signature area accordingly.
 * In case of proportional note positioning, given it starts at pixel zero, the
 * signature area will blink meanwhile it collides with initial active notes.
 * Key and time signature changes will be shown accordingly through score.
 * 
 * New configuration features have been introduced through 
 * `AdvancedVisualizerConfig` over basic `VisualizerConfig`.
 * 
 * When connected to a player, the visualizer can also highlight 
 * the notes being currently played.
 */
export class StaffSVGVisualizer extends BaseVisualizer {
  private div: HTMLDivElement; // Overall staff container
  private staffSVG: SVGSVGElement; // Main staff drawing area 
  private staffG: SVGElement; // Staff container for vertical repositioning
  private linesG: SVGElement; // Acting as background layer 
  private musicG: SVGElement; // Acting as middle plane layer
  private signaturesG: SVGElement; // Acting as foreground layer
  private overlaySVG: SVGSVGElement; // Overlay signature drawing area
  private overlayG: SVGElement; // Overlay container for vertical repositioning
  private signaturesQuarters: number; // When to stop blinking (in quarters)
  private signaturesBlinking: boolean; // Signatures displaying mode switch 
  private scale: number; // General scale appliable to all SVG elements
  private vStepSize: number; // Vertical factor in pixels (2 vStep/staff line)
  private hStepSize: number; // Horizontal factor in pixels (1 hStep/time unit)
  private staffOffset: number; // Vertical SVG distance to middle staff line
  private clef: number; // MIDI pitch note at the 3rd line (G clef -> B = 71)
  private key: number; // Measured in  semitones (0 = C, 1 = C#, ... 11 = B)
  private barBeginnings: Set<number>; // Time when bars starts in quarters
  private barAccidentals: {[pitch: number]: number}; // Temporal accidentals
  private timeSignatureNumerator: number; // like 3 in 3/4
  private timeSignatureDenominator: number; // like 4 in 3/4
  private signaturesList: Array<{x: number; q: number}>; // x positions
  private signatureCurrent: number; // Current signature beginning x position
  private signatureNext: number; // Current signature end x position
  private blockDetailsMap: Map<number, BlockDetails>; // Music sorted blocks
  private playingNotes: NoteSequence.INote[]; // Highlited ones
  private instruments: number[]; // NoteSequence track filter
  private scrollType: ScrollType; // Kind of scrolling if any
  private ticking: boolean; // Mutex to reduce scroll handling everhead
  private lastKnownScrollLeft: number; // Optimized scroll value
  private lastQ: number; // Last drawn block start time in quarters

  /**
   * `StaffSVGVisualizer` constructor.
   *
   * @param sequence The `NoteSequence` to be visualized.
   * @param div The element where the visualization should be displayed.
   * @param config Visualization configuration options.
   */
  constructor(
    sequence: INoteSequence, 
    div: HTMLDivElement, 
    config: AdvancedVisualizerConfig = {}
  ) {
    super(sequence, config);
    this.div = div;
    this.timeSignatureNumerator = 4;
    this.timeSignatureDenominator = 4;
    this.key = config.defaultKey || 0;
    this.instruments = config.instruments || [];
    this.scrollType = config.scrollType || ScrollType.PAGE;
    this.scale = this.config.noteHeight / PATH_SCALE;
    if (config.pixelsPerTimeStep <= 0) { // Compact visualization
      this.config.pixelsPerTimeStep = 0;
      this.config.noteSpacing = COMPACT_SPACING * this.scale;
    }
    this.clear(); // This will complete rest of member values initialization.
    this.redraw();
  }

  /**
   * Clears and resets the visualizer object for further redraws from scratch.
   */
  protected clear() {
    // Div overall container (emptying previous existing SVG elements)
    while (this.div.lastChild) { this.div.removeChild(this.div.lastChild); }
    this.div.style.overflow = 'visible';
    this.div.style.position = 'relative';
    // Signatures overlay
    this.overlaySVG = document.createElementNS(SVGNS, 'svg');
    this.overlaySVG.style.position = 'absolute';
    this.div.appendChild(this.overlaySVG);
    this.overlayG = createSVGGroupChild(this.overlaySVG, 'overlay');
    this.signaturesBlinking = false;
    this.signaturesQuarters = 0;
    // Inner scrolleable Container
    this.parentElement = document.createElement('div');
    this.parentElement.style.overflow = 'auto';
    this.div.appendChild(this.parentElement);
    this.ticking = false;
    this.lastKnownScrollLeft = 0;
    this.parentElement.addEventListener('scroll', this.handleScrollEvent);
    // Staff drawing area
    this.staffSVG = document.createElementNS(SVGNS, 'svg');
    this.parentElement.appendChild(this.staffSVG);
    this.staffG = createSVGGroupChild(this.staffSVG, 'staff');
    // Background lines
    this.linesG = createSVGGroupChild(this.staffSVG, 'lines');
    this.setStroke(this.linesG);
    this.staffG.appendChild(this.linesG);
    // Middle plane symbols
    this.musicG = createSVGGroupChild(this.staffSVG, 'music');
    this.setFill(this.musicG);
    this.setStroke(this.musicG, 0);
    this.staffG.appendChild(this.musicG);
    // Foreground signatures
    this.signaturesG = createSVGGroupChild(this.staffSVG, 'signatures');
    this.staffG.appendChild(this.signaturesG);
    // Clef deduction: Average pitch under C4 -> F clef, otherwise G clef
    let pitchSum = 0;
    let countSum = 0;
    this.noteSequence.notes.forEach(
      note => {
        if (this.isNoteInInstruments(note, this.instruments)) {
          pitchSum += note.pitch;
          ++countSum;
        }
      }
    );
    const averagePitch = pitchSum / countSum;
    this.clef = averagePitch < 60 ? 50 : 71; // Numbers are MIDI pitch values
    // Signatures values
    this.signaturesList = [{x: 0, q: 0}];
    this.signatureCurrent = 0;
    this.signatureNext = 0; // To reset blinking if scrolled
    this.changeKeySignatureIfNeeded(0);
    this.changeTimeSignatureIfNeeded(0);
    // General visual references
    this.vStepSize = this.config.noteHeight / 2;
    this.hStepSize = this.config.pixelsPerTimeStep;
    this.staffOffset = 0;
    this.height = 0;    
    this.width = 0;    
    // Processed notes storage and reference
    this.blockDetailsMap = new Map<number, BlockDetails>();
    this.playingNotes = [];
    this.barBeginnings = new Set<number>();
    this.barAccidentals = {};
    this.lastQ = -1;
}

  /**
   * Redraws the entire `noteSequence` in a staff if no `activeNote` is given,
   * highlighting on and off the appropriate notes otherwise. Should the 
   * `noteSequence` had changed adding more notes at the end, calling this
   * method again would complete the redrawing from the very last note it was
   * drawn, maintaining the active note and the scroll position as they were. 
   * This is handy for incremental compositions. Given the complexity of 
   * adaption to a modified score, modifyied notes previously drawn will be
   * ignored (you can always `clear()` and `redraw()` for a full redraw). 
   * Please have in mind `mm.Player` does not have this incremental capability
   * so, once the player had started, it will go on ignoring the changes. 
   * 
   * @param activeNote (Optional) If specified, this `Note` will be painted
   * in the active color and there won't be an actual redrawing, but a 
   * re-colouring of the involved note heads, accidentals, dots and ties 
   * (activated and de-activated ones). Otherwise, all musical symbols which 
   * were not processed yet will be drawn to complete the score.
   * @param scrollIntoView (Optional) If specified and the active note to be 
   * highlited is not visualized in the container DIV, the later will be 
   * scrolled so that the note is viewed in the right place. This can be 
   * altered by `AdvancedVisualizerConfig.scrollType`.
   * @returns The x position of the highlighted active note relative to the 
   * beginning of the SVG, or -1 if there wasn't any given active note. Useful
   * for automatically advancing the visualization if needed.
   */
  public redraw(
    activeNote?: NoteSequence.INote, 
    scrollIntoView?: boolean 
  ): number {
    let activeNotePosition = -1;
    const isCompact = (this.config.pixelsPerTimeStep === 0);
    if (activeNote) { // Given activeNote means highliting it
      const keepOnPlayingNotes: NoteSequence.INote[] = [];
      this.playingNotes.forEach( // Revert non playing notes highliting
        note => {
          if (this.isPaintingActiveNote(note, activeNote)) {
            keepOnPlayingNotes.push(note);
          }
          else {
            this.highlightElement(this.getGroup(note), false);
          }
        }
      );
      this.playingNotes = keepOnPlayingNotes;
      const g = this.getGroup(activeNote);
      if (g) {
        this.playingNotes.push(activeNote); // Store to revert highlight later
        this.highlightElement(g, true);
        activeNotePosition = g.getBoundingClientRect().left - 
          this.staffSVG.getBoundingClientRect().left;
        const time = this.getNoteStartTime(activeNote);
        const quarters = this.timeToQuarters(time);
        if (
          this.scrollType !== ScrollType.BAR || this.barBeginnings.has(quarters)
        ) {
          this.scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition);
        }
        if (
          !isCompact && this.signaturesBlinking &&
          quarters >= this.signaturesQuarters
        ) {
          this.signaturesBlinking = false;
          setFade(this.overlayG, this.signaturesBlinking);
        }
      }
    }
    else { // No activeNote given means redrawing it all from scratch
      this.setDetails();
      const isFirstRedraw = (this.lastQ === -1);
      let x = 0;
      let width = 0;
      if (isFirstRedraw) {
        // Clef+Key+Time signatures
        width = this.drawSignatures(this.overlayG, x, true, true, true);
        if (isCompact) {
          this.width = 0;
          // First padding if compacted. Following are placed after drawings
          width += this.config.noteSpacing;
        }
      }
      else {
        x = this.width;
      }
      this.blockDetailsMap.forEach ( // Music Blocks
        (blockDetails, quarters) => {
          if (quarters > this.lastQ) {
            if (!isCompact) {
              x = this.quartersToTime(quarters) * this.hStepSize;
            } 
            width += this.drawMusicBlock(blockDetails, x + width);
            this.lastQ = quarters;
          }
        }
      );
      // Vertical resizing
      const svgRect = this.staffSVG.getBoundingClientRect();
      const gRect = this.musicG.getBoundingClientRect();
      this.updateVerticalBoundaries(
        gRect.top - svgRect.top, gRect.bottom - svgRect.top
      );
      if (isCompact) { // Compact staff horizontal resizing
        this.width += width;
      }
      else { // Proportional staff horizontal resizing
        const endTime = this.sequenceIsQuantized ?
          this.noteSequence.totalQuantizedSteps :
          this.noteSequence.totalTime;
        this.width = endTime * this.config.pixelsPerTimeStep;
      }
      this.staffSVG.setAttributeNS(null, 'width', `${this.width}`);
      this.redrawStaff(this.linesG, 0, this.width);
    }
    return activeNotePosition;
  }

  private drawMusicBlock(blockDetails: BlockDetails, x: number): number {
    const quarter = blockDetails.notes[0].start;
    // Preceding bar
    let width = this.drawBarIfNeeded(quarter, x);
    // Signature change
    const keyChanged = this.changeKeySignatureIfNeeded(quarter);
    const timeChanged = this.changeTimeSignatureIfNeeded(quarter);
    if (keyChanged || timeChanged) {
      const clefSpacing = COMPACT_SPACING * this.scale * 
        (this.config.pixelsPerTimeStep > 0 ? 3 : 2);
      this.signaturesList.push({x: x - clefSpacing , q: quarter});
      if (this.signatureNext === null) {
        this.signatureNext = x;
      }
      const signatures = quarter > 0 ?
        createSVGGroupChild(this.signaturesG, 'signatures') : this.overlayG;
      width += this.drawSignatures(
        signatures, x + width, false, keyChanged, timeChanged
      );
    }
    // Kind of note selection (all block notes have same aspect, some are tied)
    let headIndex = 0;
    for (let i = 4; i >= MIN_RESOLUTION && !headIndex; i /= 2) {
      if (i <= blockDetails.notes[0].length) {
        headIndex = i;
      }
    }
    // Fallback for notes shorter than MIN_RESOLUTION. It will be warned on 
    // console and MIN_RESOLUTION note will be drawn.
    if (headIndex == 0) {
      let noteLength = blockDetails.notes[0].length === 0 ? '[infinite]' : 
        `${4 / blockDetails.notes[0].length}`;
      logging.log(
        'mm.StaffSVGVisualizer does not handle notes shorther than ' +
        `1/${4 / MIN_RESOLUTION}th, and this score tries to draw a ` +
        `1/${noteLength}th. Shortest possible note will be drawn instead.`, 
        'mm.StaffSVGVisualizer', logging.Level.WARN
      );
      headIndex = MIN_RESOLUTION;
    }
    const noteHead = NOTE_PATHS[headIndex];
    // Stem placeholder created beforehand as a lower layer
    let stemG: SVGElement;
    if (noteHead.stemAnchor) {
      stemG = createSVGGroupChild(this.musicG, 'stem');
    }
    // Polyphonic block notes pitch part (everything but shared stem and flags)
    blockDetails.notes.forEach(
      note => {
        const y = note.vSteps * this.vStepSize;
        // Over and under staff extra lines
        const start = 2 * (
          note.vSteps>0 ? Math.floor(note.vSteps/2) : Math.ceil(note.vSteps/2)
        );
        const delta = note.vSteps > 0 ? -2 : 2;
        for (let i = start; Math.abs(i) > 4; i += delta) {
          drawSVGPath(this.linesG, extraLinePath, 
            x + width, i * this.vStepSize, this.scale, 1);
        }
        // Highlightable overall grouping placeholder
        note.g = (note.tiedFrom) ? note.tiedFrom.g : 
          createSVGGroupChild(this.musicG, `${note.start}-${note.pitch}`);
        // Preceding Tie
        if (note.tiedFrom) {
          const tieWidth = x + width - note.tiedFrom.xHeadRight;
          drawSVGPath(
            note.g, tiePath, note.tiedFrom.xHeadRight, y, tieWidth/PATH_SCALE, 
            this.scale * (note.vSteps < 0 ? -1 : 1), note.opacity
          );
        }
        // Note head
        drawSVGPath(
          note.g, noteHead.path, 
          x + width, y, this.scale, this.scale, note.opacity
        );
        note.xHeadRight = x + width + noteHead.width*this.scale;
        // Dotted note
        if (headIndex * 1.5 <= note.length) {
          drawSVGPath(
            note.g, dotPath, 
            x + width + noteHead.width*this.scale + this.vStepSize/2, 
            y - this.vStepSize/2, this.scale, this.scale, note.opacity
          );
        }
        // Accidentals
        if (note.accidental !== 0) {
          drawSVGPath(
            note.g, ACCIDENTAL_PATHS[note.accidental],
            x + width, y, this.scale, this.scale, note.opacity
          );
        }
      }
    );
    if (noteHead.stemAnchor) { // There is a stem and potentially some flags
      let xStem = x + width;
      let y1: number, y2: number;
      const anchor = noteHead.stemAnchor*this.scale;
      const downwards = blockDetails.minVStep + blockDetails.maxVStep < 0;
      const multiple = (noteHead.flags > 2) ? 2 * (noteHead.flags-2) : 0;
      if (downwards) { // Downwards
        y1 = blockDetails.maxVStep * this.vStepSize - anchor;
        y2 = (blockDetails.minVStep + 7 + multiple) * this.vStepSize;
      }
      else { // Upwards
        xStem += (noteHead.width - STEM_WIDTH) * this.scale;
        y1 = blockDetails.minVStep * this.vStepSize + anchor;
        y2 = (blockDetails.maxVStep - 7 - multiple) * this.vStepSize;
      }
      drawSVGPath(
        stemG, stemPath, xStem, y1, this.scale, (y2 - y1) / PATH_SCALE
      );
      if (noteHead.flags === 1) { // Single flag
        drawSVGPath(
          stemG, singleFlagPath, xStem, y2, 
          this.scale, this.scale * (downwards ? -1 : 1), 1
        );
      }
      else if (noteHead.flags > 1) { // Multiple flag
        for (let i = 0; i < noteHead.flags; ++i) {
          drawSVGPath(
            stemG, multiFlagPath, xStem, y2, 
            this.scale, this.scale * (downwards ? -1 : 1), 1
          );
          y2 += (downwards ? -2 : 2) * this.vStepSize;
        }
      }
    }
    if (this.config.pixelsPerTimeStep === 0) { // Compact visualization
      width += noteHead.width * this.scale; // Head size
      if (stemG) {
        width += stemG.getBoundingClientRect().width; 
      }
      width += this.config.noteSpacing; // Post-spacing
    }
    width += this.drawRests(blockDetails, x + width);
    return width;
  }

  private drawBarIfNeeded(quarters: number, x: number): number {
    let width = 0;
    if (quarters !== 0 && this.barBeginnings.has(quarters)) { // 1st bar skipped
      if (this.config.pixelsPerTimeStep > 0) { // Proportional visualization
        x -= this.config.noteSpacing; // Negative to avoid touching note head
      }
      else { // Compact visualization
        width = this.config.noteSpacing;
      }
      drawSVGPath(this.linesG, barPath, x, 0, 1, this.scale);
    }
    return width;
  }

  // TODO: Update when ProtocolBuffer cover a quantizedStep version
  private fillBars(lastQ: number) {
    const timeSignatures = (this.noteSequence.timeSignatures) ?
      this.noteSequence.timeSignatures.slice(0) : 
      [{time: 0, numerator: 4, denominator: 4}];
    timeSignatures.sort((x, y) => x.time - y.time);
    let q = 0;
    for (let i = 0; i < timeSignatures.length; ++i) {
      const signatureEnd = (i === timeSignatures.length - 1) ?
        lastQ : this.timeToQuarters(timeSignatures[i].time);
      const qPerBar = 
        timeSignatures[i].numerator * 4 / timeSignatures[i].denominator;
      for (; q < signatureEnd; q += qPerBar) {
        this.barBeginnings.add(q);
      }
    }
  }

  private drawRests(blockDetails: BlockDetails, x: number): number {
    let width = 0;
    let remainingLength = blockDetails.restToNextLength;
    if (remainingLength) {
      if (this.config.pixelsPerTimeStep > 0) {
        x += this.quartersToTime(blockDetails.notes[0].length) * this.hStepSize;
      }
      // Find a possible rest incomplete bar split
      let lengthAfterFirstBar = 0;
      let quarters = blockDetails.notes[0].start + blockDetails.notes[0].length;
      const barDelta = 4 / this.timeSignatureDenominator;
      const beginBarStep = Math.ceil(quarters / barDelta) * barDelta;
      const endBarStep = quarters + remainingLength;
      for (let q = beginBarStep; q < endBarStep; q += barDelta) {
        if (this.barBeginnings.has(q)) {
          lengthAfterFirstBar = remainingLength - (q - quarters);
          remainingLength = q - quarters;
          break;
        }
      }
      // Draw rests in a lowering size progression to fit the gap
      let l = 4;
      while ((remainingLength || lengthAfterFirstBar) && l >= MIN_RESOLUTION) {
        if (l <= remainingLength) { // A rest of length l must be drawn
          width += this.drawBarIfNeeded(quarters, x + width);
          const rest = drawSVGPath(
            this.musicG, REST_PATHS[l], x + width, 0, this.scale, this.scale
          );
          if (this.config.pixelsPerTimeStep > 0) { // Proportional visualization
            x += this.quartersToTime(l) * this.hStepSize;
          }
          else { // Compact visualization
            width += rest.getBoundingClientRect().width;
            width += this.config.noteSpacing; // Post-spacing
          }
          quarters += l;
          remainingLength -= l;
        }
        if (lengthAfterFirstBar && remainingLength <= 0) { // Swap the split
          remainingLength = lengthAfterFirstBar;
          lengthAfterFirstBar = 0;
          l = 4;
        }
        if (remainingLength < l) { // Same rest size won't fit next iteration
          l /= 2;
        }
      }
    }
    return width;
  }

  private redrawStaff(e: SVGElement, x: number, width: number) {
    let staff = e.querySelector('g[data-id="staff-five-lines"]') as SVGElement;
    if (staff) { // Already drawn
      staff.setAttributeNS(
        null, 'transform', `scale(${width/PATH_SCALE}, 1)`
      );
    }
    else {
      staff = createSVGGroupChild(e, 'staff-five-lines');
      const y = 0;
      for (let i = -4; i <= 4; i += 2) { // Draw five line staff
        drawSVGPath(
          staff, staffLinePath, x, y + i * this.vStepSize, width/PATH_SCALE, 1
        );
      }
    }
    return staff;
  }

  protected clearSignatureOverlay() {
    while (this.overlayG.lastChild) {
      this.overlayG.removeChild(this.overlayG.lastChild);
    }
  }

  private drawSignatures(
    e: SVGElement, x: number, 
    drawClef: boolean, drawKey: boolean, drawTime: boolean
  ): number {
    const spacing = COMPACT_SPACING * this.scale;
    let width = spacing;
    let background: SVGRectElement;
    const drawBackground = 
      e === this.overlayG || this.config.pixelsPerTimeStep > 0;

    if (drawBackground) {
      background = document.createElementNS(SVGNS, 'rect');
      background.setAttributeNS(null, 'x', `${x}`);
      background.setAttributeNS(null, 'y', '0');
      background.setAttributeNS(null, 'width', '1'); // 1 to avoid distortions
      background.setAttributeNS(null, 'height', '1'); // 1 to avoid distortions
      background.setAttribute('data-id', 'background');
      e.appendChild(background);
      const upperStyle = 
        document.defaultView.getComputedStyle(this.div.parentElement);
      background.setAttributeNS(
        null, 'fill', upperStyle.getPropertyValue('background-color')
      );
    }
    if (drawClef) {
      const clef = drawSVGPath(
        e, CLEF_PATHS[this.clef].path, x + width, 0, this.scale, this.scale
      );
      this.setFill(clef);
      width += 3 * spacing;
    }
    if (drawKey) {
      const accidental = KEY_ACCIDENTALS[this.key].accidental;
      const offset = (this.clef === 71) ? 0 : 14; // Measured in vStep
      KEY_ACCIDENTALS[this.key].pitches.forEach(
        pitch => {
          const steps = this.getPitchDetails(pitch).vSteps;
          const p = drawSVGPath(e, ACCIDENTAL_PATHS[accidental], 
            x + width, (offset + steps) * this.vStepSize, 
            this.scale, this.scale);
          this.setFill(p);
          width += p.getBoundingClientRect().width;
        }
      );
    }
    if (drawTime) { // 0.5 and 2.85 are empirical Times font values
      const timeKey = createSVGGroupChild(e, 'time-key');
      const fontSize = `${2.85*this.config.noteHeight}px`;
      drawSVGText(
        timeKey, `${this.timeSignatureNumerator}`, 
        x + width, - 0.5, fontSize, true
      );
      drawSVGText(
        timeKey, `${this.timeSignatureDenominator}`, 
        x + width, 4 * this.vStepSize - 0.5, fontSize, true
      );
      this.setFill(timeKey);
      width += timeKey.getBoundingClientRect().width + spacing;
    }    
    const staff = this.redrawStaff(e, x, width);
    this.setStroke(staff);
    // Vertical and horizontal resizing
    const divRect = this.div.getBoundingClientRect();
    const eRect = e.getBoundingClientRect();
    this.updateVerticalBoundaries(
      eRect.top - divRect.top, eRect.bottom - divRect.top
    );
    if (drawBackground) { // Late redimension after foreground drawing
      background.setAttributeNS(null, 'y', `${-this.staffOffset}`);
      background.setAttributeNS(null, 'height', `${this.height}`);
      background.setAttributeNS(null, 'width', `${width}`);
    }
    // Overlapping Gradient only applies in overlay
    if (e === this.overlayG) {
      this.overlaySVG.setAttributeNS(null, 'width', `${width + 5}`);
      for (let i = 0; i < 5; ++i) {
        const grad = drawSVGPath(
          e, stemPath, width + i, i * i - this.staffOffset, 1 / STEM_WIDTH, 
          (this.height - 2 * i * i) / PATH_SCALE, 
          (i - 5) * (i - 5) * 2 / PATH_SCALE
        );
        this.setFill(grad);
      }
    }
    // Blinking set up and return
    if (this.config.pixelsPerTimeStep > 0) { // Proportional visualization
      const firstOverlay = this.signaturesQuarters === 0;
      if (firstOverlay) { // First time overlay is drawn
        this.signaturesQuarters = this.timeToQuarters(width/this.hStepSize);
      }
      if (firstOverlay || x > 0) { // Excludes second overlay drawings
        this.signaturesBlinking = true;
        setFade(e, this.signaturesBlinking);
      }
      return 0;
    } 
    else { // Compact visualization
      return width;
    }
  }

  // TODO: Update when ProtocolBuffer cover a quantizedStep version
  protected changeKeySignatureIfNeeded(quarter: number): boolean {
    if (this.noteSequence.keySignatures) {
      let candidateKey = this.key;
      for (let i = 0; i < this.noteSequence.keySignatures.length; ++i) {
        if (
          this.timeToQuarters(this.noteSequence.keySignatures[i].time) <= 
          quarter
        ) {
          candidateKey = this.noteSequence.keySignatures[i].key;
        }
        else {
          break;
        }
      }
      if (candidateKey !== this.key) {
        this.key = candidateKey;
        return true;
      }
    }
    return false;
  } 

  // TODO: Update when ProtocolBuffer cover a quantizedStep version
  protected changeTimeSignatureIfNeeded(quarter: number): boolean {
    if (this.noteSequence.timeSignatures) {
      let altNumerator = this.timeSignatureNumerator;
      let altDenominator = this.timeSignatureDenominator;
      for (let i = 0; i < this.noteSequence.timeSignatures.length; ++i) {
        if (
          this.timeToQuarters(this.noteSequence.timeSignatures[i].time) <= 
          quarter
        ) {
          altNumerator = this.noteSequence.timeSignatures[i].numerator;
          altDenominator = this.noteSequence.timeSignatures[i].denominator;
        }
        else {
          break;
        }
      }
      if (
        altNumerator !== this.timeSignatureNumerator ||
        altDenominator !== this.timeSignatureDenominator
      ) {
        this.timeSignatureNumerator = altNumerator;
        this.timeSignatureDenominator = altDenominator;
        return true;
      }
    }
    return false;
  }

//    current  x     next   <= current & next include the starting point
//          |  |     |
// [0      )[1      )[2     )null
  private changeAndDrawSignaturesIfNeeded(x: number) {
    let quarter: number;
    if (
      x < this.signatureCurrent || 
      (this.signatureNext !== null && this.signatureNext <= x)
    ) {
      quarter = this.signaturesList[0].q;
      this.signatureNext = null;
      for (let i = 0; i < this.signaturesList.length; ++i) {
        if (x < this.signaturesList[i].x) {
          this.signatureNext = this.signaturesList[i].x;
          break;
        }
        else {
          this.signatureCurrent = this.signaturesList[i].x;
          quarter = this.signaturesList[i].q;
        }
      }
    }

    if (quarter !== undefined) {
      const key = this.key;
      const timeSignatureNumerator = this.timeSignatureNumerator;
      const timeSignatureDenominator = this.timeSignatureDenominator;
      this.changeKeySignatureIfNeeded(quarter);
      this.changeTimeSignatureIfNeeded(quarter);
      this.clearSignatureOverlay();
      this.drawSignatures(this.overlayG, 0, true, true, true);
      this.key = key;
      this.timeSignatureNumerator = timeSignatureNumerator;
      this.timeSignatureDenominator = timeSignatureDenominator;
    }

    if (this.config.pixelsPerTimeStep > 0 && x === 0) {
      this.signatureNext = 0; // To reset blinking if scrolled
      this.signaturesBlinking = true;
      setFade(this.overlayG, this.signaturesBlinking);
    }
  }

  private handleScrollEvent = (_event: UIEvent) => {
    this.lastKnownScrollLeft = this.parentElement.scrollLeft;
    if (!this.ticking) {
      window.requestAnimationFrame(
        () => {
          this.changeAndDrawSignaturesIfNeeded(this.lastKnownScrollLeft);
          this.ticking = false;
        }
      );
    }
    this.ticking = true;
  };

  protected scrollIntoViewIfNeeded(
    scrollIntoView: boolean, activeNotePosition: number) {
    if (scrollIntoView) {
      if (this.scrollType === ScrollType.PAGE) {
        super.scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition);
      } 
      else { // Valid for both ScrollType.NOTE & ScrollType.BAR
        const containerWidth = this.parentElement.getBoundingClientRect().width;
        this.parentElement.scrollLeft = 
          activeNotePosition - containerWidth * 0.5;
      }
    }
  }

  private updateVerticalBoundaries(top: number, bottom: number) {
    let newHeight = 0;
    if (top < 0) {
      this.staffOffset -= top;
      const translation = `translate(0, ${this.staffOffset})`;
      this.overlayG.setAttributeNS(null, 'transform', translation);
      this.staffG.setAttributeNS(null, 'transform', translation);
      newHeight = this.height - top;
    }
    newHeight = Math.max(newHeight, bottom - top);
    if (newHeight > this.height) {
      this.height = newHeight;
      this.overlaySVG.setAttributeNS(null, 'height', `${this.height}`);
      this.staffSVG.setAttributeNS(null, 'height', `${this.height}`);
      const els = this.div.querySelectorAll('rect[data-id="background"]');
      for (let i = 0; i < els.length; ++i) {
        const el = els[i];
        el.setAttributeNS(null, 'y', `${-this.staffOffset}`);
        el.setAttributeNS(null, 'height', `${this.height}`);
      }  
    }
  }

  private timeToQuarters(timeLength: number): number {
    const q = this.sequenceIsQuantized ?
      timeLength / this.noteSequence.quantizationInfo.stepsPerQuarter : 
      timeLength * this.noteSequence.tempos[0].qpm / 60;
    return Math.round(q*16)/16; // Current resolution = 1/16 quarter
  }

  private quartersToTime(quarters: number): number {
    return this.sequenceIsQuantized ? // No resolution adjustment needed
      quarters * this.noteSequence.quantizationInfo.stepsPerQuarter : 
      quarters / this.noteSequence.tempos[0].qpm * 60;
  }

  private setFill(e: SVGElement, isActive = false) {
    e.setAttributeNS(null, 'fill', this.getColor(isActive));
  }

  private setStroke(e: SVGElement, strokeWidth=LINE_STROKE, isActive=false) {
    e.setAttributeNS(null, 'stroke', this.getColor(isActive));
    e.setAttributeNS(null, 'stroke-width', `${strokeWidth}`);
  }

  private getColor(isActive: boolean): string {
    return `rgb(${isActive ? this.config.activeNoteRGB : this.config.noteRGB})`;
  }

  private getOpacity(noteVelocity?: number): number {
    const opacityBaseline = 0.2;  // Shift all the opacities up a little.
    return noteVelocity ? 
      (noteVelocity / 127) * (1 - opacityBaseline) + opacityBaseline : 1;
  }

  private getGroup(note: NoteSequence.INote): SVGElement {
    const quarters = this.timeToQuarters(this.getNoteStartTime(note));
    const pitch = note.pitch;
    return this.staffSVG.querySelector(`g[data-id="${quarters}-${pitch}"]`);
  }

  private highlightElement(e: SVGElement, isActive: boolean) {
    e.setAttribute('fill', this.getColor(isActive));
    e.setAttribute('stroke', this.getColor(isActive));
  }

  private isNoteInInstruments(note: NoteSequence.INote, instruments: number[])
  : boolean {
    if (note.instrument === undefined || instruments.length === 0) {
      return true; // No instrument information in note means no filtering
    }
    else {
      return instruments.indexOf(note.instrument) >= 0; // Instrument filter
    }
  }

  private setDetails() {
    let blocks = new Map<number, QNote[]>();
    const endTime = this.sequenceIsQuantized ?
      this.noteSequence.totalQuantizedSteps : this.noteSequence.totalTime;
    this.fillBars(this.timeToQuarters(endTime));
    const splites = new Set<number>(this.barBeginnings); // Bars = split points
    // First pass to translate all notes to quarters
    const initialKey = this.key;
    let lastQ = -1;
    const sortedNotes = this.noteSequence.notes.slice().sort(
      (x, y) => this.getNoteStartTime(x) - this.getNoteStartTime(y)
    );
    sortedNotes.forEach( 
      note => {
        if (this.isNoteInInstruments(note, this.instruments)) {
          const quarters = this.timeToQuarters(this.getNoteStartTime(note));
          if (quarters !== lastQ) { // Once per polyphonic set
            this.changeKeySignatureIfNeeded(quarters);
            if (this.barBeginnings.has(quarters)) {
              this.barAccidentals = {}; // Reset bar accidentals 
            }
          }
          else {
            lastQ = quarters;
          }
          const qNote = this.getQNote(note);
          splites.add(qNote.start);
          splites.add(qNote.start + qNote.length);
          if (blocks.has(qNote.start)) {
            blocks.get(qNote.start).push(qNote);
          }
          else {
            blocks.set(qNote.start, [qNote]);
          }
        }
      }
    );
    this.key = initialKey;
    // Second pass to apply all splites to the right blocks
    const sortedSplites = Array.from(splites).sort((x, y) => x - y);
    sortedSplites.forEach(
      split => {
        const remains: QNote[] = [];
        blocks.forEach(
          block => {
            block.forEach(
              qNote => {
                const remainQNote = this.splitQNote(qNote, split);
                if (remainQNote) { remains.push(remainQNote); }
              }
            );
          }
        );
        remains.forEach(
          qNote => {
            if (blocks.has(qNote.start)) {
              blocks.get(qNote.start).push(qNote);
            }
            else {
              blocks.set(qNote.start, [qNote]);
            }
          }
        );
      }
    );
    blocks = new Map(Array.from(blocks).sort((x, y) => x[0] - y[0]));
    // Third pass to fill rests and min/max vaues
    let lastBlockDetails: BlockDetails = null;
    let lastBlockEnd = 0;
    blocks.forEach(
      (block: QNote[], quarters: number) => {
        const blockDetails: BlockDetails = {
          maxVStep: block[0].vSteps,
          minVStep: block[0].vSteps, 
          restToNextLength: 0,
          notes: [block[0]]
        };
        for (let i=1; i<block.length; ++i) {
          const b = block[i];
          blockDetails.minVStep = Math.max(b.vSteps, blockDetails.minVStep);
          blockDetails.maxVStep = Math.min(b.vSteps, blockDetails.maxVStep);
          blockDetails.notes.push(b);
        }
        if (lastBlockDetails) { // Rest length from last block to this one
          lastBlockDetails.restToNextLength = quarters - lastBlockEnd;
        }
        this.blockDetailsMap.set(quarters, blockDetails);
        lastBlockDetails = blockDetails;
        lastBlockEnd = quarters + blockDetails.notes[0].length;
      }
    );
  }

  private getQNote(note: NoteSequence.INote): QNote {
    const pitchDetails = this.getPitchDetails(note.pitch);
    if (pitchDetails.vSteps in this.barAccidentals) { // Previous occurrence
      if (
        pitchDetails.accidental === this.barAccidentals[pitchDetails.vSteps]
      ) {
        pitchDetails.accidental = 0; // Ignore repetitions
      }
      else { // Replace with the new one
        if (pitchDetails.accidental === 0) {
          if (this.barAccidentals[pitchDetails.vSteps] === 3) {
            // If changing from normal accidental, force key accidental
            pitchDetails.accidental = KEY_ACCIDENTALS[this.key].accidental;
          }
          else {
            // Otherwise, coming from sharp or flat, force normal
            pitchDetails.accidental = 3;
          }
        }
        this.barAccidentals[pitchDetails.vSteps] = pitchDetails.accidental;
      }
    }
    else { // Register new occurrence
      this.barAccidentals[pitchDetails.vSteps] = pitchDetails.accidental;
    }
    const noteStart = this.timeToQuarters(this.getNoteStartTime(note));
    const noteEnd = this.timeToQuarters(this.getNoteEndTime(note));
    return {
      start: noteStart,
      length: (noteEnd - noteStart),
      vSteps: pitchDetails.vSteps,
      accidental: pitchDetails.accidental,
      opacity: this.getOpacity(note.velocity),
      pitch: note.pitch,
      xHeadRight: 0
    };
  }

  private splitQNote(qNote: QNote, quarters: number): QNote {
    const remainLength = (qNote.start + qNote.length) - quarters;
    if (quarters > qNote.start && remainLength > 0) {
      qNote.length -= remainLength;
      return {
        start: quarters,
        length: remainLength,
        vSteps: qNote.vSteps,
        accidental: qNote.accidental,
        opacity: qNote.opacity,
        pitch: qNote.pitch,
        xHeadRight: 0,
        tiedFrom: qNote
      };
    }
    else {
      return null;
    }
  }

  private getPitchDetails(notePitch: number)
  : {vSteps: number, accidental: number} {
    const semitones = notePitch - 60;
    const octave = Math.floor(semitones/12);
    const reminderSemitones = semitones-12*octave;
    const steps = SCALES[this.key].steps[reminderSemitones];
    const accidentalValue = SCALES[this.key].accidental[reminderSemitones];
    const offset = (this.clef === 71) ? 6 : -6;
    return {
      vSteps: offset - 7*octave + steps, 
      accidental: accidentalValue
    };
  }
}