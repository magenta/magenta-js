import * as Tone from 'tone';
import { fetch } from '../core/compat/global';
import * as constants from './constants';
import * as logging from './logging';
export class Instrument {
    constructor(baseURL) {
        this.FADE_SECONDS = 0.1;
        this.baseURL = baseURL;
        this.buffers = new Tone.ToneAudioBuffers();
        this.sourceMap = new Map();
        this.initialized = false;
    }
    async initialize() {
        await fetch(`${this.baseURL}/instrument.json`)
            .then((response) => response.json())
            .then((spec) => {
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
    sampleInfoToName(sampleInfo) {
        if (this.velocities) {
            return `p${sampleInfo.pitch}_v${sampleInfo.velocity}`;
        }
        else {
            return `p${sampleInfo.pitch}`;
        }
    }
    sampleNameToURL(name) {
        return `${this.baseURL}/${name}.mp3`;
    }
    nearestVelocity(velocity) {
        if (!this.velocities) {
            return velocity;
        }
        if (!velocity) {
            velocity = constants.DEFAULT_VELOCITY;
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
    async loadSamples(samples) {
        if (!this.initialized) {
            await this.initialize();
        }
        const nearestSampleNames = samples
            .filter((info) => {
            if (info.pitch < this.minPitch || info.pitch > this.maxPitch) {
                logging.log(`Pitch ${info.pitch} is outside the valid range for ${this.name}, ignoring.`, 'SoundFont');
                return false;
            }
            else {
                return true;
            }
        })
            .map((info) => this.sampleInfoToName({
            pitch: info.pitch,
            velocity: this.nearestVelocity(info.velocity)
        }));
        const uniqueSampleNames = Array.from(new Set(nearestSampleNames))
            .filter((name) => !this.buffers.has(name));
        const sampleNamesAndURLs = uniqueSampleNames.map((name) => ({ name, url: this.sampleNameToURL(name) }));
        if (sampleNamesAndURLs.length > 0) {
            sampleNamesAndURLs.forEach((nameAndURL) => this.buffers.add(nameAndURL.name, nameAndURL.url));
            await Tone.loaded();
            logging.log(`Loaded samples for ${this.name}.`, 'SoundFont');
        }
    }
    playNote(pitch, velocity, startTime, duration, output) {
        const buffer = this.getBuffer(pitch, velocity);
        if (duration > this.durationSeconds) {
            logging.log(`Requested note duration longer than sample duration: ${duration} > ${this.durationSeconds}`, 'SoundFont');
        }
        const source = new Tone
            .ToneBufferSource({
            url: buffer,
            fadeOut: this.FADE_SECONDS,
        })
            .connect(output);
        source.start(startTime, 0, undefined, 1);
        if (!this.percussive && duration < this.durationSeconds) {
            const releaseSource = new Tone
                .ToneBufferSource({
                url: buffer,
                fadeOut: this.FADE_SECONDS,
            })
                .connect(output);
            source.stop(startTime + duration + this.FADE_SECONDS);
            releaseSource.start(startTime + duration, this.durationSeconds, undefined, 1);
        }
    }
    playNoteDown(pitch, velocity, output) {
        const buffer = this.getBuffer(pitch, velocity);
        const source = new Tone.ToneBufferSource(buffer).connect(output);
        source.start(0, 0, undefined, 1);
        if (this.sourceMap.has(pitch)) {
            this.sourceMap.get(pitch).stop(Tone.now() + this.FADE_SECONDS, this.FADE_SECONDS);
        }
        this.sourceMap.set(pitch, source);
    }
    playNoteUp(pitch, velocity, output) {
        if (!this.sourceMap.has(pitch)) {
            return;
        }
        const buffer = this.getBuffer(pitch, velocity);
        const releaseSource = new Tone
            .ToneBufferSource({
            url: buffer,
            fadeOut: this.FADE_SECONDS,
        })
            .connect(output);
        releaseSource.start(0, this.durationSeconds, undefined, 1);
        this.sourceMap.get(pitch).stop(Tone.now() + this.FADE_SECONDS, this.FADE_SECONDS);
        this.sourceMap.delete(pitch);
    }
    getBuffer(pitch, velocity) {
        if (!this.initialized) {
            throw new Error('Instrument is not initialized.');
        }
        if (pitch < this.minPitch || pitch > this.maxPitch) {
            logging.log(`Pitch ${pitch} is outside the valid range for ${this.name} (${this.minPitch}-${this.maxPitch})`, 'SoundFont');
            return;
        }
        const name = this.sampleInfoToName({ pitch, velocity: this.nearestVelocity(velocity) });
        if (!this.buffers.has(name)) {
            throw new Error(`Buffer not found for ${this.name}: ${name}`);
        }
        const buffer = this.buffers.get(name);
        if (!buffer.loaded) {
            throw new Error(`Buffer not loaded for ${this.name}: ${name}`);
        }
        return buffer;
    }
}
export class SoundFont {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.instruments = new Map();
        this.initialized = false;
    }
    async initialize() {
        await fetch(`${this.baseURL}/soundfont.json`)
            .then((response) => response.json())
            .then((spec) => {
            this.name = spec.name;
            for (const program in spec.instruments) {
                const url = `${this.baseURL}/${spec.instruments[program]}`;
                this.instruments.set(program === 'drums' ? 'drums' : +program, new Instrument(url));
            }
            this.initialized = true;
        });
    }
    async loadSamples(samples) {
        if (!this.initialized) {
            await this.initialize();
        }
        const instrumentSamples = new Map();
        samples.forEach((info) => {
            info.isDrum = info.isDrum || false;
            info.program = info.program || 0;
            const instrument = info.isDrum ? 'drums' : info.program;
            const sampleInfo = { pitch: info.pitch, velocity: info.velocity };
            if (!instrumentSamples.has(instrument)) {
                if (!this.instruments.has(instrument)) {
                    logging.log(`No instrument in ${this.name} for: program=${info.program}, isDrum=${info.isDrum}`, 'SoundFont');
                }
                else {
                    instrumentSamples.set(instrument, [sampleInfo]);
                }
            }
            else {
                instrumentSamples.get(instrument).push(sampleInfo);
            }
        });
        await Promise.all(Array.from(instrumentSamples.keys())
            .map((info) => this.instruments.get(info).loadSamples(instrumentSamples.get(info))));
    }
    playNote(pitch, velocity, startTime, duration, program = 0, isDrum = false, output) {
        const instrument = isDrum ? 'drums' : program;
        if (!this.initialized) {
            throw new Error('SoundFont is not initialized.');
        }
        if (!this.instruments.has(instrument)) {
            logging.log(`No instrument in ${this.name} for: program=${program}, isDrum=${isDrum}`, 'SoundFont');
            return;
        }
        this.instruments.get(instrument)
            .playNote(pitch, velocity, startTime, duration, output);
    }
    playNoteDown(pitch, velocity, program = 0, isDrum = false, output) {
        const instrument = isDrum ? 'drums' : program;
        if (!this.initialized) {
            throw new Error('SoundFont is not initialized.');
        }
        if (!this.instruments.has(instrument)) {
            logging.log(`No instrument in ${this.name} for: program=${program}, isDrum=${isDrum}`, 'SoundFont');
            return;
        }
        this.instruments.get(instrument).playNoteDown(pitch, velocity, output);
    }
    playNoteUp(pitch, velocity, program = 0, isDrum = false, output) {
        const instrument = isDrum ? 'drums' : program;
        if (!this.initialized) {
            throw new Error('SoundFont is not initialized.');
        }
        if (!this.instruments.has(instrument)) {
            logging.log(`No instrument in ${this.name} for: program=${program}, isDrum=${isDrum}`, 'SoundFont');
            return;
        }
        this.instruments.get(instrument).playNoteUp(pitch, velocity, output);
    }
}
//# sourceMappingURL=soundfont.js.map