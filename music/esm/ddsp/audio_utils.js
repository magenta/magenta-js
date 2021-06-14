function mixAndJoinAudioData(buffers, mixLength) {
    const finalFrameLength = buffers.reduce((acc, buffer) => acc + buffer.length, 0);
    const mixedAndJoinedBuffer = new Float32Array(finalFrameLength);
    const getCrossFadedValue = (a, b, _ratio) => {
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
            for (let i = offset, j = 0, currentBufferCounter = currentBuffer.length - mixLength; i < bufferLengthCount && j < nextBuffer.length; i++, j++, currentBufferCounter++) {
                const ratioPercentage = (i - offset) / (bufferLengthCount - offset);
                mixedAndJoinedBuffer[i] = getCrossFadedValue(currentBuffer[currentBufferCounter], nextBuffer[j], ratioPercentage);
            }
            mixedAndJoinedBuffer.set(nextBuffer.slice(mixLength), bufferLengthCount);
            bufferLengthCount += nextBuffer.slice(mixLength).length;
        }
    }
    return mixedAndJoinedBuffer;
}
export { mixAndJoinAudioData };
//# sourceMappingURL=audio_utils.js.map