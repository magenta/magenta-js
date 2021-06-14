import * as tf from '@tensorflow/tfjs';
export function auxiliaryInputFromSpec(spec) {
    switch (spec.type) {
        case 'BinaryCounter':
            return new BinaryCounter(spec.args);
        default:
            throw new Error(`Unknown auxiliary input: ${spec}`);
    }
}
export class AuxiliaryInput {
    constructor(depth) {
        this.depth = depth;
    }
}
export class BinaryCounter extends AuxiliaryInput {
    constructor(args) {
        super(args.numBits);
    }
    getTensors(numSteps) {
        const buffer = tf.buffer([numSteps, this.depth]);
        for (let step = 0; step < numSteps; ++step) {
            for (let i = 0; i < this.depth; ++i) {
                buffer.set(Math.floor((step + 1) / Math.pow(2, i)) % 2 ? 1.0 : -1.0, step, i);
            }
        }
        return buffer.toTensor().as2D(numSteps, this.depth);
    }
}
//# sourceMappingURL=aux_inputs.js.map