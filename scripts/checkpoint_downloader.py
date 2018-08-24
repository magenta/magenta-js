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

$ python3 checkpoint_downloader /checkpoint/url/ /path/to/output
"""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import argparse
import json
import os
import urllib2

MANIFEST_FNAME = 'weights_manifest.json'
CONFIG_FNAME = 'config.json'

def download_checkpoint(checkpoint_url, output_dir):
  try:
    response = urllib2.urlopen(
        os.path.join(checkpoint_url, MANIFEST_FNAME))
  except urllib2.HTTPError as e:
    print('Invalid checkpoint URL: ' + e.msg)
    return

  print('Downloaded weights manifest.')
  raw_manifest = response.read()
  file(os.path.join(output_dir, MANIFEST_FNAME), 'w').write(raw_manifest)

  manifest = json.loads(raw_manifest)
  for p in manifest[0]['paths']:
    print('Downloading weights: `%s`.' % p)
    try:
      response = urllib2.urlopen(os.path.join(checkpoint_url, p))
    except urllib2.HTTPError as e:
      print('Download failed, quitting: ' + e.msg)
    file(os.path.join(output_dir, p), 'wb').write(response.read())

  print('Downloading config.')
  try:
    response = urllib2.urlopen(os.path.join(checkpoint_url, CONFIG_FNAME))
  except urllib2.HTTPError as e:
    # The config is not always needed.
    print('No config present.')
  else:
    file(os.path.join(output_dir, CONFIG_FNAME), 'w').write(response.read())

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
