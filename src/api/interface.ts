//===- api/interface.ts - API Interface ------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export abstract class API {
  abstract getDevices(): void;
}
