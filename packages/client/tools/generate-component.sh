#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

: ${DEBUG:=1}
: ${DRY_RUN:=""}

function log() { echo "$@"; }

function dbg() {
  if [[ $DEBUG ]]; then
    log "$@"
  fi
}

log "DEBUG: ${DEBUG}"
log "DRY_RUN: ${DRY_RUN}"

function call() {
  if [[ ${DRY_RUN} ]]; then
    echo "dry run..."
    echo "${PS4}"$(quoted_print "$@")
  else
    { set -x; } 2>/dev/null
    "$@"
    { set +x; } 2>/dev/null
  fi
}

function quoted_print() {
  python -c 'import pipes; import sys; print(" ".join(pipes.quote(arg) for arg in sys.argv[1:]))' "$@"
}

function to_comp_name() {
  echo $1 | tr '_' '-'
}

function shortpath() {
  echo "${1#${CLIENT_ROOT}/}"
}

function generate_index_file() {
  local component_name=$1
  local index_file=$2

  if [[ ${DRY_RUN} ]]; then
    echo "${PS4}"$(quoted_print "cat \$index_content > ${index_file}")
    return
  fi

  cat <<EOF >${index_file}
//===--- index.ts ----------------------------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export * from "./${component_name}.component";
export { default } from "./${component_name}.component";
EOF
}

THIS_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
CLIENT_ROOT="$(realpath "${THIS_DIRECTORY}/..")"
SRC_DIR="${CLIENT_ROOT}/src"
COMPONENT_SRC_DIR="${SRC_DIR}/components"

#===  FUNCTION  ================================================================
#         NAME:  main
#  DESCRIPTION:  Main function for this script
#===============================================================================
function main() {
  local component_name=${1:?Must provide a component name!}
  component_name=$(to_comp_name $component_name)

  local component_root="${COMPONENT_SRC_DIR}/${component_name}"
  dbg "creating directory: $(shortpath ${component_root})"
  call mkdir -p "${component_root}"

  local component_main_file="${component_root}/${component_name}.component.ts"
  dbg "creating component file: $(shortpath ${component_main_file})"
  call touch "${component_main_file}"

  local component_tmpl_file="${component_root}/${component_name}.template.html"
  dbg "creating template file: $(shortpath ${component_tmpl_file})"
  call touch "${component_tmpl_file}"

  local index_file="${component_root}/index.ts"
  dbg "creating export bucket: $(shortpath ${index_file})"
  generate_index_file "${component_name}" "${index_file}"
}
# ---------- end of function main ----------

main $@
