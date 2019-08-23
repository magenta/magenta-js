import 'jasmine';
import * as tf from '@tensorflow/tfjs';
import * as aux_inputs from './aux_inputs';

describe('aux_inputs', () => {
  it('Test Binary Counter', () => {
    const spec: aux_inputs.BinaryCounterSpec = {
      type: 'BinaryCounter',
      args: {numBits: 2}
    };
    const bc = aux_inputs.auxiliaryInputFromSpec(spec);
    const tensors = bc.getTensors(5);
    const splitTensors = tf.split(tensors, 5);
    expect(bc.depth).toBe(2);
    expect(tensors.shape).toEqual([5, 2]);

    expect(splitTensors[0].arraySync()[0]).toEqual([1.0, -1.0]);
    expect(splitTensors[1].arraySync()[0]).toEqual([-1.0, 1.0]);
    expect(splitTensors[2].arraySync()[0]).toEqual([1.0, 1.0]);
    expect(splitTensors[3].arraySync()[0]).toEqual([-1.0, -1.0]);
    expect(splitTensors[4].arraySync()[0]).toEqual([1.0, -1.0]);
  });
});
