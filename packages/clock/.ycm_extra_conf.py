# Global ycm_extra_conf file.
#

import os
import platform

DIR_OF_THIS_SCRIPT = os.path.abspath(os.path.dirname(__file__))

#  Base Flag Constants {{{ #

BASE_WARNING_FLAGS = [
  # 'Hard mode'
  '-Wall',
  '-Wextra',

  # Some others that aren't included in the above.
  '-Wbool-conversion',
  '-Wconstant-conversion',
  '-Wdeprecated-declarations',
  '-Wdocumentation',
  '-Wempty-body',
  '-Wenum-conversion',
  '-Wimplicit-fallthrough',
  '-Wint-conversion',
  '-Winvalid-offsetof',
  '-Wnewline-eof',
  '-Wnon-virtual-dtor',
  '-Wsign-compare',
  '-Wunreachable-code',

  # Disable the most pedantic (like gnu extensions, etc.)
  '-Wno-gnu-zero-variadic-macro-arguments',
  '-Wno-variadic-macros',
]

# To get this list, run the following command, and copy-paste the lines under
# the `#include <...> search starts here:` heading:
#
#     echo | clang -v -E -x c++ -
#
# Note you will have to prepend `-isystem` to each include path. Paths that
# end with `(framework directory)` should be prepended with `-F`.
XCTOOLCHAIN_PATH = ('/Applications/Xcode.app/Contents/Developer' +
  '/Toolchains/XcodeDefault.xctoolchain')

BASE_INCLUDE_FLAGS = [
  '-isystem',
  '{0}/usr/include/c++/v1'.format(XCTOOLCHAIN_PATH),
  '-isystem',
  '{0}/usr/lib/clang/10.0.0/include'.format(XCTOOLCHAIN_PATH),
  '-isystem',
  '{0}/usr/include'.format(XCTOOLCHAIN_PATH),
  '-isystem',
  '/usr/include',
  '-isystem',
  '/usr/local/include',
  # '/System/Library/Frameworks' (framework directory)
  # '/Library/Frameworks' (framework directory)
]

NODENV_ROOT = os.path.expanduser('~/.nodenv')

NODE_MODULE_ROOT = os.path.abspath('../../node_modules')

NODE_INCLUDE_FLAGS = [
  '-isystem',
  '{0}/nan'.format(NODE_MODULE_ROOT),
  '-isystem',
  '{0}/versions/10.15.1/include/node'.format(NODENV_ROOT)
]

SOURCE_EXTENSIONS = [
  '.cpp',
  '.cxx',
  '.cc',
  '.c',
  '.m',
  '.mm',
]

HEADER_EXTENSIONS = [
  '.h',
  '.hxx',
  '.hpp',
  '.hh',
  '',  # empty for standard library headers
]

SOURCE_DIRECTORIES = ['src', 'lib']

HEADER_DIRECTORIES = ['include']

flags = BASE_WARNING_FLAGS + ['-x', 'c++'] + BASE_INCLUDE_FLAGS + NODE_INCLUDE_FLAGS

if platform.system() != 'Windows':
  flags.append('-std=c++11')

#  }}} Base Flag Constants #


def isHeaderFile(filename):
    ext = os.path.splitext(filename)[1]
    return ext in HEADER_EXTENSIONS


def FindCorrespondingSourceFile(filename):
    if isHeaderFile(filename):
        basename = os.path.splitext(filename)[0]
        for extension in SOURCE_EXTENSIONS:
            replacement_file = basename + extension
            if os.path.exists(replacement_file):
                return replacement_file
    return filename


# Settings - Where the magic happens.
def Settings(**kwargs):
  language = kwargs['language']

  if language == 'cfamily':
    filename = FindCorrespondingSourceFile(kwargs['filename'])

    return {
      'flags': flags,
      'include_paths_relative_to_dir': DIR_OF_THIS_SCRIPT,
      'override_filename': filename
    }

  return {}
