#!/bin/sh
set -xe

# verify Inkscape is installed
command -v inkscape
mkdir -pv ../output

for i in *.svg; do
	inkscape -C -w 512 -h 512 $i -e ../output/${i%.svg}.png;
done;
#mv ../output/*.png .../minetest/data
