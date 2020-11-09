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

import { TypedArray } from '@tensorflow/tfjs';

function mixAndJoinAudioData(buffers: TypedArray[], mixLength: number) {
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

export { mixAndJoinAudioData };
