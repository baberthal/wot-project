//===- util/ctype.ts - NodeJS FFI for ctype (see ctype(3)) -----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export function isdigit(str: string): boolean {
  return /^\d+$/.test(str);
}
