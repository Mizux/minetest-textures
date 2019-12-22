#!/bin/bash
set -e

if [ -n "$1" ]; then
{
  command -v gimp
	cat <<EOF
  (define (convert-xcf-to-png infile outfile)
  ( let* (
  (image (car (gimp-file-load RUN-NONINTERACTIVE infile infile)))
  (drawable (car (gimp-image-merge-visible-layers image CLIP-TO-IMAGE)))
  )

  (gimp-image-scale-full image $1 $1 INTERPOLATION-LANCZOS)
  (file-png-save-defaults RUN-NONINTERACTIVE image drawable outfile outfile)
  (gimp-image-delete image)
  )
  )

(gimp-message-set-handler 1)
EOF
  mkdir -pv ../output
  for i in *.xcf;
  do
    echo "(gimp-message \"$i\")"
    echo "(convert-xcf-to-png \"$i\" \"../output/${i%.xcf}.png\")"
  done

  echo "(gimp-quit 0)"
} | gimp -i -b -
else
  echo "Resize and export to png every xcf image file"
  echo "Need gimp"
  echo "usage: $0 size"
  exit 1
fi
