//===- api/weather.ts - Gets weather data from API -------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { fetchJson } from "./fetch-json";

export interface TemperatureDataRaw {
  name: string;
  description: string;
  type: "float" | "integer";
  unit: "celsius" | "fahrenheit";
  value: number;
  timestamp: string;
  frequency: number;
}

export interface TemperatureData {
  name: string;
  description: string;
  type: "float" | "integer";
  unit: "celsius" | "fahrenheit";
  value: number;
  timestamp: Date;
  frequency: number;
}

function convertRawTempData(raw: TemperatureDataRaw): TemperatureData {
  return {
    name: raw.name,
    description: raw.description,
    type: raw.type,
    unit: raw.unit,
    value: raw.value,
    frequency: raw.frequency,
    timestamp: new Date(raw.timestamp)
  };
}

export function getTemperatureData() {
  return fetchJson<TemperatureDataRaw>(
    "http://devices.webofthings.io/pi/sensors/temperature"
  ).then(raw => convertRawTempData(raw));
}

export interface WeatherData {
  temperature: TemperatureData;
}

export default getTemperatureData;

function isoTimestamp() {
  const d = new Date();
  return d.toISOString();
}

function randomInt(high = 40, low = -20) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
