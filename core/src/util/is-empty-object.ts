//===- util/is-empty-object.ts - Check if an object is empty ---------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export function isEmptyObject(object: object): boolean {
  for (const key in object) {
    if (object.hasOwnProperty(key)) return false;
  }
  return true;
}

export default isEmptyObject;
