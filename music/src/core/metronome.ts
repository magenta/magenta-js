/**
 * A module containing a basic metronome based on Tone.js. The metronome speed
 * and click sound can be configured, and if fires callbacks for every audible
 * click, quarter and bar marks.
 *
 * @license
 * Copyright 2012 Google Inc. All Rights Reserved.
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

// @ts-ignore
import * as Tone from 'tone';
const QUARTERS_PER_BAR = 4;

/**
 * An abstract base class for providing arbitrary callbacks for the metronome.
 */
export abstract class MetronomeCallbackObject {
  /**
   * Will be called for every audible click made. There will be
   * `clicksPerQuarter` of this callback for every quarter() callback.
   *
   * @param time The offset time from the metronome's start.
   * @param index The index of the click in the bar (0 <= index <
   * 4 * `clicksPerQuarter`).
   */
  abstract click(time: number, index: number): void;

  /**
   * Will be called for every quarter note that has clicked. There will be
   * 4 of this callback for every bar() callback.
   *
   * @param time The offset time from the metronome's start.
   * @param index The index of the quarter in the bar (0 <= index < 4).
   */
  abstract quarter(time: number, index: number): void;

  /**
   * Will be called for every bar that has clicked.
   *
   * @param time The offset time from the metronome's start.
   * @param index The index of the bar (0 <= index).
   */
  abstract bar(time: number, index: number): void;
}

/**
 * A Metronome based on Tone.js
 */
export class Metronome {
  public clicksPerQuarter = 1;
  public muted = false;
  private ticking = false;
  private startedAt: number = null;
  private step = -1;
  private callbackObject: MetronomeCallbackObject;
  private loClick = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.001, decay: 0.3, sustain: 0}
                        })
                        .toMaster();
  private hiClick = new Tone
                        .MembraneSynth({
                          pitchDecay: 0.008,
                          envelope: {attack: 0.001, decay: 0.3, sustain: 0}
                        })
                        .toMaster();

  /**
   *   `Metronome` constructor.
   *
   *   @param callbackObject An MetronomeCallback object that contains
   *   click(), quarter() and bar() methods to be called during the
   *   metronome run time.
   *   @param clicksPerQuarter The number of clicks the metronome should make
   *   per quarter. For example, if clicksPerQuarter=1, then the metronome
   *   will click on every quarter note, but if clicksPerQuarter = 4, the
   *   metronome will make audible clicks on every sixteenth note.
   */
  constructor(callbackObject: MetronomeCallbackObject, clicksPerQuarter = 1) {
    this.reset();
    this.callbackObject = callbackObject;
    this.clicksPerQuarter = clicksPerQuarter;
  }

  /**
   * Returns true if the metronome has been started.
   */
  isTicking() {
    return this.ticking;
  }

  /**
   * Returns the time at which the metronome was started at.
   */
  getStartedAt() {
    return this.startedAt;
  }

  /**
   * Returns the time elapsed from when the metronome started.
   */
  getOffsetTime() {
    return Tone.immediate() - this.startedAt;
  }

  /**
   * Starts the metronome with the provided bpm.
   */
  start(bpm = 120) {
    this.reset();
    this.ticking = true;

    // If some of the callback functions aren't provided, default them
    // to empty functions.
    if (!this.callbackObject.click) {
      this.callbackObject.click = () => {};
    }
    if (!this.callbackObject.quarter) {
      this.callbackObject.quarter = () => {};
    }
    if (!this.callbackObject.bar) {
      this.callbackObject.bar = () => {};
    }

    let bar = 0;
    const clicksInBar = QUARTERS_PER_BAR * this.clicksPerQuarter;

    Tone.Transport.scheduleRepeat((time: number) => {
      if (!this.startedAt) {
        this.startedAt = time;
      }

      const offsetTime = time - this.startedAt;
      this.step++;

      // Figure out which click and quarter this is.
      const clickInBar = this.step % clicksInBar;
      const clickInQuarter = Math.floor(clickInBar / this.clicksPerQuarter);
      const quarter = clickInBar % this.clicksPerQuarter;

      // Every click...
      this.callbackObject.click(offsetTime, clickInBar);

      // Every quarter...
      if (quarter === 0) {
        this.callbackObject.quarter(offsetTime, clickInQuarter);

        if (!this.muted) {
          if (clickInBar === 0) {
            this.hiClick.triggerAttack('g5', time, 0.1);
          } else {
            this.loClick.triggerAttack('c5', time, 0.1);
          }
        }
      }

      // Every bar...
      if (clickInBar === 0) {
        this.callbackObject.bar(offsetTime, bar);
        bar++;
      }
    }, `${clicksInBar}n`);

    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();
  }

  /**
   * Stops the metronome.
   */
  stop() {
    this.ticking = false;
    Tone.Transport.cancel();
    Tone.Transport.stop();
  }

  private reset() {
    this.muted = false;
    this.ticking = false;
    this.step = -1;
    this.startedAt = null;
  }
}
