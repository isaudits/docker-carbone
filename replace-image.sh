#!/bin/sh

## Argument List
# FILENAME=$1
# NEWFILENAME=$2
# DOCIMGPATH=$3
# NEWIMGURL=$4

unzip -o $1 -d temp/

cd temp/

wget -O temp.png $4 

rm $3

cp temp.png $3

zip -r $2 *