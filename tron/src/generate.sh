#!/bin/sh
set -xe

# verify Inkscape is installed
command -v inkscape
mkdir -pv ../output

for i in *.svg; do
	inkscape -C -w 128 -h 128 $i -e ../output/${i%.svg}.png;
done;
#mv *.png ../../minetest/data
