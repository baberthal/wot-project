//===- charts/coord_system.ts - Coordinate System Interface ----------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface IAxisConfig {
  axisWidth: number;
}

export interface CoordSystemConfig {
  palette: {
    lineFill: [string, string];
    pointFill: string;
    pointStroke: string;
  };
}
