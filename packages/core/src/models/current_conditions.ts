//===- models/current_conditions.ts - CurrentConditions Interface ----------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface CurrentConditions {
  temperature: {
    t: number;
    unit: string;
  };
  humidity: {
    h: number;
    unit: string;
  };
}
