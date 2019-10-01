import * as mm from '../src/index';
import {writeNoteSeqs} from './common';

const recorder = new mm.Recorder();
const recordBtn = document.getElementById('record') as HTMLButtonElement;
const stopBtn = document.getElementById('stop') as HTMLButtonElement;
const startStreamBtn =
    document.getElementById('startStream') as HTMLButtonElement;
const stopStreamBtnBtn =
    document.getElementById('stopStream') as HTMLButtonElement;
const tempoSlider = document.getElementById('tempo') as HTMLInputElement;
const clickCheckbox = document.getElementById('playClick') as HTMLInputElement;
const countinCheckbox =
    document.getElementById('countInOnly') as HTMLInputElement;

tempoSlider.addEventListener('change', () => {
  document.getElementById('tempoValue').textContent = tempoSlider.value;
  recorder.setTempo(parseFloat(tempoSlider.value));
});

clickCheckbox.addEventListener('change', () => {
  recorder.enablePlayClick(clickCheckbox.checked);
});

countinCheckbox.addEventListener('change', () => {
  recorder.stop();
  startStreamBtn.textContent = 'Record';
  recorder.enablePlayCountIn(countinCheckbox.checked);
});

recorder.initialize().then(() => {
  recordBtn.disabled = stopBtn.disabled = startStreamBtn.disabled =
      stopStreamBtnBtn.disabled = false;
});

// Basic recording.
recordBtn.addEventListener('click', () => {
  recorder.callbackObject = null;
  recordBtn.textContent = '...';
  recorder.start();
});

stopBtn.addEventListener('click', () => {
  recordBtn.textContent = 'Record';
  const seq = recorder.stop();
  if (seq) {
    writeNoteSeqs('output', [seq]);
  }
});

// Stream recording.
startStreamBtn.addEventListener('click', () => {
  recorder.callbackObject = {
    run: (seq: mm.NoteSequence) => {
      if (seq) {
        // tslint:disable-next-line:no-unused-expression
        new mm.PianoRollSVGVisualizer(
            seq, document.getElementsByClassName('svg')[0] as SVGSVGElement);
      }
    },
    noteOn: (pitch, velocity, device) => {core.log('We have received a noteOn event!')},
    noteOff: (pitch, velocity, device) => {core.log('We have received a noteOff event!')}
  };
  startStreamBtn.textContent = '...';
  recorder.start();
});

stopStreamBtnBtn.addEventListener('click', () => {
  startStreamBtn.textContent = 'Record';
  const seq = recorder.stop();
  if (seq) {
    writeNoteSeqs('streamOutput', [seq]);
  }
});
