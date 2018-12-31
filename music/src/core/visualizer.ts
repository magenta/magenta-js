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
import {sequences} from '.';
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
 * Displays a pianoroll with pitches on the vertical axis and time on the
 * horizontal. When connected to a player, the visualizer can also highlight the
 * notes being currently played.
 */
export class Visualizer {
  private config: VisualizerConfig;
  private ctx: CanvasRenderingContext2D;
  private height: number;
  public noteSequence: INoteSequence;
  private sequenceIsQuantized: boolean;
  private parentElement: HTMLElement;

  /**
   *   `Visualizer` constructor.
   *
   *   @param sequence The `NoteSequence` to be visualized.
   *   @param canvas The element where the visualization should be displayed.
   *   @param config Visualization configuration options.
   */
  constructor(
      sequence: INoteSequence, canvas: HTMLCanvasElement,
      config: VisualizerConfig = {}) {
    this.config = {
      noteHeight: config.noteHeight || 6,
      noteSpacing: config.noteSpacing || 1,
      pixelsPerTimeStep: config.pixelsPerTimeStep || 30,
      noteRGB: config.noteRGB || '8, 41, 64',
      activeNoteRGB: config.activeNoteRGB || '240, 84, 119',
      minPitch: config.minPitch,
      maxPitch: config.maxPitch,
    };

    this.noteSequence = sequence;
    this.sequenceIsQuantized = sequences.isQuantizedSequence(this.noteSequence);

    // Initialize the canvas.
    this.ctx = canvas.getContext('2d');
    this.parentElement = canvas.parentElement;

    // Resize the canvas to fit the range of pitches in the note sequence.
    // NOTE: In the future this could be changed to fit all pitches, whether
    // they are in the note sequence or note.
    const size = this.getCanvasSize();

    this.height = size.height;

    // Use the correct device pixel ratio so that the canvas isn't blurry
    // on retina screens. See:
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
    const dpr = window.devicePixelRatio || 1;
    this.ctx.canvas.width = dpr * size.width;
    this.ctx.canvas.height = dpr * size.height;

    // If we don't do this, then the canvas will look 2x bigger than we
    // want to.
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;

    this.ctx.scale(dpr, dpr);

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
    // TODO: this is not super optimal, and might start being too slow for
    // larger sequences. Instead, we should figure out a way to store the
    // "last painted active notes" and repaint those, as well as the new
    // active notes instead.
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    let activeNotePosition;

    for (let i = 0; i < this.noteSequence.notes.length; i++) {
      const note = this.noteSequence.notes[i];

      // Size of this note.
      const offset = this.config.noteSpacing * (i + 1);
      const x = (this.getNoteStartTime(note) * this.config.pixelsPerTimeStep) +
          offset;
      const w = (this.getNoteEndTime(note) - this.getNoteStartTime(note)) *
          this.config.pixelsPerTimeStep;

      // The canvas' y=0 is at the top, but a smaller pitch is actually
      // lower, so we're kind of painting backwards.
      const y = this.height -
          ((note.pitch - this.config.minPitch) * this.config.noteHeight);

      // Color of this note.
      const opacityBaseline = 0.2;  // Shift all the opacities up a little.
      const opacity = note.velocity ? note.velocity / 100 + opacityBaseline : 1;

      const isActive =
          activeNote && this.isPaintingActiveNote(note, activeNote);
      this.ctx.fillStyle =
          `rgba(${isActive ? this.config.activeNoteRGB : this.config.noteRGB},
          ${opacity})`;
      // Round values to the nearest integer to avoid partially filled pixels.
      this.ctx.fillRect(Math.round(x), Math.round(y), Math.round(w),
        Math.round(this.config.noteHeight));
      if (isActive) {
        activeNotePosition = x;
      }
    }

    if (scrollIntoView) {
      // See if we need to scroll the container.
      const containerWidth = this.parentElement.getBoundingClientRect().width;
      if (activeNotePosition >
          (this.parentElement.scrollLeft + containerWidth)) {
        this.parentElement.scrollLeft = activeNotePosition - 20;
      }
    }

    return activeNotePosition;
  }

  private getCanvasSize(): {width: number; height: number} {
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

    // Calculate a nice width based on the length of the sequence we're playing.
    const numNotes = this.noteSequence.notes.length;
    const endTime = this.sequenceIsQuantized ?
        this.noteSequence.totalQuantizedSteps :
        this.noteSequence.totalTime;

    const width = (numNotes * this.config.noteSpacing) +
        (endTime * this.config.pixelsPerTimeStep);

    return {width, height};
  }

  private getNoteStartTime(note: NoteSequence.INote) {
    return this.sequenceIsQuantized ? note.quantizedStartStep : note.startTime;
  }

  private getNoteEndTime(note: NoteSequence.INote) {
    return this.sequenceIsQuantized ? note.quantizedEndStep : note.endTime;
  }

  private isPaintingActiveNote(
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
