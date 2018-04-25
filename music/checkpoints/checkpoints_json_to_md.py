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

"""Convert checkpoints.json to checkpoints.md."""
import argparse
import json

COLUMNS = ['ID', 'Model', 'Description', 'URL']

def json_to_md(json_checkpoints):
  s = '|'.join(COLUMNS) + '\n'
  s += '|'.join(['---'] * len(COLUMNS)) + '\n'
  for ckpt in json_checkpoints:
    s += '|'.join([ckpt[c.lower()] for c in COLUMNS[:-1]])
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
      default='checkpoints.md')
  FLAGS, unparsed = parser.parse_known_args()

  if unparsed:
    parser.print_help()
    print('Unrecognized flags: ', unparsed)
    exit(-1)

  json_checkpoints = json.loads(open(FLAGS.input_json, 'r').read())
  md_checkpoints = ('# Hosted Checkpoints\n\n' +
                    'JSON file: https://goo.gl/magenta/tfjs-checkpoints\n\n' +
                    json_to_md(json_checkpoints))
  open(FLAGS.output_md, 'w').write(md_checkpoints)
