import * as mm from '../src/index';
import {writeNoteSeqs} from './common';

const recordBtn = document.getElementById('record') as HTMLButtonElement;
const stopBtn = document.getElementById('stop') as HTMLButtonElement;
const startStreamBtn =
    document.getElementById('startStream') as HTMLButtonElement;
const stopStreamBtnBtn =
    document.getElementById('stopStream') as HTMLButtonElement;

const recorder = new mm.Recorder();
recorder.initialize().then(() => {
  recordBtn.disabled = stopBtn.disabled = startStreamBtn.disabled =
      stopStreamBtnBtn.disabled = false;
});

// Basic recording.
recordBtn.addEventListener('click', () => {
  recorder.callbackObject = null;
  recordBtn.textContent = '...';
  recorder.startRecording();
});

stopBtn.addEventListener('click', () => {
  recordBtn.textContent = 'Record';
  const seq = recorder.stopRecording();
  if (seq) {
    writeNoteSeqs('output', [seq]);
  }
});

// Stream recording.
startStreamBtn.addEventListener('click', () => {
  recorder.callbackObject = {
    run: (seq: mm.NoteSequence) => {
      if (seq) {
        console.log(seq);
        new mm.Visualizer(
            seq, document.getElementById('canvas') as HTMLCanvasElement);
      }
    }
  };
  startStreamBtn.textContent = '...';
  recorder.startRecording();
});

stopStreamBtnBtn.addEventListener('click', () => {
  startStreamBtn.textContent = 'Record';
  const seq = recorder.stopRecording();
  if (seq) {
    writeNoteSeqs('streamOutput', [seq]);
  }
});
