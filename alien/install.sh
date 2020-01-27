#!/usr/bin/env sh
set -xe

# installing in user
OUT_DIR=${HOME}/.minetest/textures/alien
mkdir -p "$OUT_DIR"
cp -r output/*.png "$OUT_DIR"
