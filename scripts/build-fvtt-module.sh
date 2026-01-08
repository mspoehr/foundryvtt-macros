#!/usr/bin/env bash

mkdir -p build/packs
find macros -name "*.json" -type f -exec cp {} ./build/ \;
rm build/_Folder.json

cp -r icons build/

python3 scripts/js_to_json.py macros build

folders=$(find macros -name _Folder.json)

for folder in $folders; do
  folder_filename=$(jq -r '.name + "_" + ._id + ".json"' "$folder")
  cp "$folder" "build/$folder_filename"
done

fvtt package --id michaels-modules --type Module -n michaels-macros pack --inputDirectory build --outputDirectory build/packs
rm build/*.json

MANIFEST_URL="https://github.com/mspoehr/foundryvtt-macros/releases/download/$VERSION/module.json"
DOWNLOAD_URL="https://github.com/mspoehr/foundryvtt-macros/releases/download/$VERSION/michaels-macros.zip"

jq ". + {\"version\": \"$VERSION\", \"manifest\": \"$MANIFEST_URL\", \"download\": \"$DOWNLOAD_URL\"}" module.json > build/module.json

cd build
zip -r michaels-macros.zip *