//===- resources/v1/model.ts - V1 Model ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface WebThingBase {
  name: string;
  description?: string;
}

export interface WebThing extends WebThingBase {
  description: string;
  port: number;
  sensors: {
    [key: string]: WebThingSensor;
  };
}

export interface WebThingSensor extends WebThingBase {
  unit?: string;
  value: number | string | boolean;
  gpio?: number;
}

export interface WebThingCollection {
  [id: string]: WebThing;
}
