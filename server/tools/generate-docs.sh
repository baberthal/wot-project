#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# Generate documentation for a project

__ScriptVersion="0.1.0"
__ProgramName="$(basename $0)"

#===  FUNCTION  ================================================================
#         NAME:  usage
#  DESCRIPTION:  Display usage information.
#===============================================================================
function usage() {
  echo "Usage : $__ProgramName [options] MODULE_DIRECTORY [--]

    Options:
    -h|help       Display this message
    -v|version    Display script version"

} # ----------  end of function usage  ----------

#-----------------------------------------------------------------------#
#  Set default options
#-----------------------------------------------------------------------#

MODULE_DIRECTORY=

#-----------------------------------------------------------------------#
#  Handle command line arguments
#-----------------------------------------------------------------------#

while getopts ":hv" opt; do
  case $opt in

    h | help)
      usage
      exit 0
      ;;

    v | version)
      echo "$__ProgramName -- Version $__ScriptVersion"
      exit 0
      ;;

    *)
      echo -e "\n  Option does not exist : $OPTARG\n"
      usage
      exit 1
      ;;

  esac # --- end of case ---
done
shift $(($OPTIND - 1))

if [[ $# < 1 ]]; then
  usage
  exit 1
fi
