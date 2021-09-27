#!/bin/bash

npm run pub

export CURRENT_VERSION=$(grep \"version\": ./package.json | sed 's/.*: "\(.*\)".*/\1/')

echo $CURRENT_VERSION

git commit -am "release version $CURRENT_VERSION"

git push

git tag -a v$CURRENT_VERSION -m "release version $CURRENT_VERSION"

git push --tags