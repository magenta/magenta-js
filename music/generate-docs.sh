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

# Regenerates the docs
#
# To run, execute 'yarn doc'.

# Generate the docs.
npx typedoc --sourcefile-url-prefix 'https://github.com/tensorflow/magenta-js/tree/master/music/src/' --out ../docs/music src --mode modules --excludePrivate --exclude '**/*+(index|test).ts' --excludeExternals

# Fix any leaked local paths in the music docs
# See https://github.com/TypeStrong/typedoc/issues/800.
cd ../docs/music/classes/

for path in ./*.html; do
  # Since we have to manually hardcode the correct paths, only look
  # in the custom exception classes that we know this definitely happens for.
  filename=$(basename $path .html)
  if [[ $filename = *"exception"* ]]; then
    path1=`expr "$filename" : '_\(.*\)_.*_'`  # core
    path2=`expr "$filename" : '_.*_\(.*\)_.*'`  # chords
    correct_source_file=$path1/$path2.ts

    # We need to do 2 replacements, once in the href, and once in the <a> text content.
    # First replace the path in the href.
    search="src//Users/.*\">"
    replace="src/${correct_source_file}\">"

    # sed lets you use a different delimeter so that you don't have to escape all the slashs.
    sed -i "" "s%${search}%${replace}%g" $path

    # Now replace the path in the text content.
    search=">/Users.*</a>"
    replace=">${correct_source_file}</a>"
    sed -i "" "s%${search}%${replace}%g" $path
  fi
done
