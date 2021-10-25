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

import * as sr from 'staffrender';

import {INoteSequence, NoteSequence} from '../protobuf/index';

import {MAX_MIDI_PITCH, MIN_MIDI_PITCH} from './constants';
import * as logging from './logging';
import * as sequences from './sequences';

const MIN_NOTE_LENGTH = 1;

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
export interface VisualizerConfig {
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

  // Clears the active notes in the visualization.
  public abstract clearActiveNotes(): void;
  /**
   * BaseVisualizer` constructor.
   *
   * @param sequence The `NoteSequence` to be visualized.
   * @param canvas The element where the visualization should be displayed.
   * @param config (optional) Visualization configuration options.
   */
  constructor(sequence: INoteSequence, config: VisualizerConfig = {}) {
    // The core player (see player.ts line 169) can only play unquantized sequences,
    // and will unquantize any quantized sequences. We must do the same here, or 
    // else in the redrawing callback none of the visual notes will be found.
    const isQuantized = sequences.isQuantizedSequence(sequence);
    const qpm = (sequence.tempos && sequence.tempos.length > 0) ? sequence.tempos[0].qpm : undefined;
    this.noteSequence = isQuantized ? sequences.unquantizeSequence(sequence, qpm) : sequence;
    
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

    const size = this.getSize();
    this.width = size.width;
    this.height = size.height;
  }

  protected updateMinMaxPitches(noExtraPadding = false) {
    if (this.config.minPitch && this.config.maxPitch) {
      return;
    }

    // If the pitches haven't been specified already, figure them out
    // from the NoteSequence.
    if (this.config.minPitch === undefined) {
      this.config.minPitch = MAX_MIDI_PITCH;
    }
    if (this.config.maxPitch === undefined) {
      this.config.maxPitch = MIN_MIDI_PITCH;
    }
    // Find the smallest pitch so that we can scale the drawing correctly.
    for (const note of this.noteSequence.notes) {
      this.config.minPitch = Math.min(note.pitch, this.config.minPitch);
      this.config.maxPitch = Math.max(note.pitch, this.config.maxPitch);
    }

    // Add a little bit of padding at the top and the bottom.
    if (!noExtraPadding) {
      this.config.minPitch -= 2;
      this.config.maxPitch += 2;
    }
  }

  protected getSize(): {width: number; height: number} {
    this.updateMinMaxPitches();

    // Height of the canvas based on the range of pitches in the sequence.
    const height =
        (this.config.maxPitch - this.config.minPitch) * this.config.noteHeight;

    // Calculate a nice width based on the length of the sequence we're
    // playing.
    // Warn if there's no totalTime or quantized steps set, since it leads
    // to a bad size.
    const endTime = this.noteSequence.totalTime;
    if (!endTime) {
      throw new Error(
          'The sequence you are using with the visualizer does not have a ' +
          'totalQuantizedSteps or totalTime ' +
          'field set, so the visualizer can\'t be horizontally ' +
          'sized correctly.');
    }

    const width = (endTime * this.config.pixelsPerTimeStep);
    return {width, height};
  }

  protected getNotePosition(note: NoteSequence.INote, noteIndex: number):
      {x: number; y: number, w: number, h: number} {
    // Size of this note.
    const duration = this.getNoteEndTime(note) - this.getNoteStartTime(note);
    const x = (this.getNoteStartTime(note) * this.config.pixelsPerTimeStep);
    const w = Math.max(
        this.config.pixelsPerTimeStep * duration - this.config.noteSpacing,
        MIN_NOTE_LENGTH);

    // The svg' y=0 is at the top, but a smaller pitch is actually
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
    return Math.round(note.startTime * 100000000) / 100000000;
  }

  protected getNoteEndTime(note: NoteSequence.INote) {
    return Math.round(note.endTime * 100000000) / 100000000;
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
   * PianoRollCanvasVisualizer` constructor.
   *
   * @param sequence The `NoteSequence` to be visualized.
   * @param canvas The element where the visualization should be displayed.
   * @param config (optional) Visualization configuration options.
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

  public clearActiveNotes() {
    this.redraw();
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
 * HTML/CSS key-value pairs.
 */
type DataAttribute = [string, any];  // tslint:disable-line:no-any
type CSSProperty = [string, string | null];

/**
 * Abstract base class for a `NoteSequence` visualizer.
 */
export abstract class BaseSVGVisualizer extends BaseVisualizer {

  // This is the element used for drawing. You must set this property in
  // implementations of this class.
  protected svg: SVGSVGElement;
  protected drawn: boolean;

  /**
   * `SVGVisualizer` constructor.
   *
   * @param sequence The `NoteSequence` to be visualized.
   * @param svg The element where the visualization should be displayed.
   * @param config (optional) Visualization configuration options.
   */
  constructor(sequence: INoteSequence, config: VisualizerConfig = {}) {
    super(sequence, config);
    this.drawn = false;
  }

  /**
   * Redraws the entire note sequence if it hasn't been drawn before,
   * optionally painting a note as active
   * @param activeNote (Optional) If specified, this `Note` will be painted
   * in the active color.
   * @param scrollIntoView (Optional) If specified and the note being
   * painted is offscreen, the parent container will be scrolled so that
   * the note is in view.
   * @returns The x position of the painted active note. Useful for
   * automatically advancing the visualization if the note was painted
   * outside of the screen.
   */
  redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number {
    if (!this.drawn) {
      this.draw();
    }

    if (!activeNote) {
      return null;
    }

    // Remove the current active note, if one exists.
    this.unfillActiveRect(this.svg);

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
      this.fillActiveRect(el, note);
      if (note === activeNote) {
        activeNotePosition = parseFloat(el.getAttribute('x'));
      }
    }
    this.scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition);
    return activeNotePosition;
  }

  protected fillActiveRect(el: Element, note: NoteSequence.INote) {
    el.setAttribute('fill', this.getNoteFillColor(note, true));
    el.classList.add('active');
  }

  protected unfillActiveRect(svg: SVGSVGElement) {
    const els = svg.querySelectorAll('rect.active');
    for (let i = 0; i < els.length; ++i) {
      const el = els[i];
      const fill = this.getNoteFillColor(
          this.noteSequence.notes[parseInt(el.getAttribute('data-index'), 10)],
          false);
      el.setAttribute('fill', fill);
      el.classList.remove('active');
    }
  }

  protected draw() {
    for (let i = 0; i < this.noteSequence.notes.length; i++) {
      const note = this.noteSequence.notes[i];
      const size = this.getNotePosition(note, i);
      const fill = this.getNoteFillColor(note, false);
      const dataAttributes: DataAttribute[] = [
        ['index', i],
        ['instrument', note.instrument],
        ['program', note.program],
        ['isDrum', note.isDrum === true],
        ['pitch', note.pitch],
      ];
      const cssProperties: CSSProperty[] = [
        ['--midi-velocity',
         String(note.velocity !== undefined ? note.velocity : 127)]
      ];

      this.drawNote(size.x, size.y, size.w, size.h, fill,
                    dataAttributes, cssProperties);
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
      x: number, y: number, w: number, h: number, fill: string,
      dataAttributes: DataAttribute[], cssProperties: CSSProperty[]) {
    if (!this.svg) {
      return;
    }
    const rect: SVGRectElement =
        document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.classList.add('note');
    rect.setAttribute('fill', fill);

    // Round values to the nearest integer to avoid partially filled pixels.
    rect.setAttribute('x', `${Math.round(x)}`);
    rect.setAttribute('y', `${Math.round(y)}`);
    rect.setAttribute('width', `${Math.round(w)}`);
    rect.setAttribute('height', `${Math.round(h)}`);
    dataAttributes.forEach(([key, value]: DataAttribute) => {
      if (value !== undefined) {
        rect.dataset[key] = `${value}`;
      }
    });
    cssProperties.forEach(([key, value]: CSSProperty) => {
      rect.style.setProperty(key, value);
    });
    this.svg.appendChild(rect);
  }

  protected clear() {
    this.svg.innerHTML = '';
    this.drawn = false;
  }

  public clearActiveNotes() {
    this.unfillActiveRect(this.svg);
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
export class PianoRollSVGVisualizer extends BaseSVGVisualizer {
  /**
   * `PianoRollSVGVisualizer` constructor.
   *
   * @param sequence The `NoteSequence` to be visualized.
   * @param svg The element where the visualization should be displayed.
   * @param config (optional) Visualization configuration options.
   */
  constructor(
      sequence: INoteSequence, svg: SVGSVGElement,
      config: VisualizerConfig = {}) {
    super(sequence, config);

    if (!(svg instanceof SVGSVGElement)) {
      throw new Error(
          'This visualizer requires an <svg> element to display the visualization');
    }
    this.svg = svg;
    this.parentElement = svg.parentElement;

    const size = this.getSize();
    this.width = size.width;
    this.height = size.height;

    // Make sure that if we've used this svg element before, it's now emptied.
    this.svg.style.width = `${this.width}px`;
    this.svg.style.height = `${this.height}px`;

    this.clear();
    this.draw();
  }
}

export interface WaterfallVisualizerConfig extends VisualizerConfig {
  whiteNoteHeight?: number;
  whiteNoteWidth?: number;
  blackNoteHeight?: number;
  blackNoteWidth?: number;
  // Set this to true if you don't want to see the full 88 keys piano
  // keyboard, and only want to see the octaves used in the NoteSequence.
  showOnlyOctavesUsed?: boolean;
}

/**
 * Displays a waterfall pianoroll as an SVG, on top of a piano keyboard. When
 * connected to a player, the visualizer can also highlight the notes being
 * currently played, by letting them "fall down" onto the piano keys that
 * match them. By default, a keyboard with 88 keys will be drawn, but this can
 * be overriden with the `showOnlyOctavesUsed` config parameter, in which case
 * only the octaves present in the NoteSequence will be used.
 *
 * The DOM created by this element is:
 *    <div>
 *      <svg class="waterfall-notes"></svg>
 *    </div>
 *    <svg class="waterfall-piano"></svg>
 *
 * In particular, the `div` created needs to make some default
 * styling decisions (such as its height, to hide the overlow, and how much
 * it should be initially overflown), that we don't recommend you override since
 * it has a high chance of breaking how the visualizer works.
 * If you want to style the waterfall area, style the element that you
 * pass in the `WaterfallSVGVisualizer` constructor. For example, if you
 * want to resize the height (by default it is 200px), you can do:
 *
 *   <style>
 *     #waterfall {
 *       height: 500px;
 *     }
 *   </style>
 *   <div id="waterfall"></div>
 *   <script>
 *      const viz = new mm.WaterfallSVGVisualizer(seq, waterfall);
 *   </script>
 *
 * If you want to style the piano keyboard, you can style the rects themselves:
 *
 *    <style>
 *     #waterfall svg.waterfall-notes rect.black {
 *       fill: hotpink;
 *     }
 *    </style>
 */
export class WaterfallSVGVisualizer extends BaseSVGVisualizer {
  private NOTES_PER_OCTAVE = 12;
  private WHITE_NOTES_PER_OCTAVE = 7;
  private LOW_C = 24;
  private firstDrawnOctave = 0;
  private lastDrawnOctave = 6;

  protected svgPiano: SVGSVGElement;
  protected config: WaterfallVisualizerConfig;

  /**
   * `WaterfallSVGVisualizer` constructor.
   *
   * @param sequence The `NoteSequence` to be visualized.
   * @param parentElement The parent element that will contain the
   * visualization.
   * @param config (optional) Visualization configuration options.
   */
  constructor(
      sequence: INoteSequence, parentElement: HTMLDivElement,
      config: WaterfallVisualizerConfig = {}) {
    super(sequence, config);

    if (!(parentElement instanceof HTMLDivElement)) {
      throw new Error(
          'This visualizer requires a <div> element to display the visualization');
    }

    // Some sensible defaults.
    this.config.whiteNoteWidth = config.whiteNoteWidth || 20;
    this.config.blackNoteWidth =
        config.blackNoteWidth || this.config.whiteNoteWidth * 2 / 3;
    this.config.whiteNoteHeight = config.whiteNoteHeight || 70;
    this.config.blackNoteHeight = config.blackNoteHeight || (2 * 70 / 3);
    this.config.showOnlyOctavesUsed = config.showOnlyOctavesUsed;

    this.setupDOM(parentElement);

    const size = this.getSize();
    this.width = size.width;
    this.height = size.height;

    // Make sure that if we've used this svg element before, it's now emptied.
    this.svg.style.width = `${this.width}px`;
    this.svg.style.height = `${this.height}px`;

    this.svgPiano.style.width = `${this.width}px`;
    this.svgPiano.style.height = `${this.config.whiteNoteHeight}px`;

    // Add a little bit of padding to the right, so that the scrollbar
    // doesn't overlap the last note on the piano.
    this.parentElement.style.width =
        `${this.width + this.config.whiteNoteWidth}px`;
    this.parentElement.scrollTop = this.parentElement.scrollHeight;

    this.clear();
    this.drawPiano();
    this.draw();
  }

  private setupDOM(container: HTMLDivElement) {
    this.parentElement = document.createElement('div');
    this.parentElement.classList.add('waterfall-notes-container');

    const height = Math.max(container.getBoundingClientRect().height, 200);

    // Height and padding-top must match for this to work.
    this.parentElement.style.paddingTop =
        `${height - this.config.whiteNoteHeight}px`;
    this.parentElement.style.height =
        `${height - this.config.whiteNoteHeight}px`;

    this.parentElement.style.boxSizing = 'border-box';
    this.parentElement.style.overflowX = 'hidden';
    this.parentElement.style.overflowY = 'auto';

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgPiano =
        document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.classList.add('waterfall-notes');
    this.svgPiano.classList.add('waterfall-piano');

    this.parentElement.appendChild(this.svg);
    container.innerHTML = '';
    container.appendChild(this.parentElement);
    container.appendChild(this.svgPiano);
  }
  /**
   * Redraws the entire note sequence if it hasn't been drawn before,
   * optionally painting a note as active
   * @param activeNote (Optional) If specified, this `Note` will be painted
   * in the active color.
   * @param scrollIntoView (Optional) If specified and the note being
   * painted is offscreen, the parent container will be scrolled so that
   * the note is in view.
   * @returns The x position of the painted active note. Useful for
   * automatically advancing the visualization if the note was painted
   * outside of the screen.
   */
  redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean): number {
    if (!this.drawn) {
      this.draw();
    }

    if (!activeNote) {
      return null;
    }

    // Remove the current active note, if one exists.
    this.clearActiveNotes();
    this.parentElement.style.paddingTop = this.parentElement.style.height;

    for (let i = 0; i < this.noteSequence.notes.length; i++) {
      const note = this.noteSequence.notes[i];
      const isActive =
          activeNote && this.isPaintingActiveNote(note, activeNote);

      // We're only looking to re-paint the active notes.
      if (!isActive) {
        continue;
      }

      // Activate this note.
      const el = this.svg.querySelector(`rect[data-index="${i}"]`);
      this.fillActiveRect(el, note);

      // And on the keyboard.
      const key =
          this.svgPiano.querySelector(`rect[data-pitch="${note.pitch}"]`);
      this.fillActiveRect(key, note);

      if (note === activeNote) {
        const y = parseFloat(el.getAttribute('y'));
        const height = parseFloat(el.getAttribute('height'));

        // Scroll the waterfall.
        if (y < (this.parentElement.scrollTop - height)) {
          this.parentElement.scrollTop = y + height;
        }

        // This is the note we wanted to draw.
        return y;
      }
    }
    return null;
  }

  protected getSize(): {width: number; height: number} {
    this.updateMinMaxPitches(true);

    let whiteNotesDrawn = 52;  // For a full piano.
    if (this.config.showOnlyOctavesUsed) {
      // Go through each C note and see which is the one right below and
      // above our sequence.
      let foundFirst = false, foundLast = false;
      for (let i = 1; i < 7; i++) {
        const c = this.LOW_C + this.NOTES_PER_OCTAVE * i;
        // Have we found the lowest pitch?
        if (!foundFirst && c > this.config.minPitch) {
          this.firstDrawnOctave = i - 1;
          foundFirst = true;
        }
        // Have we found the highest pitch?
        if (!foundLast && c > this.config.maxPitch) {
          this.lastDrawnOctave = i - 1;
          foundLast = true;
        }
      }

      whiteNotesDrawn = (this.lastDrawnOctave - this.firstDrawnOctave + 1) *
          this.WHITE_NOTES_PER_OCTAVE;
    }

    const width = whiteNotesDrawn * this.config.whiteNoteWidth;

    // Calculate a nice width based on the length of the sequence we're
    // playing.
    // Warn if there's no totalTime or quantized steps set, since it leads
    // to a bad size.
    const endTime = this.noteSequence.totalTime;
    if (!endTime) {
      throw new Error(
          'The sequence you are using with the visualizer does not have a ' +
          'totalQuantizedSteps or totalTime ' +
          'field set, so the visualizer can\'t be horizontally ' +
          'sized correctly.');
    }

    const height = Math.max(endTime * this.config.pixelsPerTimeStep,
                            MIN_NOTE_LENGTH);
    return {width, height};
  }

  protected getNotePosition(note: NoteSequence.INote, noteIndex: number):
      {x: number; y: number, w: number, h: number} {
    const rect =
        this.svgPiano.querySelector(`rect[data-pitch="${note.pitch}"]`);

    if (!rect) {
      return null;
    }

    // Size of this note.
    const len = this.getNoteEndTime(note) - this.getNoteStartTime(note);
    const x = Number(rect.getAttribute('x'));
    const w = Number(rect.getAttribute('width'));
    const h = Math.max(
        this.config.pixelsPerTimeStep * len - this.config.noteSpacing,
        MIN_NOTE_LENGTH);

    // The svg' y=0 is at the top, but a smaller pitch is actually
    // lower, so we're kind of painting backwards.
    const y = this.height -
        (this.getNoteStartTime(note) * this.config.pixelsPerTimeStep) - h;
    return {x, y, w, h};
  }

  private drawPiano() {
    this.svgPiano.innerHTML = '';

    const blackNoteOffset =
        this.config.whiteNoteWidth - this.config.blackNoteWidth / 2;
    const blackNoteIndexes = [1, 3, 6, 8, 10];

    // Dear future reader: I am sure there is a better way to do this, but
    // splitting it up makes it more readable and maintainable in case there's
    // an off by one key error somewhere.
    // Each note has an pitch. Pianos start on pitch 21 and end on 108.
    // First draw all the white notes, in this order:
    //    - if we're using all the octaves, pianos start on an A (so draw A,
    //    B)
    //    - ... the rest of the white keys per octave
    //    - if we started on an A, we end on an extra C.
    // Then draw all the black notes (so that these rects sit on top):
    //    - if the piano started on an A, draw the A sharp
    //    - ... the rest of the black keys per octave.

    let x = 0;
    let currentPitch = 0;
    if (this.config.showOnlyOctavesUsed) {
      // Starting on a C, and a bunch of octaves up.
      currentPitch =
          (this.firstDrawnOctave * this.NOTES_PER_OCTAVE) + this.LOW_C;
    } else {
      // Starting on the lowest A and B.
      currentPitch = this.LOW_C - 3;
      this.drawWhiteKey(currentPitch, x);
      this.drawWhiteKey(currentPitch + 2, this.config.whiteNoteWidth);
      currentPitch += 3;
      x = 2 * this.config.whiteNoteWidth;
    }

    // Draw the rest of the white notes.
    for (let o = this.firstDrawnOctave; o <= this.lastDrawnOctave; o++) {
      for (let i = 0; i < this.NOTES_PER_OCTAVE; i++) {
        // Black keys come later.
        if (blackNoteIndexes.indexOf(i) === -1) {
          this.drawWhiteKey(currentPitch, x);
          x += this.config.whiteNoteWidth;
        }
        currentPitch++;
      }
    }

    if (this.config.showOnlyOctavesUsed) {
      // Starting on a C, and a bunch of octaves up.
      currentPitch =
          (this.firstDrawnOctave * this.NOTES_PER_OCTAVE) + this.LOW_C;
      x = -this.config.whiteNoteWidth;
    } else {
      // Before we reset, add an extra C at the end because pianos.
      this.drawWhiteKey(currentPitch, x);

      // This piano started on an A, so draw the A sharp black key.
      currentPitch = this.LOW_C - 3;
      this.drawBlackKey(currentPitch + 1, blackNoteOffset);
      currentPitch += 3;  // Next one is the LOW_C.
      x = this.config.whiteNoteWidth;
    }

    // Draw the rest of the black notes.
    for (let o = this.firstDrawnOctave; o <= this.lastDrawnOctave; o++) {
      for (let i = 0; i < this.NOTES_PER_OCTAVE; i++) {
        if (blackNoteIndexes.indexOf(i) !== -1) {
          this.drawBlackKey(currentPitch, x + blackNoteOffset);
        } else {
          x += this.config.whiteNoteWidth;
        }
        currentPitch++;
      }
    }
  }

  private drawWhiteKey(index: number, x: number) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.dataset.pitch = String(index);
    rect.setAttribute('x', String(x));
    rect.setAttribute('y', '0');
    rect.setAttribute('width', String(this.config.whiteNoteWidth));
    rect.setAttribute('height', String(this.config.whiteNoteHeight));
    rect.setAttribute('fill', 'white');
    rect.setAttribute('original-fill', 'white');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '3px');
    rect.classList.add('white');
    this.svgPiano.appendChild(rect);
    return rect;
  }

  private drawBlackKey(index: number, x: number) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.dataset.pitch = String(index);
    rect.setAttribute('x', String(x));
    rect.setAttribute('y', '0');
    rect.setAttribute('width', String(this.config.blackNoteWidth));
    rect.setAttribute('height', String(this.config.blackNoteHeight));
    rect.setAttribute('fill', 'black');
    rect.setAttribute('original-fill', 'black');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '3px');
    rect.classList.add('black');
    this.svgPiano.appendChild(rect);
    return rect;
  }

  public clearActiveNotes() {
    super.unfillActiveRect(this.svg);
    // And the piano.
    const els = this.svgPiano.querySelectorAll('rect.active');
    for (let i = 0; i < els.length; ++i) {
      const el = els[i];
      el.setAttribute('fill', el.getAttribute('original-fill'));
      el.classList.remove('active');
    }
  }
}

/**
 * Enumeration of different ways of horizontal score scrolling, like paginated
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
 *
 * @param defaultKey The musical key the score must use to adapt the score to
 * the right accidentals. It can be overwritten with
 * `NoteSequence.keySignatures` value at time or step 0. If not assigned it
 * will be asumed C key.
 * @param instruments The subset of the `NoteSequence` instrument track
 * numbers which should be merged and displayed. If not assigned or equal to []
 * it will be used all instruments altogether.
 * @param scrollType Sets scrolling to follow scoreplaying in different ways
 * according to `ScrollType` enum values.
 */
export interface StaffSVGVisualizerConfig extends VisualizerConfig {
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
 * rest of the staff will scroll under this initial signature area
 * accordingly. In case of proportional note positioning, given it starts at
 * pixel zero, the signature area will blink meanwhile it collides with
 * initial active notes. Key and time signature changes will be shown
 * accordingly through score.
 *
 * New configuration features have been introduced through
 * `StaffSVGVisualizerConfig` over basic `VisualizerConfig`.
 *
 * When connected to a player, the visualizer can also highlight
 * the notes being currently played.
 *
 * You can find more info at:
 *
 * https://github.com/rogerpasky/staffrender-magentaviewer
 */
export class StaffSVGVisualizer extends BaseVisualizer {
  private render: sr.StaffSVGRender;  // The actual render.
  private instruments: number[];      // Instruments filter to be rendered.
  private drawnNotes: number;  // Number of drawn notes. Will redraw if changed.

  /**
   * `StaffSVGVisualizer` constructor.
   *
   * @param sequence The `NoteSequence` to be visualized.
   * @param div The element where the visualization should be displayed.
   * @param config (optional) Visualization configuration options.
   */
  constructor(
      sequence: INoteSequence, div: HTMLDivElement,
      config: StaffSVGVisualizerConfig = {}) {
    super(sequence, config);
    if (  // Overwritting super() value. Compact visualization as default.
        config.pixelsPerTimeStep === undefined ||
        config.pixelsPerTimeStep <= 0) {
      this.config.pixelsPerTimeStep = 0;
    }
    this.instruments = config.instruments || [];
    this.render = new sr.StaffSVGRender(
        this.getScoreInfo(sequence), {
          noteHeight: this.config.noteHeight,
          noteSpacing: this.config.noteSpacing,
          pixelsPerTimeStep: this.config.pixelsPerTimeStep,
          noteRGB: this.config.noteRGB,
          activeNoteRGB: this.config.activeNoteRGB,
          defaultKey: config.defaultKey || 0,
          scrollType: config.scrollType || ScrollType.PAGE,
        },
        div);
    this.drawnNotes = sequence.notes.length;
    this.clear();
    this.redraw();
  }

  /**
   * Clears and resets the visualizer object for further redraws from scratch.
   */
  protected clear() {
    this.render.clear();
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
   * highlighted is not visualized in the container DIV, the latter will be
   * scrolled so that the note is viewed in the right place. This can be
   * altered by `AdvancedVisualizerConfig.scrollType`.
   * @returns The x position of the highlighted active note relative to the
   * beginning of the DIV, or -1 if there wasn't any given active note. Useful
   * for automatically advancing the visualization if needed.
   */
  public redraw(activeNote?: NoteSequence.INote, scrollIntoView?: boolean):
      number {
    if (this.drawnNotes !== this.noteSequence.notes.length) {
      this.render.scoreInfo = this.getScoreInfo(this.noteSequence);
    }
    const activeNoteInfo =
        activeNote ? this.getNoteInfo(activeNote) : undefined;
    return this.render.redraw(activeNoteInfo, scrollIntoView);
  }

  private isNoteInInstruments(note: NoteSequence.INote): boolean {
    if (note.instrument === undefined || this.instruments.length === 0) {
      return true;  // No instrument information in note means no filtering.
    } else {        // Instrument filtering
      return this.instruments.indexOf(note.instrument) >= 0;
    }
  }

  private timeToQuarters(time: number): number {
    const q = time * this.noteSequence.tempos[0].qpm / 60;
    return Math.round(q * 16) / 16;  // Current resolution = 1/16 quarter.
  }

  private getNoteInfo(note: NoteSequence.INote): sr.NoteInfo {
    const startQ = this.timeToQuarters(note.startTime);
    const endQ = this.timeToQuarters(note.endTime);
    return {
      start: startQ,
      length: endQ - startQ,
      pitch: note.pitch,
      intensity: note.velocity
    };
  }

  private getScoreInfo(sequence: INoteSequence): sr.ScoreInfo {
    const notesInfo: sr.NoteInfo[] = [];
    sequence.notes.forEach((note: NoteSequence.INote) => {
      if (this.isNoteInInstruments(note)) {
        notesInfo.push(this.getNoteInfo(note));
      }
    });
    return {
      notes: notesInfo,
      tempos: sequence.tempos ?
          sequence.tempos.map((t: NoteSequence.ITempo) => {
            return {start: this.timeToQuarters(t.time), qpm: t.qpm};
          }) :
          [],
      keySignatures: sequence.keySignatures ?
          sequence.keySignatures.map((ks: NoteSequence.IKeySignature) => {
            return {start: this.timeToQuarters(ks.time), key: ks.key};
          }) :
          [],
      timeSignatures: sequence.timeSignatures ?
          sequence.timeSignatures.map((ts: NoteSequence.ITimeSignature) => {
            return {
              start: this.timeToQuarters(ts.time),
              numerator: ts.numerator,
              denominator: ts.denominator
            };
          }) :
          []
    };
  }

  public clearActiveNotes() {
    this.redraw();
  }
}
