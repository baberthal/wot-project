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
  actuators: {
    [key: string]: {
      [key: string]: WebThingActuator;
    };
  };
}

export interface WebThingSensor extends GpioWebThing {
  unit?: string;
}

export interface WebThingActuator extends GpioWebThing {}

export interface GpioWebThing extends WebThingBase {
  gpio: number;
  value: number | string | boolean;
}

export interface WebThingCollection {
  [id: string]: WebThing;
}

import * as resources from "./resources.json";

export const model: WebThingCollection = resources;
