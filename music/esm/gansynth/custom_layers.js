import * as tf from '@tensorflow/tfjs';
class PixelNorm extends tf.layers.Layer {
    constructor(epsilon = 1e-8, layerConfig = {}) {
        super(layerConfig);
        this.epsilon = epsilon;
        this.layerConfig = layerConfig;
        this.supportsMasking = true;
    }
    computeOutputShape(inputShape) {
        return [inputShape[0], inputShape[1], inputShape[2], inputShape[3]];
    }
    call(inputs) {
        return tf.tidy(() => {
            let input = inputs;
            if (Array.isArray(input)) {
                input = input[0];
            }
            const mean = tf.mean(tf.square(input), [3], true);
            return tf.mul(input, tf.rsqrt(tf.add(mean, this.epsilon)));
        });
    }
    getClassName() {
        return 'PixelNorm';
    }
}
export function pixelNorm(epsilon = 1e-8, layerConfig = {}) {
    return new PixelNorm(epsilon, layerConfig);
}
class InitialPad extends tf.layers.Layer {
    constructor(kernelH = 2, kernelW = 16, layerConfig = {}) {
        super(layerConfig);
        this.kernelH = kernelH;
        this.kernelW = kernelW;
        this.layerConfig = layerConfig;
        this.supportsMasking = true;
    }
    computeOutputShape(inputShape) {
        return [
            inputShape[0], 2 * (this.kernelH - 1) + inputShape[1],
            2 * (this.kernelW - 1) + inputShape[2], inputShape[3]
        ];
    }
    call(inputs) {
        let input = inputs;
        if (Array.isArray(input)) {
            input = input[0];
        }
        const padH = this.kernelH - 1;
        const padW = this.kernelW - 1;
        return tf.pad(input, [[0, 0], [padH, padH], [padW, padW], [0, 0]]);
    }
    getClassName() {
        return 'InitialPad';
    }
}
export function initialPad(kernelH = 2, kernelW = 16, layerConfig = {}) {
    return new InitialPad(kernelH, kernelW, layerConfig);
}
class BoxUpscale extends tf.layers.Layer {
    constructor(scale = 2) {
        super({});
        this.scale = scale;
        this.supportsMasking = true;
    }
    computeOutputShape(inputShape) {
        return [
            inputShape[0], this.scale * inputShape[1], this.scale * inputShape[2],
            inputShape[3]
        ];
    }
    call(inputs) {
        return tf.tidy(() => {
            let input = inputs;
            if (Array.isArray(input)) {
                input = input[0];
            }
            const tiledInput = tf.tile(input, [this.scale ** 2, 1, 1, 1]);
            return tf.batchToSpaceND(tiledInput, [this.scale, this.scale], [[0, 0], [0, 0]]);
        });
    }
    getClassName() {
        return 'BoxUpscale';
    }
}
export function boxUpscale(scale = 2) {
    return new BoxUpscale(scale);
}
//# sourceMappingURL=custom_layers.js.map