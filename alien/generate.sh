#!/bin/sh
set -xe

SIZE=512

cd src && ./xcf2png.sh $SIZE
