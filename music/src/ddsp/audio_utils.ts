/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
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
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';

function getMonoAudio(audioBuffer: AudioBuffer): Float32Array {
  if (audioBuffer.numberOfChannels === 1) {
    return audioBuffer.getChannelData(0);
  }
  if (audioBuffer.numberOfChannels !== 2) {
    throw Error(
      `${audioBuffer.numberOfChannels} channel audio is not supported.`
    );
  }
  const ch0 = audioBuffer.getChannelData(0);
  const ch1 = audioBuffer.getChannelData(1);

  const mono = new Float32Array(audioBuffer.length);
  for (let i = 0; i < audioBuffer.length; ++i) {
    mono[i] = (ch0[i] + ch1[i]) / 2;
  }
  return mono;
}

function midiToHz(notes: number) {
  let notesTensor = tf.sub(notes, 69.0);
  notesTensor = tf.div(notesTensor, 12.0);
  notesTensor = tf.pow(2.0, notesTensor);
  notesTensor = tf.mul(440.0, notesTensor);
  return notesTensor;
}

function hzToMidi(frequencies: number[]) {
  let frequenciesTensor: tf.Tensor = tf.sub(
    tf.div(tf.log(frequencies), tf.log(2)),
    tf.div(tf.log(440.0), tf.log(2))
  );
  frequenciesTensor = tf.mul(12, frequenciesTensor);
  frequenciesTensor = tf.add(frequenciesTensor, 69);
  return frequenciesTensor;
}

function shiftF0(f0Hz: number[], f0OctaveShift = 0.0) {
  return tf.tidy(
    // @ts-ignore
    () => {
      let tempF0 = tf.mul(f0Hz, tf.pow(2, f0OctaveShift));
      tempF0 = tempF0.clipByValue(0.0, midiToHz(110.0).dataSync()[0]);
      return tempF0;
    }
  );
}

function mixAndJoinAudioData(buffers: any[], mixLength: number) {
  const finalFrameLength = buffers.reduce(
    // tslint:disable-next-line: restrict-plus-operands
    (acc, buffer) => acc + buffer.length,
    0
  );
  const mixedAndJoinedBuffer = new Float32Array(finalFrameLength);

  const getCrossFadedValue = (a: number, b: number, _ratio: number) => {
    return a * (1 - _ratio) + b * _ratio;
  };

  let bufferLengthCount = 0;

  for (let bufferCount = 0; bufferCount < buffers.length; bufferCount++) {
    const currentBuffer = buffers[bufferCount];
    const hasNextBuffer = bufferCount < buffers.length - 1;

    if (bufferCount === 0) {
      mixedAndJoinedBuffer.set(currentBuffer, bufferLengthCount);
      bufferLengthCount += currentBuffer.length;
    }

    if (hasNextBuffer) {
      const nextBuffer = buffers[bufferCount + 1];
      const offset = bufferLengthCount - mixLength;

      for (
        let i = offset,
          j = 0,
          currentBufferCounter = currentBuffer.length - mixLength;
        i < bufferLengthCount && j < nextBuffer.length;
        i++, j++, currentBufferCounter++
      ) {
        const ratioPercentage = (i - offset) / (bufferLengthCount - offset);
        mixedAndJoinedBuffer[i] = getCrossFadedValue(
          currentBuffer[currentBufferCounter],
          nextBuffer[j],
          ratioPercentage
        );
      }
      mixedAndJoinedBuffer.set(nextBuffer.slice(mixLength), bufferLengthCount);
      bufferLengthCount += nextBuffer.slice(mixLength).length;
    }
  }

  return mixedAndJoinedBuffer;
}

export { mixAndJoinAudioData, shiftF0, getMonoAudio, hzToMidi, midiToHz };
