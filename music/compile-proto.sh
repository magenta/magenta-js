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

# Regenerates the protobuf
#
# To run, execute 'yarn proto'.

TMP_DIR=$(mktemp -d)
# Clone magenta repo to get proto file
git clone https://github.com/tensorflow/magenta.git $TMP_DIR
# Compile js
yarn pbjs --force-number -t static-module -w commonjs -o src/protobuf/proto.js $TMP_DIR/magenta/protobuf/music.proto
rm -fR $TMP_DIR
# Compile ts
yarn pbts -o src/protobuf/proto.d.ts src/protobuf/proto.js
# Replace Long types with number (bug: https://github.com/dcodeIO/protobuf.js/issues/1109)
sed -i '' 's/reader.int64();/$util.Long?reader.int64().toNumber():reader.int64();/g' src/protobuf/proto.js
