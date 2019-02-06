//===- api/weather.ts - Gets weather data from API -------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { WebSocketSubject, webSocket } from "rxjs/websocket";

import { fetchJson } from "./fetch-json";

const BASE_URL = "http://devices.webofthings.io";
const WS_BASE_URL = "ws://devices.webofthings.io/pi/sensors";

export interface SensorData {
  name: string;
  description: string;
  unit: string;
  type: "float" | "integer";
  value: number;
  timestamp: string;
  frequency: number;
}

export interface WeatherData {
  temperature: SensorData;
  humidity: SensorData;
}

export function getSensorData(): Promise<WeatherData>;
export function getSensorData(): Promise<{ [k: string]: SensorData }>;
export function getSensorData(sensor: string): Promise<SensorData>;
export function getSensorData(sensor?: string) {
  const url = `${BASE_URL}/pi/sensors/${sensor ? sensor + "/" : ""}`;
  return fetchJson(url);
}

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

export function getCurrentConditions(): Promise<CurrentConditions> {
  return getSensorData().then(response => {
    const c = {
      temperature: {
        t: response.temperature.value,
        unit: response.temperature.unit
      },
      humidity: {
        h: response.humidity.value,
        unit: response.humidity.unit
      }
    };

    return c;
  });
}

export function getTemperatureStream(): WebSocketSubject<SensorData> {
  const deserializer = (e: MessageEvent) => JSON.parse(e.data);

  return webSocket({
    url: `${WS_BASE_URL}/temperature`,
    deserializer
  });
}
