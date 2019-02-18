//===- models/sensor_data.ts - Sensor Data Interface -----------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface SensorData {
  name: string;
  description: string;
  unit: string;
  type: "float" | "integer";
  value: number;
  timestamp: string;
  frequency: number;
}
