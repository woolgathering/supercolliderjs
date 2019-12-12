#!/usr/bin/env bash

# Generate TypeDoc for each package

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT="$(dirname $DIR)"
DOCS_ROOT="$ROOT/docs/packages"
SRC="$ROOT/packages"

PACKAGES=$(ls -1 -d "$SRC"/*/)

for package in $PACKAGES
do
  echo "*** ${package}"
  name=$(basename $package)
  dir=$(dirname $package)
  DOCS="$DOCS_ROOT/$name/docs"
  JSON="$ROOT/docs/src/packages/$name/api.json"
  rm -rf "$DOCS"
  mkdir -p "$DOCS"
  options="${package}typedoc.json"
  if [ ! -e "$options" ]; then
    echo "{}" > "$options"
  fi

  # includes all external modules:
  # --includeDeclarations
  # echo typedoc --options "$options" --out "$DOCS" "${package}src/"
  (cd $package; typedoc --options "$options" --mode modules --toc index --readme none --ignoreCompilerErrors --excludeNotExported --exclude '"**/__tests__/**"' --out "$DOCS" --json "$JSON" "${package}src/")

done
