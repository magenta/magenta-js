import * as tf from '@tensorflow/tfjs';
import { loadAudioFromFile, loadAudioFromUrl } from '../core/audio_utils';
import * as logging from '../core/logging';
import { fetch, performance } from '../core/compat/global';
import { preprocessAudio } from './audio_utils';
import { MEL_SPEC_BINS, MIDI_PITCHES } from './constants';
import { batchInput, pianorollToNoteSequence, unbatchOutput } from './transcription_utils';
class OnsetsAndFrames {
    constructor(checkpointURL, chunkLength = 250) {
        this.checkpointURL = checkpointURL;
        this.chunkLength = chunkLength;
    }
    async initialize() {
        this.dispose();
        const startTime = performance.now();
        const vars = await fetch(`${this.checkpointURL}/weights_manifest.json`)
            .then((response) => response.json())
            .then((manifest) => tf.io.loadWeights(manifest, this.checkpointURL));
        this.build(vars);
        Object.keys(vars).map(name => vars[name].dispose());
        this.initialized = true;
        logging.logWithDuration('Initialized model', startTime, 'O&F');
    }
    dispose() {
        if (!this.initialized) {
            return;
        }
        this.onsetsCnn.dispose();
        this.onsetsRnn.dispose();
        this.activationCnn.dispose();
        this.frameRnn.dispose();
        this.velocityCnn.dispose();
        this.initialized = false;
    }
    isInitialized() {
        return this.initialized;
    }
    async transcribeFromMelSpec(melSpec, parallelBatches = 4) {
        if (!this.isInitialized()) {
            this.initialize();
        }
        const startTime = performance.now();
        logging.log('Computing onsets, frames, and velocities...', 'O&F', 20);
        const [frameProbs, onsetProbs, velocities] = tf.tidy(() => {
            const batches = batchInput(melSpec, this.chunkLength);
            return this.processBatches(batches, this.chunkLength, melSpec.length, parallelBatches);
        });
        logging.log('Converting to NoteSequence...', 'O&F', 20);
        const ns = pianorollToNoteSequence(frameProbs, onsetProbs, velocities);
        ns.then(() => {
            frameProbs.dispose();
            onsetProbs.dispose();
            velocities.dispose();
            logging.logWithDuration('Transcribed from mel spec', startTime, 'O&F');
        });
        return ns;
    }
    async transcribeFromAudioBuffer(audioBuffer, batchSize = 4) {
        const startTime = performance.now();
        const melSpec = preprocessAudio(audioBuffer);
        melSpec.then(() => logging.logWithDuration('Converted audio to mel spec', startTime, 'O&F', 20));
        return melSpec.then((spec) => this.transcribeFromMelSpec(spec.map(a => Array.from(a), batchSize)));
    }
    async transcribeFromAudioFile(blob) {
        const audio = await loadAudioFromFile(blob);
        return this.transcribeFromAudioBuffer(audio);
    }
    async transcribeFromAudioURL(url) {
        const audio = await loadAudioFromUrl(url);
        return this.transcribeFromAudioBuffer(audio);
    }
    processBatches(batches, chunkLength, fullLength, batchSize) {
        const runCnns = ((batch) => [this.onsetsCnn.predict(batch, batchSize),
            this.activationCnn.predict(batch, batchSize),
            this.velocityCnn.predict(batch, batchSize)]);
        let onsetsCnnOut, activationProbs, scaledVelocities;
        if (batches.shape[0] === 1) {
            [onsetsCnnOut, activationProbs, scaledVelocities] =
                runCnns(batches.expandDims(-1));
        }
        else {
            const batchesOutput = runCnns(batches.expandDims(-1));
            const allOutputs = [];
            for (let i = 0; i < 3; ++i) {
                allOutputs.push(unbatchOutput(batchesOutput[i], chunkLength, fullLength));
            }
            [onsetsCnnOut, activationProbs, scaledVelocities] = allOutputs;
        }
        const onsetProbs = this.onsetsRnn.predict(onsetsCnnOut, this.chunkLength);
        onsetsCnnOut.dispose();
        const frameProbInputs = tf.concat3d([onsetProbs, activationProbs], -1);
        activationProbs.dispose();
        const frameProbs = this.frameRnn.predict(frameProbInputs, this.chunkLength);
        const velocities = tf.clipByValue(scaledVelocities, 0., 1.)
            .mul(tf.scalar(80.))
            .add(tf.scalar(10.))
            .toInt();
        scaledVelocities.dispose();
        return [frameProbs.squeeze(), onsetProbs.squeeze(), velocities.squeeze()];
    }
    build(vars) {
        tf.tidy(() => {
            this.onsetsCnn = new AcousticCnn();
            this.onsetsCnn.setWeights(vars, 'onsets');
            this.onsetsRnn = new Lstm([null, this.onsetsCnn.outputShape[2]]);
            this.onsetsRnn.setWeights(vars, 'onsets', 'onset_probs');
            this.activationCnn = new AcousticCnn('sigmoid');
            this.activationCnn.setWeights(vars, 'frame', 'activation_probs');
            this.frameRnn = new Lstm([null, MIDI_PITCHES * 2]);
            this.frameRnn.setWeights(vars, 'frame', 'frame_probs');
            this.velocityCnn = new AcousticCnn('linear');
            this.velocityCnn.setWeights(vars, 'velocity', 'onset_velocities');
        });
    }
}
class AcousticCnn {
    constructor(finalDenseActivation) {
        this.nn = tf.sequential();
        const convConfig = {
            filters: 48,
            kernelSize: [3, 3],
            activation: 'linear',
            useBias: false,
            padding: 'same',
            dilationRate: [1, 1],
            inputShape: [null, MEL_SPEC_BINS, 1],
            trainable: false
        };
        const batchNormConfig = { scale: false, trainable: false };
        this.nn.add(tf.layers.conv2d(convConfig));
        this.nn.add(tf.layers.batchNormalization(batchNormConfig));
        this.nn.add(tf.layers.activation({ activation: 'relu' }));
        convConfig.inputShape = null;
        this.nn.add(tf.layers.conv2d(convConfig));
        this.nn.add(tf.layers.batchNormalization(batchNormConfig));
        this.nn.add(tf.layers.activation({ activation: 'relu' }));
        this.nn.add(tf.layers.maxPooling2d({ poolSize: [1, 2], strides: [1, 2] }));
        convConfig.filters = 96;
        this.nn.add(tf.layers.conv2d(convConfig));
        this.nn.add(tf.layers.batchNormalization(batchNormConfig));
        this.nn.add(tf.layers.activation({ activation: 'relu' }));
        this.nn.add(tf.layers.maxPooling2d({ poolSize: [1, 2], strides: [1, 2] }));
        const dims = this.nn.outputShape;
        this.nn.add(tf.layers.reshape({ targetShape: [dims[1], dims[2] * dims[3]] }));
        this.nn.add(tf.layers.dense({ units: 768, activation: 'relu', trainable: false }));
        if (finalDenseActivation) {
            this.nn.add(tf.layers.dense({
                units: MIDI_PITCHES,
                activation: finalDenseActivation,
                trainable: false
            }));
        }
        this.outputShape = this.nn.outputShape;
    }
    dispose() {
        this.nn.dispose();
    }
    predict(inputs, batchSize) {
        return this.nn.predict(inputs, { batchSize });
    }
    setWeights(vars, scope, denseName) {
        function getVar(name) {
            const v = vars[name];
            if (v === undefined) {
                throw Error(`Variable not found: ${name}`);
            }
            return v;
        }
        let weights = [
            getVar(`${scope}/conv0/weights`),
            getVar(`${scope}/conv0/BatchNorm/beta`),
            getVar(`${scope}/conv0/BatchNorm/moving_mean`),
            getVar(`${scope}/conv0/BatchNorm/moving_variance`),
            getVar(`${scope}/conv1/weights`),
            getVar(`${scope}/conv1/BatchNorm/beta`),
            getVar(`${scope}/conv1/BatchNorm/moving_mean`),
            getVar(`${scope}/conv1/BatchNorm/moving_variance`),
            getVar(`${scope}/conv2/weights`),
            getVar(`${scope}/conv2/BatchNorm/beta`),
            getVar(`${scope}/conv2/BatchNorm/moving_mean`),
            getVar(`${scope}/conv2/BatchNorm/moving_variance`),
            getVar(`${scope}/fc_end/weights`),
            getVar(`${scope}/fc_end/biases`),
        ];
        if (denseName) {
            weights = weights.concat([
                getVar(`${scope}/${denseName}/weights`),
                getVar(`${scope}/${denseName}/biases`)
            ]);
        }
        this.nn.setWeights(weights);
    }
}
class Lstm {
    constructor(inputShape, units = 384) {
        this.dense = tf.sequential();
        this.units = units;
        function getLstm() {
            const lstm = tf.layers.lstm({
                inputShape,
                units,
                returnSequences: true,
                recurrentActivation: 'sigmoid',
                returnState: true,
                kernelInitializer: 'zeros',
                recurrentInitializer: 'zeros',
                biasInitializer: 'zeros',
                trainable: false
            });
            const inputs = [
                tf.input({ shape: inputShape }), tf.input({ shape: [units] }),
                tf.input({ shape: [units] })
            ];
            const outputs = lstm.apply(inputs);
            return tf.model({ inputs, outputs });
        }
        this.lstm = getLstm();
        this.dense.add(tf.layers.dense({
            inputShape: [null, units],
            units: MIDI_PITCHES,
            activation: 'sigmoid',
            trainable: false
        }));
    }
    dispose() {
        this.lstm.dispose();
        this.dense.dispose();
    }
    setWeights(vars, scope, denseName) {
        function getVar(name) {
            const v = vars[name];
            if (v === undefined) {
                throw Error(`Variable not found: ${name}`);
            }
            return v;
        }
        const reorderGates = ((weights, forgetBias = 0) => {
            const [i, c, f, o] = tf.split(weights, 4, -1);
            return tf.concat([i, f.add(tf.scalar(forgetBias)), c, o], -1);
        });
        const splitAndReorderKernel = ((kernel) => tf.split(reorderGates(kernel), [kernel.shape[0] - this.units, this.units]));
        const LSTM_PREFIX = 'cudnn_lstm/rnn/multi_rnn_cell/cell_0/cudnn_compatible_lstm_cell';
        const setLstmWeights = (lstm) => lstm.setWeights(splitAndReorderKernel(getVar(`${scope}/${LSTM_PREFIX}/kernel`))
            .concat(reorderGates(getVar(`${scope}/${LSTM_PREFIX}/bias`), 1.0)));
        setLstmWeights(this.lstm);
        this.dense.setWeights([
            getVar(`${scope}/${denseName}/weights`),
            getVar(`${scope}/${denseName}/biases`)
        ]);
    }
    predict(inputs, chunkSize) {
        return tf.tidy(() => this.predictImpl(inputs, chunkSize));
    }
    predictImpl(inputs, chunkSize) {
        const fullLength = inputs.shape[1];
        const numChunks = Math.ceil(fullLength / chunkSize);
        let state = [tf.zeros([1, this.units]), tf.zeros([1, this.units])];
        const outputChunks = [];
        for (let i = 0; i < numChunks; ++i) {
            const chunk = inputs.slice([0, i * chunkSize], [-1, (i < numChunks - 1) ? chunkSize : -1]);
            const result = this.lstm.predict([
                chunk, state[0], state[1]
            ]);
            outputChunks.push(this.dense.predict(result[0]));
            state = result.slice(1);
        }
        return outputChunks.length === 1 ? outputChunks[0] :
            tf.concat3d(outputChunks, 1);
    }
}
export { OnsetsAndFrames };
//# sourceMappingURL=model.js.map