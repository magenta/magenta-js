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
ORG_NAME="tensorflow"

# Directory/branch variables.
tmpDir=/tmp/${PKG_NAME}_docs
currBranch=$(git rev-parse --abbrev-ref HEAD)
currDir=$(pwd)
baseDir=$(git rev-parse --show-toplevel)

# Generation variables.
mode="modules"
tsconfig="tsconfig.json"

urlPrefix="https://github.com/${ORG_NAME}/magenta-js/tree/master/${PKG_NAME}/src/"
keepAfter="/src/"
specialToc=""

if [ $PKG_NAME == "image" ]
then
  mode="file"
  urlPrefix="$urlPrefix/arbitrary_stylization/"
  keepAfter="/arbitrary_stylization/"
elif [ $PKG_NAME == "music" ]
then
  echo ""
  read -p "👋 Did you add a new top level export to src/index.ts? (y/n)? " -n 1 choice
  if [ $choice == "y" ]
  then
    echo "\n🛑 You need to edit 'generate-docs.sh' and add that export to the --toc parameter"
    echo "Then you can re-run this script!"
    exit 1
  else
    echo "\n👍 You're all good! Carry on!"
  fi

  tsconfig="tsconfig.es6.json"
  specialToc="--toc core,protobuf,coconet,music_rnn,music_vae,piano_genie,protobuf,transcription,gansynth"
fi

# Generate the docs.
rm -rf $tmpDir

npx typedoc src --out $tmpDir \
--tsconfig $tsconfig \
--mode "modules" \
--includeVersion --includeDeclarations \
--excludePrivate --excludeExternals --excludeNotExported \
--exclude '**/*+(index|test|lib).ts' \
${specialToc}

# The toc argument above contains exactly the list of exports in src/index.ts.
# This reduces the number of globas we're displaying in the side bar, which
# aren't actually usable in the library.

# This will generate a bunch of 'Defined in <a href="https://github.com/notwaldorf/magenta-js/blob/c48f0b9/music/src/..."''
# links that we need to change to 'Defined in <a href="${urlPrefix}/...' links.
# We used to be using typedoc-plugin-sourcefile-url to do this, but it stopped
# working at some point and for loops work well enough.

allFiles=$(find $tmpDir -type f -name '*.html')
for path in $allFiles; do
  filename=$(basename $path .html)

  # Fix "Defined in" links.
  if grep -Fq "Defined in" $path; then
    #echo "Fixing Defined in: $path"

    search="href=\".*${keepAfter}\(.*\)\""
    replace="href=\"${urlPrefix}\1\""

    sed -i "" "s%${search}%${replace}%g" $path
  fi

  # Fix any leaked local paths in the docs.
  # See https://github.com/TypeStrong/typedoc/issues/800.
  if grep -Fq "Users" $path; then
    #echo "Fixing local paths in: $path"

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

# Switch to gh-pages and reset any local changes
git checkout gh-pages
git fetch upstream
git reset --hard upstream/gh-pages
git push -f  # overwrite any local changes

cd $baseDir
git rm -fr $PKG_NAME --quiet

# Use rsync instead of cp so that we don't clobber untracked files.
rsync -a $tmpDir/ $PKG_NAME/
git add $PKG_NAME
currDate=$(date)
git commit -m "📖 Updating $PKG_NAME docs: $currDate"
git push --set-upstream origin gh-pages --quiet

# Switch back to original branch.
git checkout $currBranch
cd $currDir
