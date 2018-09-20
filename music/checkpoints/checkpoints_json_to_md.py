#!/usr/bin/env python3
# Copyright 2018 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================
"""Convert checkpoints.json to README.md."""

import argparse
import json

COLUMNS = ['ID', 'Model', 'Description', 'Size MB', 'URL']

HEADER_TEXT = '''
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

'''

def json_to_md(json_checkpoints):
  s = '|'.join(COLUMNS) + '\n'
  s += '|'.join(['---'] * len(COLUMNS)) + '\n'
  for ckpt in json_checkpoints:
    s += '|'.join(
        [str(ckpt[c.lower().replace(' ', '_')]) for c in COLUMNS[:-1]])
    s += '|[Right Click to Copy](' + ckpt[COLUMNS[-1].lower()] + ')\n'
  return s

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument(
      '--input_json',
      type=str,
      help='Path to the input JSON file',
      default='checkpoints.json')
  parser.add_argument(
      '--output_md',
      type=str,
      help='Path to output Markdown file.',
      default='README.md')
  FLAGS, unparsed = parser.parse_known_args()

  if unparsed:
    parser.print_help()
    print('Unrecognized flags: ', unparsed)
    exit(-1)

  json_checkpoints = json.loads(open(FLAGS.input_json, 'r').read())
  open(FLAGS.output_md, 'w').write(HEADER_TEXT + json_to_md(json_checkpoints))
