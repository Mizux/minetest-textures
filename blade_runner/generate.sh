#!/usr/bin/env sh
set -xe

SIZE=512

# verify Inkscape is installed
command -v inkscape
mkdir -pv output

for i in src/*.svg; do
  FILE=$(basename $i)
	inkscape -C -w $SIZE -h $SIZE $i -e output/${FILE%.svg}.png;
done;
