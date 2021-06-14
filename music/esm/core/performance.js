import { NoteSequence } from '../protobuf/index';
import * as constants from './constants';
import * as sequences from './sequences';
import * as logging from './logging';
export class Performance {
    constructor(events, maxShiftSteps, numVelocityBins, program, isDrum) {
        this.events = events;
        this.maxShiftSteps = maxShiftSteps;
        this.numVelocityBins = numVelocityBins;
        this.program = program;
        this.isDrum = isDrum;
    }
    static fromNoteSequence(noteSequence, maxShiftSteps, numVelocityBins, instrument) {
        sequences.assertIsQuantizedSequence(noteSequence);
        const notes = noteSequence.notes.filter((note, _) => instrument !== undefined ? note.instrument === instrument : true);
        const sortedNotes = notes.sort((a, b) => a.startTime === b.startTime ? a.pitch - b.pitch :
            a.startTime - b.startTime);
        const onsets = sortedNotes.map((note, i) => ({ step: note.quantizedStartStep, index: i, isOffset: 0 }));
        const offsets = sortedNotes.map((note, i) => ({ step: note.quantizedEndStep, index: i, isOffset: 1 }));
        const noteEvents = onsets.concat(offsets).sort((a, b) => a.step === b.step ?
            (a.index === b.index ? a.isOffset - b.isOffset :
                a.index - b.index) :
            a.step - b.step);
        const velocityBinSize = numVelocityBins ?
            Math.ceil((constants.MIDI_VELOCITIES - 1) / numVelocityBins) :
            undefined;
        const events = [];
        let currentStep = 0;
        let currentVelocityBin = numVelocityBins;
        for (const e of noteEvents) {
            if (e.step > currentStep) {
                while (e.step > currentStep + maxShiftSteps) {
                    events.push({ type: 'time-shift', steps: maxShiftSteps });
                    currentStep += maxShiftSteps;
                }
                events.push({ type: 'time-shift', steps: e.step - currentStep });
                currentStep = e.step;
            }
            if (e.isOffset) {
                events.push({ type: 'note-off', pitch: sortedNotes[e.index].pitch });
            }
            else {
                if (velocityBinSize) {
                    const velocityBin = Math.floor((sortedNotes[e.index].velocity -
                        constants.MIN_MIDI_VELOCITY - 1) /
                        velocityBinSize) +
                        1;
                    if (velocityBin !== currentVelocityBin) {
                        events.push({ type: 'velocity-change', velocityBin });
                        currentVelocityBin = velocityBin;
                    }
                }
                events.push({ type: 'note-on', pitch: sortedNotes[e.index].pitch });
            }
        }
        const isDrum = notes.some(note => note.isDrum) ?
            (notes.some(note => !note.isDrum) ? undefined : true) :
            false;
        const programs = Array.from(new Set(notes.map(note => note.program)));
        const program = (!isDrum && programs.length === 1) ? programs[0] : undefined;
        const performance = new Performance(events, maxShiftSteps, numVelocityBins, program, isDrum);
        performance.setNumSteps(noteSequence.totalQuantizedSteps);
        return performance;
    }
    getNumSteps() {
        return this.events.filter((event) => event.type === 'time-shift')
            .map((event) => event.steps)
            .reduce((a, b) => a + b, 0);
    }
    setNumSteps(numSteps) {
        let currentNumSteps = this.getNumSteps();
        if (currentNumSteps < numSteps) {
            if (this.events.length) {
                const event = this.events[this.events.length - 1];
                if (event.type === 'time-shift') {
                    const steps = Math.min(numSteps - currentNumSteps, this.maxShiftSteps - event.steps);
                    event.steps += steps;
                    currentNumSteps += steps;
                }
            }
            while (currentNumSteps < numSteps) {
                if (currentNumSteps + this.maxShiftSteps > numSteps) {
                    this.events.push({ type: 'time-shift', steps: numSteps - currentNumSteps });
                    currentNumSteps = numSteps;
                }
                else {
                    this.events.push({ type: 'time-shift', steps: this.maxShiftSteps });
                    currentNumSteps += this.maxShiftSteps;
                }
            }
        }
        else if (currentNumSteps > numSteps) {
            while (this.events.length && currentNumSteps > numSteps) {
                const event = this.events[this.events.length - 1];
                if (event.type === 'time-shift') {
                    if (currentNumSteps - event.steps < numSteps) {
                        event.steps -= currentNumSteps - numSteps;
                        currentNumSteps = numSteps;
                    }
                    else {
                        this.events.pop();
                        currentNumSteps -= event.steps;
                    }
                }
                else {
                    this.events.pop();
                }
            }
        }
    }
    toNoteSequence(instrument) {
        const velocityBinSize = this.numVelocityBins ?
            Math.ceil((constants.MIDI_VELOCITIES - 1) / this.numVelocityBins) :
            undefined;
        const noteSequence = NoteSequence.create();
        let currentStep = 0;
        let currentVelocity = undefined;
        const pitchStartStepsAndVelocities = new Map();
        for (let i = constants.MIN_MIDI_PITCH; i <= constants.MAX_MIDI_PITCH; ++i) {
            pitchStartStepsAndVelocities.set(i, []);
        }
        for (const event of this.events) {
            switch (event.type) {
                case 'note-on':
                    pitchStartStepsAndVelocities.get(event.pitch).push([
                        currentStep, currentVelocity
                    ]);
                    break;
                case 'note-off':
                    const startStepsAndVelocities = pitchStartStepsAndVelocities.get(event.pitch);
                    if (startStepsAndVelocities.length) {
                        const [startStep, velocity] = startStepsAndVelocities.shift();
                        if (currentStep > startStep) {
                            noteSequence.notes.push(NoteSequence.Note.create({
                                pitch: event.pitch,
                                velocity,
                                instrument,
                                quantizedStartStep: startStep,
                                quantizedEndStep: currentStep,
                                program: this.program,
                                isDrum: this.isDrum,
                            }));
                        }
                        else {
                            logging.log('Ignoring zero-length note: ' +
                                `(pitch = ${event.pitch}, step = ${currentStep})`, 'Performance');
                        }
                    }
                    else {
                        logging.log('Ignoring note-off with no previous note-on:' +
                            `(pitch = ${event.pitch}, step = ${currentStep})`, 'Performance');
                    }
                    break;
                case 'time-shift':
                    currentStep += event.steps;
                    break;
                case 'velocity-change':
                    if (velocityBinSize) {
                        currentVelocity = constants.MIN_MIDI_VELOCITY +
                            (event.velocityBin - 1) * velocityBinSize + 1;
                    }
                    else {
                        throw new Error(`Unexpected velocity change event: ${event}`);
                    }
                    break;
                default:
                    throw new Error(`Unrecognized performance event: ${event}`);
            }
        }
        pitchStartStepsAndVelocities.forEach((startStepsAndVelocities, pitch) => {
            for (const [startStep, velocity] of startStepsAndVelocities) {
                if (currentStep > startStep) {
                    noteSequence.notes.push(NoteSequence.Note.create({
                        pitch,
                        velocity,
                        instrument,
                        quantizedStartStep: startStep,
                        quantizedEndStep: currentStep,
                        program: this.program,
                        isDrum: this.isDrum
                    }));
                }
                else {
                    logging.log('Ignoring zero-length note: ' +
                        `(pitch = ${pitch}, step = ${currentStep})`, 'Performance');
                }
            }
        });
        noteSequence.totalQuantizedSteps = currentStep;
        return noteSequence;
    }
}
//# sourceMappingURL=performance.js.map