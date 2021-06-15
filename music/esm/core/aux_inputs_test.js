import * as tf from '@tensorflow/tfjs';
import * as test from 'tape';
import * as aux_inputs from './aux_inputs';
test('Test Binary Counter', (t) => {
    const spec = {
        type: 'BinaryCounter',
        args: { numBits: 2 }
    };
    const bc = aux_inputs.auxiliaryInputFromSpec(spec);
    const tensors = bc.getTensors(5);
    const splitTensors = tf.split(tensors, 5);
    t.equal(bc.depth, 2);
    t.deepEqual(tensors.shape, [5, 2]);
    t.deepEqual(splitTensors[0].dataSync(), [1.0, -1.0]);
    t.deepEqual(splitTensors[1].dataSync(), [-1.0, 1.0]);
    t.deepEqual(splitTensors[2].dataSync(), [1.0, 1.0]);
    t.deepEqual(splitTensors[3].dataSync(), [-1.0, -1.0]);
    t.deepEqual(splitTensors[4].dataSync(), [1.0, -1.0]);
    t.end();
});
//# sourceMappingURL=aux_inputs_test.js.map