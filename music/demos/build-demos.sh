#!/bin/bash

# Copyright 2018 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# An install script for magenta (https://github.com/tensorflow/magenta).
# Run with: bash install_magenta.sh

# Builds all demos in the demos folder.
# Looks for all .html files and builds the corresponding .ts file as
# an _bundle.js file.
#
# To run, execute 'yarn build-demos'.

if [[ -n $1 ]]; then
  demos=( "${1}" )
else
  demos=( *.html )
fi

echo "Building ${demos[@]}..."

set -e
set -x

for demo in ${demos[@]}; do
  browserify "${demo/.html/.ts}" -p [tsify] > "${demo/.html/_bundle.js}"
done
