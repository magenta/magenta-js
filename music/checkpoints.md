# Hosted Checkpoints
JSON file: https://goo.gl/magenta/tfjs-checkpoints 
ID|Model|Description
---|---|---
drums_2bar_lokl_small|MusicVAE|A 2-bar, 9-class onehot drum model with a strong prior (low KL divergence), which is better for sampling. Less accurate, but smaller in size than full model.
drums_2bar_hikl_small|MusicVAE|A 2-bar, 9-class onehot drum model with a weak prior (higher KL divergence), which is better for reconstructions and interpolations. Less accurate, but smaller in size than full model.
drums_2bar_nade_9|MusicVAE|A 2-bar, 9-class multilabel drum model with a NADE decoder.
mel_2bar_small|MusicVAE|A 2-bar, 90-class onehot melody model. Less accurate, but smaller in size than full model.
mel_16bar_small|MusicVAE|A 16-bar, 90-class onehot melody model with a 16-step conductor level. Less accurate, but smaller in size than full model.
trio_4bar_small|MusicVAE|A 4-bar, 'trio' model for melody, bass, and drums, with a 4-step conductor level. Less accurate, but smaller in size than full model.
basic_rnn|MusicRNN|A 36-class onehot MelodyRNN model. Converted from http://download.magenta.tensorflow.org/models/basic_rnn.mag.
drum_kit_rnn|MusicRNN|A 9-class onehot DrumsRNN model. Converted from http://download.magenta.tensorflow.org/models/drum_kit_rnn.mag.
chord_pitches_improv|MusicRNN|A 36-class onehot melody ImprovRNN model conditioned on chords as described at https://github.com/tensorflow/magenta/tree/master/magenta/models/improv_rnn#chord-pitches-improv. Converted from http://download.magenta.tensorflow.org/models/chord_pitches_improv.mag.
