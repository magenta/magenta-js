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

"""
Dumps weights from TensorFlow checkpoints to a TensorFlow.js readable format.

Setup:
  You will need to first run `pip install tensorflowjs`.

Example usage:

$ python checkpoint_converter /path/to/checkpoint.ckpt /path/to/output \
  --remove_variables_regex='.*Adam.*|beta.*_power'
"""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
import os
import re
import tensorflow as tf
from tensorflowjs.quantization import QUANTIZATION_BYTES_TO_DTYPES
from tensorflowjs.write_weights import write_weights


def dump_checkpoint(
    checkpoint_file, output_dir, shard_mb=4, remove_variables_regex=None,
    quantization_dtype=None):
  reader = tf.train.NewCheckpointReader(checkpoint_file)
  var_to_shape_map = reader.get_variable_to_shape_map()

  remove_variables_regex_re = (
      re.compile(remove_variables_regex) if remove_variables_regex else None)

  entries = []
  for var_name, shape in var_to_shape_map.items():
    if (remove_variables_regex_re and remove_variables_regex_re.match(var_name)
        or var_name == 'global_step'):
      print('Ignoring Regex Match: ' + var_name)
      continue
    if not shape:
      print('Ignoring Scalar: ' + var_name)
      continue

    tensor = reader.get_tensor(var_name)
    entries.append({'name': var_name, 'data': tensor})
    print('Dumping %s (%r)' %  (var_name, shape))

  write_weights(
    [entries],
    output_dir,
    write_manifest=True,
    quantization_dtype=quantization_dtype,
    shard_size_bytes=shard_mb * 1024 * 1024)

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument(
      'checkpoint_file',
      type=str,
      help='Path to the model checkpoint')
  parser.add_argument(
      'output_dir',
      type=str,
      help='The output directory where to store the converted weights')
  parser.add_argument(
      '--remove_variables_regex',
      type=str,
      default='',
      help='A regular expression to match against variable names that should '
      'not be included')
  parser.add_argument(
      '--quantization_bytes',
      type=int,
      choices=QUANTIZATION_BYTES_TO_DTYPES.keys(),
      help='How many bytes to optionally quantize/compress the weights to. 1- '
      'and 2-byte quantizaton is supported. The default (unquantized) size is '
      '4 bytes.')
  parser.add_argument(
      '--shard_megabytes',
      type=int,
      default=4,
      help='Number of megabytes per weight shard.')

  FLAGS, unparsed = parser.parse_known_args()

  if unparsed:
    parser.print_help()
    print('Unrecognized flags: ', unparsed)
    exit(-1)

  checkpoint_file = os.path.expanduser(FLAGS.checkpoint_file)
  output_dir = os.path.expanduser(FLAGS.output_dir)
  if not os.path.exists(output_dir):
    os.makedirs(output_dir)

  quantization_dtype = (
      QUANTIZATION_BYTES_TO_DTYPES[FLAGS.quantization_bytes]
      if FLAGS.quantization_bytes else None)
  dump_checkpoint(
      checkpoint_file,
      output_dir,
      FLAGS.shard_megabytes,
      FLAGS.remove_variables_regex,
      quantization_dtype)
