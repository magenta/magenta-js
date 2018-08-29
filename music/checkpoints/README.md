
# Hosted Checkpoints

Short link: https://goo.gl/magenta/js-checkpoints

You can load the pre-trained checkpoints below in your app directly from our
server with the links provided. If you would like to download the checkpoint
to use locally or host yourself, pass the link to our
[checkpoint downloader script](/scripts/checkpoint_downloader.py).

For example, to download the `basic_rnn` checkpoint, you would run:

```bash
python ./scripts/checkpoint_downloader https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn ./my-checkpoints/
```

## JSON Index

A JSON index of available checkpoints is at
https://goo.gl/magenta/js-checkpoints-json, formatted as a list of entries with
the following interface:

```ts
interface Checkpoint {
  id: string;  // A unique id for this checkpoint.
  model: 'MusicRNN'|'MusicVAE';  // The model class.
  sizeMb: number;  // The size of the weights in megabytes.
  description: string;  // A short human-readable description of the trained model.
  url: string;  // Path to the checkpoint directory.
}
```

While we do not plan to remove any of the current checkpoints, we will be adding more in the future.

If your application has a high QPS, you must mirror these files on your own server.

## Table

ID|Model|Description|Size MB|URL
---|---|---|---|---
drums_2bar_lokl_small|MusicVAE|A 2-bar, 9-class onehot drum model with a strong prior (low KL divergence), which is better for sampling. Less accurate, but smaller in size than full model.|18.5|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_lokl_small)
drums_2bar_hikl_small|MusicVAE|A 2-bar, 9-class onehot drum model with a weak prior (higher KL divergence), which is better for reconstructions and interpolations. Less accurate, but smaller in size than full model.|18.5|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_hikl_small)
drums_2bar_nade_9_q2|MusicVAE|A 2-bar, 9-class multilabel drum model with a NADE decoder. Quantized to 2-byte weights.|27.6|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_nade_9_q2)
mel_2bar_small|MusicVAE|A 2-bar, 90-class onehot melody model. Less accurate, but smaller in size than full model.|17.7|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_2bar_small)
mel_4bar_small_q2|MusicVAE|A 4-bar, 90-class onehot melody model. Less accurate, but smaller in size than full model. Quantized to 2-byte weights.|26.5|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2)
mel_chords|MusicVAE|A 2-bar, 90-class onehot melody model with chord conditioning. Quantized to 2-byte weights.|17.6|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_chords)
mel_16bar_small_q2|MusicVAE|A 16-bar, 90-class onehot melody model with a 16-step conductor level. Less accurate, but smaller in size than full model. Quantized to 2-byte weights.|23.5|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_16bar_small_q2)
trio_4bar_lokl_small_q1|MusicVAE|A 4-bar, 'trio' model for melody, bass, and drums, with a 4-step conductor level. Trained with a strong prior (low KL divergence), which is better for sampling. Less accurate, but smaller in size than full model. Quantized to 1-byte weights.|17.6|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/trio_4bar)
basic_rnn|MusicRNN|A 36-class onehot MelodyRNN model. Converted from http://download.magenta.tensorflow.org/models/basic_rnn.mag.|13.0|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn)
drum_kit_rnn|MusicRNN|A 9-class onehot DrumsRNN model. Converted from http://download.magenta.tensorflow.org/models/drum_kit_rnn.mag.|11.9|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn)
chord_pitches_improv|MusicRNN|A 36-class onehot melody ImprovRNN model conditioned on chords as described at https://github.com/tensorflow/magenta/tree/master/magenta/models/improv_rnn#chord-pitches-improv. Converted from http://download.magenta.tensorflow.org/models/chord_pitches_improv.mag.|5.6|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv)
multitrack|MusicVAE|A 1-bar multitrack model, trained with 64 free bits. Quantized to 1-byte weights.|26.4|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack)
multitrack_med|MusicVAE|A larger 1-bar multitrack model, trained with 64 free bits. Quantized to 1-byte weights.|95.9|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack_med)
multitrack_med_fb256|MusicVAE|A larger 1-bar multitrack model, trained with 256 free bits. Quantized to 1-byte weights.|95.9|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack_med_fb256)
multitrack_chords|MusicVAE|A 1-bar chord-conditioned multitrack model, trained with 64 free bits. Quantized to 1-byte weights.|26.9|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack_chords)
multitrack_med_chords|MusicVAE|A larger 1-bar chord-conditioned multitrack model, trained with 64 free bits. Quantized to 1-byte weights.|96.9|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack_med_chords)
multitrack_med_chords_fb256|MusicVAE|A larger 1-bar chord-conditioned multitrack model, trained with 256 free bits. Quantized to 1-byte weights.|96.9|[Right Click to Copy](https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/multitrack_med_chords_fb256)
