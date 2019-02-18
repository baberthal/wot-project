//===- util/test-mode.ts - Returns true if NODE_ENV="test" -----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

// Cache this for faster responses, as it won't change after the process has
// started.
const _isTestMode = process.env.NODE_ENV === "test";

export function isTestMode() {
  return _isTestMode;
}

export default isTestMode;
