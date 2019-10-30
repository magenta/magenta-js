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
      this.config.pixelsPerTimeStep =
          spq ? this.config.pixelsPerTimeStep / spq : 7;
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
    // Warn if there's no totalTime or quantized steps set, since it leads
    // to a bad size.
    const endTime = this.sequenceIsQuantized ?
        this.noteSequence.totalQuantizedSteps :
        this.noteSequence.totalTime;
    if (!endTime) {
      throw new Error(
          'The sequence you are using with the ' +
          'mm.PianoRollSVGVisualizer does not have a ' +
          (this.sequenceIsQuantized ? 'totalQuantizedSteps' : 'totalTime') +
          ' field set, so the visualizer can\'t be horizontally ' +
          'sized correctly.');
    }

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
    return this.sequenceIsQuantized ?
        note.quantizedStartStep :
        Math.round(note.startTime * 100000000) / 100000000;
  }

  protected getNoteEndTime(note: NoteSequence.INote) {
    return this.sequenceIsQuantized ?
        note.quantizedEndStep :
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

    if (!(svg instanceof SVGSVGElement)) {
      throw new Error(
          'mm.PianoRollSVGVisualizer requires an <svg> ' +
          'element to display the visualization');
    }
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
 * @param instruments The subset of the `NoteSequence` instrument track numbers
 * which should be merged and displayed. If not assigned or equal to [] it will
 * be used all instruments altogether.
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
 * rest of the staff will scroll under this initial signature area accordingly.
 * In case of proportional note positioning, given it starts at pixel zero, the
 * signature area will blink meanwhile it collides with initial active notes.
 * Key and time signature changes will be shown accordingly through score.
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
   * @param config Visualization configuration options.
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

  private quantizedStepsToQuarters(steps: number): number {
    const q = steps / this.noteSequence.quantizationInfo.stepsPerQuarter;
    return Math.round(q * 16) / 16;  // Current resolution = 1/16 quarter.
  }

  private getNoteInfo(note: NoteSequence.INote): sr.NoteInfo {
    const startQ = this.sequenceIsQuantized ?
        this.quantizedStepsToQuarters(note.quantizedStartStep) :
        this.timeToQuarters(note.startTime);
    const endQ = this.sequenceIsQuantized ?
        this.quantizedStepsToQuarters(note.quantizedEndStep) :
        this.timeToQuarters(note.endTime);
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
}
