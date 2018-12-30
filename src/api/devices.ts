//===- api/devices.ts - API for Devices ------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { fetchJson } from "./fetch-json";

export interface DeviceInfoLink {
  rel: string;
  title: string;
}

export interface DeviceInfoLinks {
  meta: DeviceInfoLink;
  doc: DeviceInfoLink;
  ui: DeviceInfoLink;
}

export interface DeviceInfoResource {
  url: string;
  name: string;
}

export interface DeviceInfoResources {
  sensors: DeviceInfoResource;
  actuators: DeviceInfoResource;
}

export interface BaseDeviceInfo {
  id: string;
  name: string;
  description: string;
  url: string;
  currentStatus: string;
  version: string;
  tags: string[];
  resources: DeviceInfoResources;
  links: DeviceInfoLinks;
}

export interface DeviceInfoResponse {
  [key: string]: BaseDeviceInfo;
}

export function getDevices(): Promise<DeviceInfoResponse> {
  return fetchJson("http://devices.webofthings.io");
}
