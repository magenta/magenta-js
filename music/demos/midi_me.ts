import * as mm from '../src';
import {blobToNoteSequence, INoteSequence, NoteSequence} from '../src';
import {quantizeNoteSequence} from '../src/core/sequences';

// tslint:disable-next-line:max-line-length
import {CHECKPOINTS_DIR, visualizeNoteSeqs, writeMemory, writeTimer} from './common';
import {updateGraph} from './common_graph';

const MEL_CKPT = `${CHECKPOINTS_DIR}/music_vae/mel_2bar_small`;
const BARS = 2;

const fileInput = document.getElementById('fileInput') as HTMLInputElement;
fileInput.addEventListener('change', loadFile);

// Initialize models.
const mvae = new mm.MusicVAE(MEL_CKPT);
mvae.initialize().then(() => {
  document.getElementById('fileBtn').removeAttribute('disabled');
});

const model = new mm.MidiMe({epochs: 60});
model.initialize();

function loadFile(e: Event) {
  blobToNoteSequence(fileInput.files[0]).then(doTheThing);
}

async function doTheThing(mel: NoteSequence) {
  visualizeNoteSeqs('input', [mel]);
  const start = performance.now();

  // 1. Encode the input into MusicVAE, get back a z.
  const quantizedMel = quantizeNoteSequence(mel, 4);

  // 1b. Split this sequence into bar chunks:
  // 4 steps/quarter, 4 quarters/bar => 16 steps / bar
  const chunks = splitNoteSequence(mm.sequences.clone(quantizedMel), 16 * BARS);
  const z = await mvae.encode(chunks);  // shape of z is [chunks, 256]

  // 2. Use that z as input to train MidiMe.
  // Reconstruction before training.
  const z1 = model.vae.predict(z) as mm.tf.Tensor2D[];
  const ns1 = await mvae.decode(z1[1] as mm.tf.Tensor2D);
  visualizeNoteSeqs('pre-training', [concatenate(ns1)]);
  z1[0].dispose();
  z1[1].dispose();

  // 3. Train!
  const losses: number[] = [];
  // tslint:disable-next-line:no-any
  await model.train(z, (epoch: number, logs: any) => {
    losses.push(logs.loss);
    updateGraph(losses, 'svg');
  });

  // 4. Check reconstruction after training.
  const z2 = model.vae.predict(z) as mm.tf.Tensor2D[];
  const ns2 = await mvae.decode(z2[1] as mm.tf.Tensor2D);
  visualizeNoteSeqs('post-training', [concatenate(ns2)]);
  z2[0].dispose();
  z2[1].dispose();

  writeTimer('training-time', start);

  // 5. Sample from MidiMe
  const sample1 = await model.sample(4) as mm.tf.Tensor2D;
  const ns3 = await mvae.decode(sample1);
  visualizeNoteSeqs('sample-midime', [concatenate(ns3)]);
  sample1.dispose();

  // 5. Sample from MusicVAE.
  const sample2 = await mvae.sample(4);
  visualizeNoteSeqs('sample-musicvae', [concatenate(sample2)]);

  z.dispose();
  dispose();
}

function dispose() {
  mvae.dispose();
  model.dispose();
  writeMemory(mm.tf.memory().numBytes);
}
/*
 * Helpers
 */

function splitNoteSequence(ns: INoteSequence, chunkSize = 32): NoteSequence[] {
  // Sort notes first.
  const notesBystartStep =
      ns.notes.sort((a, b) => a.quantizedStartStep - b.quantizedStartStep);

  const chunks = [];
  let startStep = 0;
  let currentNotes = [];

  for (let i = 0; i < notesBystartStep.length; i++) {
    const note = notesBystartStep[i];

    const originalStartStep = note.quantizedStartStep;
    const originalEndStep = note.quantizedEndStep;

    // Rebase this note on the current chunk.
    note.quantizedStartStep -= startStep;
    note.quantizedEndStep -= startStep;

    if (note.quantizedStartStep < 0) {
      continue;
    }
    // If this note fits in the chunk, add it to the current sequence.
    if (note.quantizedEndStep <= chunkSize) {
      currentNotes.push(note);
    } else {
      // If this note spills over, truncate it and add it to this sequence.
      if (note.quantizedStartStep < chunkSize) {
        currentNotes.push(new NoteSequence.Note({
          pitch: note.pitch,
          velocity: note.velocity,
          instrument: note.instrument,
          program: note.program,
          isDrum: note.isDrum,
          quantizedStartStep: note.quantizedStartStep,
          quantizedEndStep: chunkSize
        }));
        // Keep the rest of this note, and make sure that next loop still deals
        // with it, and reset it for the next loop.
        note.quantizedStartStep = startStep + chunkSize;
        note.quantizedEndStep = originalEndStep;
      } else {
        // We didn't truncate this note at all, so reset it for the next loop.
        note.quantizedStartStep = originalStartStep;
        note.quantizedEndStep = originalEndStep;
      }

      // Do we need to look at this note again?
      if (note.quantizedEndStep > chunkSize ||
          note.quantizedStartStep > chunkSize) {
        i = i - 1;
      }
      // Save this bar if it isn't empty.
      if (currentNotes.length !== 0) {
        const newSequence = mm.sequences.clone(ns);
        newSequence.notes = currentNotes;
        newSequence.totalQuantizedSteps = chunkSize;
        chunks.push(newSequence);
      }

      // Start a new bar.
      currentNotes = [];
      startStep += chunkSize;
    }
  }

  // Deal with the leftover notes we have in the last bar.
  if (currentNotes.length !== 0) {
    const newSequence = mm.sequences.clone(ns);
    newSequence.notes = currentNotes;
    newSequence.totalQuantizedSteps = chunkSize;
    chunks.push(newSequence);
  }
  return chunks;
}

export function concatenate(args: INoteSequence[]): INoteSequence {
  function calculateTotalTimeIfNeeded(seq: INoteSequence) {
    if (mm.sequences.isQuantizedSequence(seq)) {
      if (!seq.totalQuantizedSteps) {
        seq.totalQuantizedSteps =
            seq.notes[seq.notes.length - 1].quantizedEndStep;
      }
    } else {
      if (!seq.totalTime) {
        seq.totalTime = seq.notes[seq.notes.length - 1].endTime;
      }
    }
  }

  // Base case: if there are only two NoteSequences, glue them together.
  if (args.length === 2) {
    const [seqA, seqB] = args;

    calculateTotalTimeIfNeeded(seqA);
    calculateTotalTimeIfNeeded(seqB);
    const isQuantized = mm.sequences.isQuantizedSequence(seqA);
    const outputSequence = mm.sequences.clone(seqA);

    // Shift each note forward.
    seqB.notes.forEach(note => {
      const clonedNote = Object.assign({}, note);
      if (isQuantized) {
        clonedNote.quantizedStartStep += seqA.totalQuantizedSteps;
        clonedNote.quantizedEndStep += seqA.totalQuantizedSteps;
      } else {
        clonedNote.startTime += seqA.totalTime;
        clonedNote.endTime += seqA.totalTime;
      }
      outputSequence.notes.push(clonedNote);
    });
    if (isQuantized) {
      outputSequence.totalQuantizedSteps =
          seqA.totalQuantizedSteps + seqB.totalQuantizedSteps;
    } else {
      outputSequence.totalTime = seqA.totalTime + seqB.totalTime;
    }
    return outputSequence;
  } else if (args.length > 2) {
    // If there are more than two NoteSequences, concat the last two,
    // and then recursively concatenate that sequences with the remaining ones.
    const first = args.shift();
    return concatenate([first, concatenate(args)]);
  } else {
    // If there's only one NoteSequence, there's nothing to concat.
    return args[0];
  }
}
