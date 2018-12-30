#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

rsync -avzh --info=progress2 dist/ pi@raspberrypi:server/dist/
scp package.json pi@raspberrypi:server/
