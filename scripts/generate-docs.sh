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
# To run, execute 'yarn docs'.

# Exit on error.
set -e

PKG_NAME=$1
URL_PREFIX=$2
MODE=$3
if [ -z "$4" ]
then
  TSCONFIG=""
else
  TSCONFIG="--tsconfig $4"
fi

# Set up variables.
TMP_DIR=/tmp/${PKG_NAME}_docs
currBranch=$(git rev-parse --abbrev-ref HEAD)
currDir=$(pwd)
baseDir=$(git rev-parse --show-toplevel)


# Generate the docs.
npx typedoc $TSCONFIG --sourcefile-url-prefix $URL_PREFIX --out $TMP_DIR src --mode $MODE --excludePrivate --exclude '**/*+(index|test|lib).ts' --excludeExternals

# Fix any leaked local paths in the docs.
# See https://github.com/TypeStrong/typedoc/issues/800.
cd $TMP_DIR/classes/

for path in ./*.html; do
  filename=$(basename $path .html)

  if grep -Fq "Users" $path; then
    echo "Fixing local paths in: $path"

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

# Build the demos and copy them to the temporary docs directory.
cd $currDir
yarn build-demos
mkdir -p $TMP_DIR/demos
# Or with true to avoid failing on a non-existent file extension.
cp demos/*.{js,html,mid,css} $TMP_DIR/demos | true

# Switch to gh-pages and update docs.
git checkout gh-pages
cd $baseDir
git rm -fr $PKG_NAME
# Use rsync instead of cp so that we don't clobber untracked files.
rsync -a $TMP_DIR/ $PKG_NAME/
git add $PKG_NAME
currDate=$(date)
git commit -m "Updating $PKG_NAME docs: $currDate"
git push --set-upstream origin gh-pages

# Switch back to original branch.
git checkout $currBranch
cd $currDir
