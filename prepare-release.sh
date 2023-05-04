#!/bin/bash
cat <<<$(jq '.version |= "'$1'"' package.json) >package.json
cat <<<$(jq '.package.version |= "'$1'"' src-tauri/tauri.conf.json) >src-tauri/tauri.conf.json
