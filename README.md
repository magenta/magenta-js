<img src="https://github.com/tensorflow/magenta/raw/master/magenta-logo-bg.png" height="75">

**Magenta.js** is a collection of JavaScript libraries for doing inference with pre-trained Magenta models.
All libraries are published as [npm packages](https://www.npmjs.com/search?q=%40magenta).

Learn more about the Magenta project on our [blog](https://magenta.tensorflow.org) and [main repo](https://github.com/tensorflow/magenta).

## Libraries

* [core](core): A shared library containing core functions for processing NoteSequence protobufs, the primary data format in Magenta's music models.
* [protobuf](protobuf): A shared library containing the TypeScript implementation of NoteSequence protobufs.
* [music_rnn](music_rnn): A model library containing a [deeplearn.js][dljs] implementation of Magenta's [RNN-based music generation models](https://magenta.tensorflow.org/2016/06/10/recurrent-neural-network-generation-tutorial) including 
MelodyRNN, DrumsRNN, [PerformanceRNN](https://g.co/magenta/performance-rnn), and PolyphonyRNN, whose Python TensorFlow implementations can be found in the [main Magenta repo](https://github.com/tensorflow/magenta/tree/master/magenta/models).
* [music_vae](music_vae): A model library containing MusicVAE.js, a [deeplearn.js][dljs] implementation of Magenta's [MusicVAE](https://g.co/magenta/music-vae) model. The Python TensorFlow implementation can be found in the [main Magenta repo](https://goo.gl/magenta/musicvae-code).
