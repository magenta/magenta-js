/**
 * Module for loading and playing SoundFont instrument samples.
 *
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
 * Imports
 */
import * as Tone from 'tone';
import * as constants from './constants';

/**
 * Instrument sample pitch and velocity.
 */
export interface SampleInfo {
  pitch: number;
  velocity: number;
}

/**
 * Specification for a sampled instrument. Samples must exist for all pitches
 * between `minPitch` and `maxPitch` at all velocities in `velocities` (unless
 * `velocities` is undefined, in which case only a single sample exists for each
 * pitch). Each sample consists of a note sustained for `durationSeconds` then
 * released, ending after `releaseSeconds` additional seconds.
 *
 * @param name Name of the instrument.
 * @param minPitch The minimum MIDI pitch sampled.
 * @param maxPitch The maximum MIDI pitch sampled.
 * @param durationSeconds Length of each sample in seconds, not including the
 * release.
 * @param releaseSeconds Length of the release for each sample in seconds.
 * @param percussive If true, the sample is considered percussive and will
 * always be played in its entirety.
 * @param velocities (Optional) The set of velocities sampled.
 */
export interface InstrumentSpec {
  name: string;
  minPitch: number;
  maxPitch: number;
  durationSeconds: number;
  releaseSeconds: number;
  percussive: boolean;
  velocities?: number[];
}

/**
 * Sampled instrument. Must be initialized and samples must be pre-loaded using
 * the `loadSamples` method before any notes can be played.
 */
export class Instrument {
  private FADE_SECONDS = 0.1;

  private readonly baseURL: string;
  private readonly buffers: any;  // tslint:disable-line:no-any

  private initialized: boolean;

  name: string;
  minPitch: number;
  maxPitch: number;
  durationSeconds: number;
  releaseSeconds: number;
  percussive: boolean;
  velocities?: number[];

  /**
   * `Instrument` constructor.
   *
   * @param baseURL Path to the instrument directory.
   */
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.buffers = new Tone.Buffers([]);
    this.initialized = false;
  }

  /**
   * Loads instrument configuration from an `instrument.json` file in the base
   * URL directory. Does not load any of the samples.
   */
  async initialize() {
    await fetch(`${this.baseURL}/instrument.json`)
        .then((response) => response.json())
        .then((spec: InstrumentSpec) => {
          this.name = spec.name;
          this.minPitch = spec.minPitch;
          this.maxPitch = spec.maxPitch;
          this.durationSeconds = spec.durationSeconds;
          this.releaseSeconds = spec.releaseSeconds;
          this.percussive = spec.percussive;
          this.velocities = spec.velocities;
          this.initialized = true;
        });
  }

  /**
   * Map pitch and velocity to sample name.
   */
  private sampleInfoToName(sampleInfo: SampleInfo) {
    if (this.velocities) {
      return `p${sampleInfo.pitch}_v${sampleInfo.velocity}`;
    } else {
      return `p${sampleInfo.pitch}`;
    }
  }

  /**
   * Map pitch and velocity to sample URL.
   */
  private sampleInfoToURL(sampleInfo: SampleInfo) {
    return `${this.baseURL}/${this.sampleInfoToName(sampleInfo)}.mp3`;
  }

  /**
   * Find nearest sampled velocity to a target velocity.
   */
  private nearestVelocity(velocity: number): number {
    if (!this.velocities) {
      return velocity;
    }

    let bestVelocity = undefined;
    let bestDistance = constants.MIDI_VELOCITIES;
    this.velocities.forEach((v) => {
      const d = Math.abs(v - velocity);
      if (d < bestDistance) {
        bestVelocity = v;
        bestDistance = d;
      }
    });
    return bestVelocity;
  }

  /**
   * Load samples necessary to play a set of pitch/velocity pairs. This must be
   * called before any notes can be played.
   *
   * @param samples Array of pitch/velocity pairs.
   */
  async loadSamples(samples: SampleInfo[]) {
    if (!this.initialized) {
      await this.initialize();
    }

    const nearestSamples = Array.from(new Set(
        samples
            .filter((info) => {
              if (info.pitch < this.minPitch || info.pitch > this.maxPitch) {
                console.log(
                    `Pitch ${info.pitch} is outside the valid range for ${
                        this.name}, ignoring.`);
                return false;
              } else {
                return true;
              }
            })
            .map((info) => ({
                   pitch: info.pitch,
                   velocity: this.nearestVelocity(info.velocity)
                 }))));

    const sampleNamesAndURLs =
        nearestSamples
            .map((info) => ({
                   name: this.sampleInfoToName(info),
                   url: this.sampleInfoToURL(info)
                 }))
            .filter((nameAndURL) => !this.buffers.has(nameAndURL.name));

    sampleNamesAndURLs.forEach(
        (nameAndURL) => this.buffers.add(nameAndURL.name, nameAndURL.url));

    await new Promise(resolve => Tone.Buffer.on('load', resolve));

    sampleNamesAndURLs.forEach(
        (nameAndURL) =>
            console.log(`Loaded ${nameAndURL.name} for ${this.name}.`));
  }

  /**
   * Play a note using one of the samples.
   *
   * @param pitch Pitch of the note.
   * @param velocity Velocity of the note.
   * @param startTime Time at which to start playing the note.
   * @param duration Length of the note in seconds.
   */
  playNote(
      pitch: number, velocity: number, startTime: number, duration: number) {
    if (!this.initialized) {
      throw new Error('Instrument is not initialized.');
    }
    if (pitch < this.minPitch || pitch > this.maxPitch) {
      console.log(`Pitch ${pitch} is outside the valid range for ${
          this.name} (${this.minPitch}-${this.maxPitch})`);
      return;
    }

    const name = this.sampleInfoToName(
        {pitch, velocity: this.nearestVelocity(velocity)});
    if (!this.buffers.has(name)) {
      throw new Error(`Buffer not found for ${this.name}: ${name}`);
    }

    const buffer = this.buffers.get(name);
    if (!buffer.loaded) {
      throw new Error(`Buffer not loaded for ${this.name}: ${name}`);
    }

    if (duration > this.durationSeconds) {
      console.log(`Requested note duration longer than sample duration: ${
          duration} > ${this.durationSeconds}`);
    }

    const source = new Tone.BufferSource(buffer).toMaster();
    source.start(startTime, 0, undefined, 1, 0);
    if (!this.percussive && duration < this.durationSeconds) {
      // Fade to the note release.
      const releaseSource = new Tone.BufferSource(buffer).toMaster();
      source.stop(startTime + duration + this.FADE_SECONDS, this.FADE_SECONDS);
      releaseSource.start(
          startTime + duration, this.durationSeconds, undefined, 1,
          this.FADE_SECONDS);
    }
  }
}

/**
 * Program and drum status for instrument.
 */
export interface InstrumentInfo {
  program: number;
  isDrum: boolean;
}

/**
 * Mapping from program number to instrument name.
 */
export interface InstrumentsSpec {
  [program: number]: string;
  drums?: string;
}

/**
 * Specification for a SoundFont. A "SoundFont" as used here refers not to a
 * `.sf2` file but to a set of sampled instruments, each in its own
 * subdirectory. Each instrument subdirectory contains samples for every pitch
 * within a specified range, with a single velocity or a specified set of
 * velocities.
 *
 * @param name Name of the SoundFont.
 * @param instruments Mapping from program number to instrument name (and
 * subdirectory).
 */
export interface SoundFontSpec {
  name: string;
  instruments: InstrumentsSpec;
}

/**
 * Multi-instrument SoundFont. Must be initialized and samples must be
 * pre-loaded using the `loadSamples` method before any notes can be played.
 */
export class SoundFont {
  private readonly baseURL: string;
  private readonly instruments: Map<number|'drums', Instrument>;

  private initialized: boolean;

  name: string;

  /**
   * `SoundFont` constructor.
   *
   * @param baseURL Path to the SoundFont directory.
   */
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instruments = new Map<number|'drums', Instrument>();
    this.initialized = false;
  }

  /**
   * Loads SoundFont configuration from a `soundfont.json` file in the base URL
   * directory. Does not load any of the samples.
   */
  async initialize() {
    await fetch(`${this.baseURL}/soundfont.json`)
        .then((response) => response.json())
        .then((spec: SoundFontSpec) => {
          this.name = spec.name;
          for (const program in spec.instruments) {
            const url = `${this.baseURL}/${spec.instruments[program]}`;
            this.instruments.set(
                program === 'drums' ? 'drums' : +program, new Instrument(url));
          }
          this.initialized = true;
        });
  }

  /**
   * Load samples necessary to play a set of notes. This must be called before
   * any notes can be played.
   *
   * @param samples Array of program/isDrum/pitch/velocity for notes that will
   * be loaded.
   */
  async loadSamples(samples: Array<InstrumentInfo&SampleInfo>) {
    if (!this.initialized) {
      await this.initialize();
    }

    const instrumentSamples = new Map<number|'drums', SampleInfo[]>();
    samples.forEach((info) => {
      const instrument = info.isDrum ? 'drums' : info.program;
      const sampleInfo = {pitch: info.pitch, velocity: info.velocity};
      if (!instrumentSamples.has(instrument)) {
        if (!this.instruments.has(instrument)) {
          console.log(`No instrument in ${this.name} for: program=${
              info.program}, isDrum=${info.isDrum}`);
        } else {
          instrumentSamples.set(instrument, [sampleInfo]);
        }
      } else {
        instrumentSamples.get(instrument).push(sampleInfo);
      }
    });

    await Promise.all(Array.from(instrumentSamples.keys())
                          .map(
                              (info) => this.instruments.get(info).loadSamples(
                                  instrumentSamples.get(info))));
  }

  /**
   * Play a note using one of the sampled instruments.
   *
   * @param pitch Pitch of the note.
   * @param velocity Velocity of the note.
   * @param startTime Time at which to start playing the note.
   * @param duration Length of the note in seconds.
   * @param program Program number to use for instrument lookup.
   * @param isDrum Drum status to use for instrument lookup.
   */
  playNote(
      pitch: number, velocity: number, startTime: number, duration: number,
      program: number, isDrum: boolean) {
    const instrument = isDrum ? 'drums' : program;
    if (!this.initialized) {
      throw new Error('SoundFont is not initialized.');
    }
    if (!this.instruments.has(instrument)) {
      console.log(`No instrument in ${this.name} for: program=${
          program}, isDrum=${isDrum}`);
      return;
    }

    this.instruments.get(instrument)
        .playNote(pitch, velocity, startTime, duration);
  }
}
