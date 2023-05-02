#!/bin/bash
cat <<<$(jq '.version |= "'$1'"' package.json) >package.json
cat <<<$(jq '.package.version |= "'$1'"' src-tauri/tauri.conf.json) >src-tauri/tauri.conf.json

cat <<<$(jq '.version |= "'$1'"' update.json) >update.json
cat <<<$(jq '.notes |= "'$2'"' update.json) >update.json
cat <<<$(jq '.pub_date |= "'$(date +%s)'"' update.json) >update.json
cat <<<$(jq '.platforms."windows-x86_64".url |= "https://github.com/ikiselev1989/ld-viewer-desktop/releases/download/'$1'/LudumDareViewer_'$1'_x64_en-US.msi.zip"' update.json) >update.json
