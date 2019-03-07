import {tensorflow} from '../protobuf/proto';

import {constants} from '.';
// tslint:disable-next-line:max-line-length
import {BadTimeSignatureException, MultipleTempoException, MultipleTimeSignatureException, NegativeTimeException, QuantizationStatusException, quantizeToStep, stepsPerQuarterToStepsPerSecond,} from './note_sequence_utils';

/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
export class SimpleNote {
  // Basic properties.
  public pitch?: number;
  public velocity?: number;
  public instrument?: number;
  public program?: number;
  public isDrum?: boolean;
  public pitchName?: tensorflow.magenta.NoteSequence.PitchName;
  // Unquantized notes.
  public startTime?: number;
  public endTime?: number;
  // Quantized notes.
  public quantizedStartStep?: number;
  public quantizedEndStep?: number;

  constructor(note?: SimpleNote) {
    if (note) {
      this.pitch = note.pitch;
      this.pitchName = note.pitchName;
      this.velocity = note.velocity;
      this.instrument = note.instrument;
      this.program = note.program;
      this.isDrum = note.isDrum;
      this.startTime = note.startTime;
      this.endTime = note.endTime;
      this.quantizedStartStep = note.quantizedStartStep;
      this.quantizedEndStep = note.quantizedEndStep;
      this.pitchName = note.pitchName;
    }
  }
}

export class SimpleNoteSequence {
  public id?: string;
  public notes?: SimpleNote[];
  public totalTime?: number;
  public totalQuantizedSteps?: number;
  public ticksPerQuarter?: number;
  public timeSignatures?: tensorflow.magenta.NoteSequence.ITimeSignature[];
  public keySignatures?: tensorflow.magenta.NoteSequence.IKeySignature[];
  public tempos?: tensorflow.magenta.NoteSequence.ITempo[];
  public quantizationInfo?: tensorflow.magenta.NoteSequence.IQuantizationInfo;
  public pitchBends?: tensorflow.magenta.NoteSequence.IPitchBend[];
  public controlChanges?: tensorflow.magenta.NoteSequence.IControlChange[];

  /**
   * Constructs a new NoteSequence.
   * @param [properties] Properties to set
   */
  constructor(seq?: SimpleNoteSequence) {
    if (seq) {
      this.id = seq.id;
      this.notes = JSON.parse(JSON.stringify(seq.notes));
      this.totalTime = seq.totalTime;
      this.totalQuantizedSteps = seq.totalQuantizedSteps;
      this.ticksPerQuarter = seq.ticksPerQuarter;
      this.timeSignatures = JSON.parse(JSON.stringify(seq.timeSignatures));
      this.keySignatures = JSON.parse(JSON.stringify(seq.keySignatures));
      this.tempos = JSON.parse(JSON.stringify(seq.tempos));
      this.pitchBends = JSON.parse(JSON.stringify(seq.pitchBends));
      this.controlChanges = JSON.parse(JSON.stringify(seq.controlChanges));
    }
  }

  /**
   * Returns whether the given NoteSequence has been quantized by absolute time.
   */
  isAbsoluteQuantizedSequence() {
    return this.quantizationInfo && this.quantizationInfo.stepsPerSecond > 0;
  }

  /**
   * Confirms that the given NoteSequence has been quantized by absolute time.
   */
  assertIsAbsoluteQuantizedSequence() {
    if (!this.isAbsoluteQuantizedSequence()) {
      throw new QuantizationStatusException(`NoteSequence ${
          this.id} is not quantized or is quantized based on relative timing`);
    }
  }

  /**
   * Returns whether or not a NoteSequence proto has been quantized.
   */
  isQuantizedSequence() {
    return this.quantizationInfo &&
        (this.quantizationInfo.stepsPerQuarter > 0 ||
         this.quantizationInfo.stepsPerSecond > 0);
  }

  /**
   * Confirms that the given NoteSequence has been quantized.
   */
  assertIsQuantizedSequence() {
    if (!this.isQuantizedSequence()) {
      throw new QuantizationStatusException(`NoteSequence ${
          this.id} is not quantized (missing quantizationInfo)`);
    }
  }

  /**
   * Returns whether the given NoteSequence has been quantized relative to
   * tempo.
   */
  isRelativeQuantizedSequence() {
    return this.quantizationInfo && this.quantizationInfo.stepsPerQuarter > 0;
  }

  /**
   * Confirms that the given NoteSequence has been quantized relative to tempo.
   */
  assertIsRelativeQuantizedSequence() {
    if (!this.isRelativeQuantizedSequence()) {
      throw new QuantizationStatusException(`NoteSequence ${
          this.id} is not quantized or is quantized based on absolute timing`);
    }
  }

  /**
   * Confirms there is no tempo change.
   */
  assertSingleTempo() {
    if (!this.tempos || this.tempos.length === 0) {
      // There is a single (implicit) tempo.
      return;
    }
    this.tempos.sort((a, b) => a.time - b.time);
    // There is an implicit 120.0 qpm tempo at 0 time. So if the first tempo
    // is something other that 120.0 and it's at a time other than 0, that's
    // an implicit tempo change.
    if (this.tempos[0].time !== 0 &&
        this.tempos[0].qpm !== constants.DEFAULT_QUARTERS_PER_MINUTE) {
      throw new MultipleTempoException(
          'NoteSequence has an implicit tempo change from initial ' +
          `${constants.DEFAULT_QUARTERS_PER_MINUTE} qpm to ` +
          `${this.tempos[0].qpm} qpm at ${this.tempos[0].time} seconds.`);
    }

    for (let i = 1; i < this.tempos.length; i++) {
      if (this.tempos[i].qpm !== this.tempos[0].qpm) {
        throw new MultipleTempoException(
            'NoteSequence has at least one tempo change from ' +
            `${this.tempos[0].qpm} qpm to ${this.tempos[i].qpm}` +
            `qpm at ${this.tempos[i].time} seconds.`);
      }
    }
  }

  private isPowerOf2(n: number): boolean {
    return n && (n & (n - 1)) === 0;
  }
  /**
   * Quantize a NoteSequence proto relative to tempo.
   *
   * The input NoteSequence is copied and quantization-related fields are
   * populated. Sets the `steps_per_quarter` field in the `quantization_info`
   * message in the NoteSequence.
   *
   * Note start and end times, and chord times are snapped to a nearby quantized
   * step, and the resulting times are stored in a separate field (e.g.,
   * QuantizedStartStep). See the comments above `QUANTIZE_CUTOFF` for details
   * on how the quantizing algorithm works.
   *
   * @param stepsPerQuarter Each quarter note of music will be divided into
   *    this many quantized time steps.
   * @returns A copy of the original NoteSequence, with quantized times added.
   *
   * @throws {MultipleTempoException} If there is a change in tempo in
   * the sequence.
   * @throws {MultipleTimeSignatureException} If there is a change in time
   * signature in the sequence.
   * @throws {BadTimeSignatureException} If the time signature found in
   * the sequence has a 0 numerator or a denominator which is not a power of 2.
   * @throws {NegativeTimeException} If a note or chord occurs at a negative
   * time.
   */
  quantizeNoteSequence(stepsPerQuarter: number): SimpleNoteSequence {
    // Make a copy.
    const qns = new SimpleNoteSequence(this);

    qns.quantizationInfo.stepsPerQuarter = stepsPerQuarter;
    if (qns.timeSignatures.length > 0) {
      qns.timeSignatures.sort((a, b) => a.time - b.time);
      // There is an implicit 4/4 time signature at 0 time. So if the first time
      // signature is something other than 4/4 and it's at a time other than 0,
      // that's an implicit time signature change.
      if (qns.timeSignatures[0].time !== 0 &&
          !(qns.timeSignatures[0].numerator === 4 &&
            qns.timeSignatures[0].denominator === 4)) {
        throw new MultipleTimeSignatureException(
            'NoteSequence has an implicit change from initial 4/4 time ' +
            `signature to ${qns.timeSignatures[0].numerator}/` +
            `${qns.timeSignatures[0].denominator} at ` +
            `${qns.timeSignatures[0].time} seconds.`);
      }

      for (let i = 1; i < qns.timeSignatures.length; i++) {
        const timeSignature = qns.timeSignatures[i];
        if (timeSignature.numerator !== qns.timeSignatures[0].numerator ||
            timeSignature.denominator !== qns.timeSignatures[0].denominator) {
          throw new MultipleTimeSignatureException(
              'NoteSequence has at least one time signature change from ' +
              `${qns.timeSignatures[0].numerator}/` +
              `${qns.timeSignatures[0].denominator} to ` +
              `${timeSignature.numerator}/${timeSignature.denominator} ` +
              `at ${timeSignature.time} seconds`);
        }
      }

      // Make it clear that there is only 1 time signature and it starts at the
      // beginning.
      qns.timeSignatures[0].time = 0;
      qns.timeSignatures = [qns.timeSignatures[0]];
    } else {
      qns.timeSignatures.push({numerator: 4, denominator: 4, time: 0});
    }

    const firstTS = qns.timeSignatures[0];
    if (!this.isPowerOf2(firstTS.denominator)) {
      throw new BadTimeSignatureException(
          'Denominator is not a power of 2. Time signature: ' +
          `${firstTS.numerator}/${firstTS.denominator}`);
    }

    if (firstTS.numerator === 0) {
      throw new BadTimeSignatureException(
          'Numerator is 0. Time signature: ' +
          `${firstTS.numerator}/${firstTS.denominator}`);
    }

    if (qns.tempos.length > 0) {
      qns.assertSingleTempo();

      // Make it clear that there is only 1 tempo and it starts at the beginning
      qns.tempos[0].time = 0;
      qns.tempos = [qns.tempos[0]];
    } else {
      qns.tempos.push({qpm: constants.DEFAULT_QUARTERS_PER_MINUTE, time: 0});
    }

    // Compute quantization steps per second.
    const stepsPerSecond =
        stepsPerQuarterToStepsPerSecond(stepsPerQuarter, qns.tempos[0].qpm);

    qns.totalQuantizedSteps = quantizeToStep(this.totalTime, stepsPerSecond);
    this.quantizeNotesAndEvents(stepsPerSecond);

    // return qns
    return qns;
  }

  /**
   * Create an unquantized version of a quantized `NoteSequence`.
   *
   * Any existing times will be replaced in the output `NoteSequence` and
   * quantization info and steps will be removed.
   *
   * @param qpm The tempo to use. If not provided, the sequence's tempo is used,
   * or the default of 120 if it is not specified in the sequence either.
   * @returns a new non-quantized `NoteSequence` wih time in seconds.
   */
  unquantizeSequence(qpm?: number) {
    // TODO(adarob): Support absolute quantized times and multiple tempos.
    this.assertIsRelativeQuantizedSequence();
    this.assertSingleTempo();

    const ns = new SimpleNoteSequence(this);

    if (qpm) {
      if (ns.tempos && ns.tempos.length > 0) {
        ns.tempos[0].qpm = qpm;
      } else {
        ns.tempos.push({time: 0, qpm});
      }
    } else {
      qpm = (this.tempos && this.tempos.length > 0) ?
          ns.tempos[0].qpm :
          constants.DEFAULT_QUARTERS_PER_MINUTE;
    }

    const stepToSeconds = (step: number) =>
        step / ns.quantizationInfo.stepsPerQuarter * (60 / qpm);
    ns.totalTime = stepToSeconds(ns.totalQuantizedSteps);
    ns.notes.forEach(n => {
      // Quantize the start and end times of the note.
      n.startTime = stepToSeconds(n.quantizedStartStep);
      n.endTime = stepToSeconds(n.quantizedEndStep);
      // Extend sequence if necessary.
      ns.totalTime = Math.max(ns.totalTime, n.endTime);
    });

    // Also quantize control changes and text annotations.
    this.getQuantizedTimeEvents().forEach(event => {
      // Quantize the event time, disallowing negative time.
      event.time = stepToSeconds(event.time);
    });
    return ns;
  }

  /**
   * Returns a list of events with a `time` and `quantizedStep` properties.
   */
  private getQuantizedTimeEvents() {
    return this.controlChanges;
  }

  /**
   * Quantize the notes and events of a NoteSequence proto in place.
   * Note start and end times, and chord times are snapped to a nearby
   * quantized step, and the resulting times are stored in a separate field
   * (e.g. QuantizedStartStep). See the comments above `QUANTIZE_CUTOFF` for
   * details on how the quantizing algorithm works.
   * @param stepsPerSecond Each second will be divided into this many
   * quantized time steps.
   */
  private quantizeNotesAndEvents(stepsPerSecond: number) {
    for (const note of this.notes) {
      // Quantize the start and end times of the note.
      note.quantizedStartStep = quantizeToStep(note.startTime, stepsPerSecond);
      note.quantizedEndStep = quantizeToStep(note.endTime, stepsPerSecond);
      if (note.quantizedEndStep === note.quantizedStartStep) {
        note.quantizedEndStep += 1;
      }

      // Do not allow notes to start or end in negative time.
      if (note.quantizedStartStep < 0 || note.quantizedEndStep < 0) {
        throw new NegativeTimeException(
            `Got negative note time: start_step = ` +
            `${note.quantizedStartStep}, end_step = ` +
            `${note.quantizedEndStep}`);
      }

      // Extend quantized sequence if necessary.
      if (note.quantizedEndStep > this.totalQuantizedSteps) {
        this.totalQuantizedSteps = note.quantizedEndStep;
      }
    }

    // Also quantize control changes and text annotations.
    this.getQuantizedTimeEvents().forEach(event => {
      // Quantize the event time, disallowing negative time.
      event.quantizedStep = quantizeToStep(event.time, stepsPerSecond);
      if (event.quantizedStep < 0) {
        throw new NegativeTimeException(
            `Got negative event time: step = ${event.quantizedStep}`);
      }
    });
  }
}
