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

# Clone magenta repo to get proto file
git clone https://github.com/tensorflow/magenta.git
# Compile js
yarn pbjs --force-number -t static-module -w commonjs -o src/protobuf/proto.js magenta/magenta/protobuf/music.proto
# Compile ts
yarn pbts -o src/protobuf/proto.d.ts src/protobuf/proto.js
# Replace Long types with number
sed -i '' 's/reader.int64();/reader.int64().toNumber();/g' src/protobuf/proto.js
