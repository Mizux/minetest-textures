#!/bin/sh
set -xe

SIZE=512

# verify Inkscape is installed
command -v inkscape
mkdir -pv output

for i in src/*.svg; do
  FILE=$(basename $i)
	inkscape -C -w $SIZE -h $SIZE $i -e output/${FILE%.svg}.png;
done;

# installing in user
OUT_DIR=${HOME}/.minetest/textures/deus_ex
mkdir -p "$OUT_DIR"
cp -r output/*.png "$OUT_DIR"
