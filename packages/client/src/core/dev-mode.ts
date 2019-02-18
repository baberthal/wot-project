//===- core/dev-mode.ts - Function to check the run mode -------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

let _cachedIsDevMode: boolean | undefined;

export function isDevMode(): boolean {
  if (_cachedIsDevMode !== undefined) return _cachedIsDevMode;

  return (_cachedIsDevMode = process.env.NODE_ENV !== "production");
}
