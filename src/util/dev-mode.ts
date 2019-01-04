//===- util/dev-mode.ts - Check if ENV is development or production --------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

const _isDevMode = process.env.NODE_ENV !== "production";

export function isDevMode(): boolean {
  return _isDevMode;
}

export default isDevMode;
