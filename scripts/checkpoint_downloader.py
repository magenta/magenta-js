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
Download all necessary files from a Magenta.js checkpoint URL.

Example usage:

$ python checkpoint_downloader /checkpoint/url/ /path/to/output
"""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from future.moves.urllib.request import urlopen, Request
from future.moves.urllib.error import HTTPError

import argparse
import json
import os


MANIFEST_FNAME = 'weights_manifest.json'
CONFIG_FNAME = 'config.json'

def _join_url(*parts):
  return '/'.join(parts)

def download_checkpoint(checkpoint_url, output_dir):
  try:
    response = urlopen(_join_url(checkpoint_url, MANIFEST_FNAME))
  except HTTPError as e:
    print(_join_url(checkpoint_url, MANIFEST_FNAME))
    print('Invalid checkpoint URL: ' + e.msg)
    return

  print('Downloaded weights manifest.')
  raw_manifest = response.read()
  open(os.path.join(output_dir, MANIFEST_FNAME), 'wb').write(raw_manifest)

  manifest = json.loads(raw_manifest)
  for p in manifest[0]['paths']:
    print('Downloading weights: `%s`.' % p)
    try:
      response = urlopen(_join_url(checkpoint_url, p))
    except HTTPError as e:
      print('Download failed, quitting: ' + e.msg)
    open(os.path.join(output_dir, p), 'wb').write(response.read())

  print('Downloading config.')
  try:
    response = urlopen(_join_url(checkpoint_url, CONFIG_FNAME))
  except HTTPError as e:
    # The config is not always needed.
    print('No config present.')
  else:
    open(os.path.join(output_dir, CONFIG_FNAME), 'wb').write(response.read())

  print('Done.')

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument(
      'checkpoint_url',
      type=str,
      help='Magenta.js checkpoint URL')
  parser.add_argument(
      'output_dir',
      type=str,
      help='The output directory where to store the converted weights')
  FLAGS, unparsed = parser.parse_known_args()

  if unparsed:
    parser.print_help()
    print('Unrecognized flags: ', unparsed)
    exit(-1)

  output_dir = os.path.expanduser(FLAGS.output_dir)
  if not os.path.exists(output_dir):
    os.makedirs(output_dir)

  download_checkpoint(FLAGS.checkpoint_url, output_dir)
