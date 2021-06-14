import * as Tone from 'tone';
const QUARTERS_PER_BAR = 4;
export class MetronomeCallbackObject {
}
export class Metronome {
    constructor(callbackObject, clicksPerQuarter = 1) {
        this.clicksPerQuarter = 1;
        this.muted = false;
        this.loClick = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.001, decay: 0.3, sustain: 0 },
        })
            .toDestination();
        this.hiClick = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.001, decay: 0.3, sustain: 0 },
        })
            .toDestination();
        this.loClickNote = 'c5';
        this.hiClickNote = 'g5';
        this.ticking = false;
        this.startedAt = null;
        this.step = -1;
        this.reset();
        this.callbackObject = callbackObject;
        this.clicksPerQuarter = clicksPerQuarter;
    }
    isTicking() {
        return this.ticking;
    }
    getStartedAt() {
        return this.startedAt;
    }
    getOffsetTime() {
        return Tone.immediate() - this.startedAt;
    }
    start(bpm = 120) {
        this.reset();
        this.ticking = true;
        if (!this.callbackObject.click) {
            this.callbackObject.click = () => { };
        }
        if (!this.callbackObject.quarter) {
            this.callbackObject.quarter = () => { };
        }
        if (!this.callbackObject.bar) {
            this.callbackObject.bar = () => { };
        }
        let bar = 0;
        const clicksInBar = QUARTERS_PER_BAR * this.clicksPerQuarter;
        Tone.Transport.scheduleRepeat((time) => {
            if (!this.startedAt) {
                this.startedAt = time;
            }
            const offsetTime = time - this.startedAt;
            this.step++;
            const clickInBar = this.step % clicksInBar;
            const clickInQuarter = Math.floor(clickInBar / this.clicksPerQuarter);
            const quarter = clickInBar % this.clicksPerQuarter;
            this.callbackObject.click(offsetTime, clickInBar);
            if (quarter === 0) {
                this.callbackObject.quarter(offsetTime, clickInQuarter);
            }
            if (!this.muted) {
                if (clickInBar === 0) {
                    this.hiClick.triggerAttack(this.hiClickNote, time, 0.1);
                }
                else {
                    this.loClick.triggerAttack(this.loClickNote, time, 0.1);
                }
            }
            if (clickInBar === 0) {
                this.callbackObject.bar(offsetTime, bar);
                bar++;
            }
        }, `${clicksInBar}n`);
        Tone.Transport.bpm.value = bpm;
        Tone.Transport.start();
    }
    stop() {
        this.ticking = false;
        Tone.Transport.cancel();
        Tone.Transport.stop();
    }
    reset() {
        this.muted = false;
        this.ticking = false;
        this.step = -1;
        this.startedAt = null;
    }
}
//# sourceMappingURL=metronome.js.map