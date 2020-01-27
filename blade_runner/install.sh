#!/usr/bin/env sh
set -xe

# installing in user
OUT_DIR=${HOME}/.minetest/textures/blade_runner
mkdir -p "$OUT_DIR"
cp -r output/*.png "$OUT_DIR"
