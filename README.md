<img src="https://github.com/tensorflow/magenta/raw/master/magenta-logo-bg.png" height="75">

**Magenta.js** is a collection of TypeScript libraries for doing inference with pre-trained Magenta models.
All libraries are published as [npm packages](https://www.npmjs.com/search?q=%40magenta).

Learn more about the Magenta project at our [blog](https://magenta.tensorflow.org) and [main repo](https://github.com/tensorflow/magenta).

## Libraries

* [core](core): A shared library containing core functions for processing [NoteSequence protobufs][ns-proto], the primary data format in Magenta's music models. Implements a subset of the Python ["Magenta Music" library](https://github.com/tensorflow/magenta/tree/master/magenta/music).
* [protobuf](protobuf): A shared library containing the TypeScript implementation of [NoteSequence protobufs][ns-proto].
* [music_rnn](music_rnn): A model library containing a [deeplearn.js][dljs] implementation of Magenta's [RNN-based music generation models](https://magenta.tensorflow.org/2016/06/10/recurrent-neural-network-generation-tutorial) including 
MelodyRNN, DrumsRNN, [PerformanceRNN](https://g.co/magenta/performance-rnn), and PolyphonyRNN, whose Python TensorFlow implementations can be found in the [main Magenta repo](https://github.com/tensorflow/magenta/tree/master/magenta/models).
* [music_vae](music_vae): A model library containing MusicVAE.js, a [deeplearn.js][dljs] implementation of Magenta's [MusicVAE](https://g.co/magenta/music-vae) model. The Python TensorFlow implementation can be found in the [main Magenta repo](https://goo.gl/magenta/musicvae-code).

[dljs]: https://deeplearnjs.org
[ns-proto]: https://github.com/tensorflow/magenta/blob/master/magenta/protobuf/music.proto
