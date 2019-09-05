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
# To run, execute 'yarn docs' in the appropriate package directory.

# Direct usage:
# sh ./generate-docs.sh <package name (music|sketch|image)>

# Exit on error.
set -e

PKG_NAME=$1

# Directory/branch variables.
tmpDir=/tmp/${PKG_NAME}_docs
currBranch=$(git rev-parse --abbrev-ref HEAD)
currDir=$(pwd)
baseDir=$(git rev-parse --show-toplevel)

# Generation variables.
mode="modules"
tsconfig="tsconfig.json"
urlPrefix="https://github.com/tensorflow/magenta-js/tree/master/${PKG_NAME}/src/"
if [ $PKG_NAME == "image" ]
then
  mode="file"
  urlPrefix="$urlPrefix/arbitrary_stylization/"
elif [ $PKG_NAME == "music" ]
then
  tsconfig="tsconfig.es5.json"
fi

# Generate the docs.
npx typedoc --tsconfig $tsconfig --sourcefile-url-prefix $urlPrefix --out $tmpDir  --mode $mode --excludePrivate --exclude '**/*+(index|test|lib).ts' --excludeExternals src

# Fix any leaked local paths in the docs.
# See https://github.com/TypeStrong/typedoc/issues/800.
cd $tmpDir/classes/

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
mkdir -p $tmpDir/demos
# Or with true to avoid failing on a non-existent file extension.
cp demos/*.{js,html,mid,css} $tmpDir/demos | true

# Switch to gh-pages and update docs.
git checkout gh-pages
cd $baseDir
git rm -fr $PKG_NAME
# Use rsync instead of cp so that we don't clobber untracked files.
rsync -a $tmpDir/ $PKG_NAME/
git add $PKG_NAME
currDate=$(date)
git commit -m "Updating $PKG_NAME docs: $currDate"
git push --set-upstream origin gh-pages

# Switch back to original branch.
git checkout $currBranch
cd $currDir
