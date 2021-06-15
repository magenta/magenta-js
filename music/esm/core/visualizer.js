import * as sr from 'staffrender';
import { MAX_MIDI_PITCH, MIN_MIDI_PITCH } from './constants';
import * as logging from './logging';
import * as sequences from './sequences';
const MIN_NOTE_LENGTH = 1;
export class BaseVisualizer {
    constructor(sequence, config = {}) {
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
        if (this.sequenceIsQuantized) {
            const spq = sequence.quantizationInfo.stepsPerQuarter;
            this.config.pixelsPerTimeStep =
                spq ? this.config.pixelsPerTimeStep / spq : 7;
        }
        const size = this.getSize();
        this.width = size.width;
        this.height = size.height;
    }
    updateMinMaxPitches(noExtraPadding = false) {
        if (this.config.minPitch && this.config.maxPitch) {
            return;
        }
        if (this.config.minPitch === undefined) {
            this.config.minPitch = MAX_MIDI_PITCH;
        }
        if (this.config.maxPitch === undefined) {
            this.config.maxPitch = MIN_MIDI_PITCH;
        }
        for (const note of this.noteSequence.notes) {
            this.config.minPitch = Math.min(note.pitch, this.config.minPitch);
            this.config.maxPitch = Math.max(note.pitch, this.config.maxPitch);
        }
        if (!noExtraPadding) {
            this.config.minPitch -= 2;
            this.config.maxPitch += 2;
        }
    }
    getSize() {
        this.updateMinMaxPitches();
        const height = (this.config.maxPitch - this.config.minPitch) * this.config.noteHeight;
        const endTime = this.sequenceIsQuantized ?
            this.noteSequence.totalQuantizedSteps :
            this.noteSequence.totalTime;
        if (!endTime) {
            throw new Error('The sequence you are using with the visualizer does not have a ' +
                (this.sequenceIsQuantized ? 'totalQuantizedSteps' : 'totalTime') +
                ' field set, so the visualizer can\'t be horizontally ' +
                'sized correctly.');
        }
        const width = (endTime * this.config.pixelsPerTimeStep);
        return { width, height };
    }
    getNotePosition(note, noteIndex) {
        const duration = this.getNoteEndTime(note) - this.getNoteStartTime(note);
        const x = (this.getNoteStartTime(note) * this.config.pixelsPerTimeStep);
        const w = Math.max(this.config.pixelsPerTimeStep * duration - this.config.noteSpacing, MIN_NOTE_LENGTH);
        const y = this.height -
            ((note.pitch - this.config.minPitch) * this.config.noteHeight);
        return { x, y, w, h: this.config.noteHeight };
    }
    scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition) {
        if (scrollIntoView && this.parentElement) {
            const containerWidth = this.parentElement.getBoundingClientRect().width;
            if (activeNotePosition >
                (this.parentElement.scrollLeft + containerWidth)) {
                this.parentElement.scrollLeft = activeNotePosition - 20;
            }
        }
    }
    getNoteStartTime(note) {
        return this.sequenceIsQuantized ?
            note.quantizedStartStep :
            Math.round(note.startTime * 100000000) / 100000000;
    }
    getNoteEndTime(note) {
        return this.sequenceIsQuantized ?
            note.quantizedEndStep :
            Math.round(note.endTime * 100000000) / 100000000;
    }
    isPaintingActiveNote(note, playedNote) {
        const isPlayedNote = this.getNoteStartTime(note) === this.getNoteStartTime(playedNote);
        const heldDownDuringPlayedNote = this.getNoteStartTime(note) <= this.getNoteStartTime(playedNote) &&
            this.getNoteEndTime(note) >= this.getNoteEndTime(playedNote);
        return isPlayedNote || heldDownDuringPlayedNote;
    }
}
export class PianoRollCanvasVisualizer extends BaseVisualizer {
    constructor(sequence, canvas, config = {}) {
        super(sequence, config);
        this.ctx = canvas.getContext('2d');
        this.parentElement = canvas.parentElement;
        const dpr = window.devicePixelRatio || 1;
        if (this.ctx) {
            this.ctx.canvas.width = dpr * this.width;
            this.ctx.canvas.height = dpr * this.height;
            canvas.style.width = `${this.width}px`;
            canvas.style.height = `${this.height}px`;
            this.ctx.scale(dpr, dpr);
        }
        this.redraw();
    }
    redraw(activeNote, scrollIntoView) {
        this.clear();
        let activeNotePosition;
        for (let i = 0; i < this.noteSequence.notes.length; i++) {
            const note = this.noteSequence.notes[i];
            const size = this.getNotePosition(note, i);
            const opacityBaseline = 0.2;
            const opacity = note.velocity ? note.velocity / 100 + opacityBaseline : 1;
            const isActive = activeNote && this.isPaintingActiveNote(note, activeNote);
            const fill = `rgba(${isActive ? this.config.activeNoteRGB : this.config.noteRGB},
  ${opacity})`;
            this.redrawNote(size.x, size.y, size.w, size.h, fill);
            if (isActive && note === activeNote) {
                activeNotePosition = size.x;
            }
        }
        this.scrollIntoViewIfNeeded(scrollIntoView, activeNotePosition);
        return activeNotePosition;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    clearActiveNotes() {
        this.redraw();
    }
    redrawNote(x, y, w, h, fill) {
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    }
}
export class Visualizer extends PianoRollCanvasVisualizer {
    constructor(sequence, canvas, config = {}) {
        super(sequence, canvas, config);
        logging.log('mm.Visualizer is deprecated, and will be removed in a future \
         version. Please use mm.PianoRollCanvasVisualizer instead', 'mm.Visualizer', 5);
    }
}
export class BaseSVGVisualizer extends BaseVisualizer {
    constructor(sequence, config = {}) {
        super(sequence, config);
        this.drawn = false;
    }
    redraw(activeNote, scrollIntoView) {
        if (!this.drawn) {
            this.draw();
        }
        if (!activeNote) {
            return null;
        }
        this.unfillActiveRect(this.svg);
        let activeNotePosition;
        for (let i = 0; i < this.noteSequence.notes.length; i++) {
            const note = this.noteSequence.notes[i];
            const isActive = activeNote && this.isPaintingActiveNote(note, activeNote);
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
    fillActiveRect(el, note) {
        el.setAttribute('fill', this.getNoteFillColor(note, true));
        el.classList.add('active');
    }
    unfillActiveRect(svg) {
        const els = svg.querySelectorAll('rect.active');
        for (let i = 0; i < els.length; ++i) {
            const el = els[i];
            const fill = this.getNoteFillColor(this.noteSequence.notes[parseInt(el.getAttribute('data-index'), 10)], false);
            el.setAttribute('fill', fill);
            el.classList.remove('active');
        }
    }
    draw() {
        for (let i = 0; i < this.noteSequence.notes.length; i++) {
            const note = this.noteSequence.notes[i];
            const size = this.getNotePosition(note, i);
            const fill = this.getNoteFillColor(note, false);
            const dataAttributes = [
                ['index', i],
                ['instrument', note.instrument],
                ['program', note.program],
                ['isDrum', note.isDrum === true],
                ['pitch', note.pitch],
            ];
            const cssProperties = [
                ['--midi-velocity',
                    String(note.velocity !== undefined ? note.velocity : 127)]
            ];
            this.drawNote(size.x, size.y, size.w, size.h, fill, dataAttributes, cssProperties);
        }
        this.drawn = true;
    }
    getNoteFillColor(note, isActive) {
        const opacityBaseline = 0.2;
        const opacity = note.velocity ? note.velocity / 100 + opacityBaseline : 1;
        const fill = `rgba(${isActive ? this.config.activeNoteRGB : this.config.noteRGB},
  ${opacity})`;
        return fill;
    }
    drawNote(x, y, w, h, fill, dataAttributes, cssProperties) {
        if (!this.svg) {
            return;
        }
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.classList.add('note');
        rect.setAttribute('fill', fill);
        rect.setAttribute('x', `${Math.round(x)}`);
        rect.setAttribute('y', `${Math.round(y)}`);
        rect.setAttribute('width', `${Math.round(w)}`);
        rect.setAttribute('height', `${Math.round(h)}`);
        dataAttributes.forEach(([key, value]) => {
            if (value !== undefined) {
                rect.dataset[key] = `${value}`;
            }
        });
        cssProperties.forEach(([key, value]) => {
            rect.style.setProperty(key, value);
        });
        this.svg.appendChild(rect);
    }
    clear() {
        this.svg.innerHTML = '';
        this.drawn = false;
    }
    clearActiveNotes() {
        this.unfillActiveRect(this.svg);
    }
}
export class PianoRollSVGVisualizer extends BaseSVGVisualizer {
    constructor(sequence, svg, config = {}) {
        super(sequence, config);
        if (!(svg instanceof SVGSVGElement)) {
            throw new Error('This visualizer requires an <svg> element to display the visualization');
        }
        this.svg = svg;
        this.parentElement = svg.parentElement;
        const size = this.getSize();
        this.width = size.width;
        this.height = size.height;
        this.svg.style.width = `${this.width}px`;
        this.svg.style.height = `${this.height}px`;
        this.clear();
        this.draw();
    }
}
export class WaterfallSVGVisualizer extends BaseSVGVisualizer {
    constructor(sequence, parentElement, config = {}) {
        super(sequence, config);
        this.NOTES_PER_OCTAVE = 12;
        this.WHITE_NOTES_PER_OCTAVE = 7;
        this.LOW_C = 24;
        this.firstDrawnOctave = 0;
        this.lastDrawnOctave = 6;
        if (!(parentElement instanceof HTMLDivElement)) {
            throw new Error('This visualizer requires a <div> element to display the visualization');
        }
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
        this.svg.style.width = `${this.width}px`;
        this.svg.style.height = `${this.height}px`;
        this.svgPiano.style.width = `${this.width}px`;
        this.svgPiano.style.height = `${this.config.whiteNoteHeight}px`;
        this.parentElement.style.width =
            `${this.width + this.config.whiteNoteWidth}px`;
        this.parentElement.scrollTop = this.parentElement.scrollHeight;
        this.clear();
        this.drawPiano();
        this.draw();
    }
    setupDOM(container) {
        this.parentElement = document.createElement('div');
        this.parentElement.classList.add('waterfall-notes-container');
        const height = Math.max(container.getBoundingClientRect().height, 200);
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
    redraw(activeNote, scrollIntoView) {
        if (!this.drawn) {
            this.draw();
        }
        if (!activeNote) {
            return null;
        }
        this.clearActiveNotes();
        this.parentElement.style.paddingTop = this.parentElement.style.height;
        for (let i = 0; i < this.noteSequence.notes.length; i++) {
            const note = this.noteSequence.notes[i];
            const isActive = activeNote && this.isPaintingActiveNote(note, activeNote);
            if (!isActive) {
                continue;
            }
            const el = this.svg.querySelector(`rect[data-index="${i}"]`);
            this.fillActiveRect(el, note);
            const key = this.svgPiano.querySelector(`rect[data-pitch="${note.pitch}"]`);
            this.fillActiveRect(key, note);
            if (note === activeNote) {
                const y = parseFloat(el.getAttribute('y'));
                const height = parseFloat(el.getAttribute('height'));
                if (y < (this.parentElement.scrollTop - height)) {
                    this.parentElement.scrollTop = y + height;
                }
                return y;
            }
        }
        return null;
    }
    getSize() {
        this.updateMinMaxPitches(true);
        let whiteNotesDrawn = 52;
        if (this.config.showOnlyOctavesUsed) {
            let foundFirst = false, foundLast = false;
            for (let i = 1; i < 7; i++) {
                const c = this.LOW_C + this.NOTES_PER_OCTAVE * i;
                if (!foundFirst && c > this.config.minPitch) {
                    this.firstDrawnOctave = i - 1;
                    foundFirst = true;
                }
                if (!foundLast && c > this.config.maxPitch) {
                    this.lastDrawnOctave = i - 1;
                    foundLast = true;
                }
            }
            whiteNotesDrawn = (this.lastDrawnOctave - this.firstDrawnOctave + 1) *
                this.WHITE_NOTES_PER_OCTAVE;
        }
        const width = whiteNotesDrawn * this.config.whiteNoteWidth;
        const endTime = this.sequenceIsQuantized ?
            this.noteSequence.totalQuantizedSteps :
            this.noteSequence.totalTime;
        if (!endTime) {
            throw new Error('The sequence you are using with the visualizer does not have a ' +
                (this.sequenceIsQuantized ? 'totalQuantizedSteps' : 'totalTime') +
                ' field set, so the visualizer can\'t be horizontally ' +
                'sized correctly.');
        }
        const height = Math.max(endTime * this.config.pixelsPerTimeStep, MIN_NOTE_LENGTH);
        return { width, height };
    }
    getNotePosition(note, noteIndex) {
        const rect = this.svgPiano.querySelector(`rect[data-pitch="${note.pitch}"]`);
        if (!rect) {
            return null;
        }
        const len = this.getNoteEndTime(note) - this.getNoteStartTime(note);
        const x = Number(rect.getAttribute('x'));
        const w = Number(rect.getAttribute('width'));
        const h = Math.max(this.config.pixelsPerTimeStep * len - this.config.noteSpacing, MIN_NOTE_LENGTH);
        const y = this.height -
            (this.getNoteStartTime(note) * this.config.pixelsPerTimeStep) - h;
        return { x, y, w, h };
    }
    drawPiano() {
        this.svgPiano.innerHTML = '';
        const blackNoteOffset = this.config.whiteNoteWidth - this.config.blackNoteWidth / 2;
        const blackNoteIndexes = [1, 3, 6, 8, 10];
        let x = 0;
        let currentPitch = 0;
        if (this.config.showOnlyOctavesUsed) {
            currentPitch =
                (this.firstDrawnOctave * this.NOTES_PER_OCTAVE) + this.LOW_C;
        }
        else {
            currentPitch = this.LOW_C - 3;
            this.drawWhiteKey(currentPitch, x);
            this.drawWhiteKey(currentPitch + 2, this.config.whiteNoteWidth);
            currentPitch += 3;
            x = 2 * this.config.whiteNoteWidth;
        }
        for (let o = this.firstDrawnOctave; o <= this.lastDrawnOctave; o++) {
            for (let i = 0; i < this.NOTES_PER_OCTAVE; i++) {
                if (blackNoteIndexes.indexOf(i) === -1) {
                    this.drawWhiteKey(currentPitch, x);
                    x += this.config.whiteNoteWidth;
                }
                currentPitch++;
            }
        }
        if (this.config.showOnlyOctavesUsed) {
            currentPitch =
                (this.firstDrawnOctave * this.NOTES_PER_OCTAVE) + this.LOW_C;
            x = -this.config.whiteNoteWidth;
        }
        else {
            this.drawWhiteKey(currentPitch, x);
            currentPitch = this.LOW_C - 3;
            this.drawBlackKey(currentPitch + 1, blackNoteOffset);
            currentPitch += 3;
            x = this.config.whiteNoteWidth;
        }
        for (let o = this.firstDrawnOctave; o <= this.lastDrawnOctave; o++) {
            for (let i = 0; i < this.NOTES_PER_OCTAVE; i++) {
                if (blackNoteIndexes.indexOf(i) !== -1) {
                    this.drawBlackKey(currentPitch, x + blackNoteOffset);
                }
                else {
                    x += this.config.whiteNoteWidth;
                }
                currentPitch++;
            }
        }
    }
    drawWhiteKey(index, x) {
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
    drawBlackKey(index, x) {
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
    clearActiveNotes() {
        super.unfillActiveRect(this.svg);
        const els = this.svgPiano.querySelectorAll('rect.active');
        for (let i = 0; i < els.length; ++i) {
            const el = els[i];
            el.setAttribute('fill', el.getAttribute('original-fill'));
            el.classList.remove('active');
        }
    }
}
export var ScrollType;
(function (ScrollType) {
    ScrollType[ScrollType["PAGE"] = 0] = "PAGE";
    ScrollType[ScrollType["NOTE"] = 1] = "NOTE";
    ScrollType[ScrollType["BAR"] = 2] = "BAR";
})(ScrollType || (ScrollType = {}));
export class StaffSVGVisualizer extends BaseVisualizer {
    constructor(sequence, div, config = {}) {
        super(sequence, config);
        if (config.pixelsPerTimeStep === undefined ||
            config.pixelsPerTimeStep <= 0) {
            this.config.pixelsPerTimeStep = 0;
        }
        this.instruments = config.instruments || [];
        this.render = new sr.StaffSVGRender(this.getScoreInfo(sequence), {
            noteHeight: this.config.noteHeight,
            noteSpacing: this.config.noteSpacing,
            pixelsPerTimeStep: this.config.pixelsPerTimeStep,
            noteRGB: this.config.noteRGB,
            activeNoteRGB: this.config.activeNoteRGB,
            defaultKey: config.defaultKey || 0,
            scrollType: config.scrollType || ScrollType.PAGE,
        }, div);
        this.drawnNotes = sequence.notes.length;
        this.clear();
        this.redraw();
    }
    clear() {
        this.render.clear();
    }
    redraw(activeNote, scrollIntoView) {
        if (this.drawnNotes !== this.noteSequence.notes.length) {
            this.render.scoreInfo = this.getScoreInfo(this.noteSequence);
        }
        const activeNoteInfo = activeNote ? this.getNoteInfo(activeNote) : undefined;
        return this.render.redraw(activeNoteInfo, scrollIntoView);
    }
    isNoteInInstruments(note) {
        if (note.instrument === undefined || this.instruments.length === 0) {
            return true;
        }
        else {
            return this.instruments.indexOf(note.instrument) >= 0;
        }
    }
    timeToQuarters(time) {
        const q = time * this.noteSequence.tempos[0].qpm / 60;
        return Math.round(q * 16) / 16;
    }
    quantizedStepsToQuarters(steps) {
        const q = steps / this.noteSequence.quantizationInfo.stepsPerQuarter;
        return Math.round(q * 16) / 16;
    }
    getNoteInfo(note) {
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
    getScoreInfo(sequence) {
        const notesInfo = [];
        sequence.notes.forEach((note) => {
            if (this.isNoteInInstruments(note)) {
                notesInfo.push(this.getNoteInfo(note));
            }
        });
        return {
            notes: notesInfo,
            tempos: sequence.tempos ?
                sequence.tempos.map((t) => {
                    return { start: this.timeToQuarters(t.time), qpm: t.qpm };
                }) :
                [],
            keySignatures: sequence.keySignatures ?
                sequence.keySignatures.map((ks) => {
                    return { start: this.timeToQuarters(ks.time), key: ks.key };
                }) :
                [],
            timeSignatures: sequence.timeSignatures ?
                sequence.timeSignatures.map((ts) => {
                    return {
                        start: this.timeToQuarters(ts.time),
                        numerator: ts.numerator,
                        denominator: ts.denominator
                    };
                }) :
                []
        };
    }
    clearActiveNotes() {
        this.redraw();
    }
}
//# sourceMappingURL=visualizer.js.map