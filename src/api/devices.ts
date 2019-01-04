//===- api/devices.ts - API for Devices ------------------------------------===//
//
// Copyright (c) 2018 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { fetchJson } from "./fetch-json";
import { BaseDeviceInfo } from "@/store/models";

const GATEWAY_URL = "http://devices.webofthings.io";

export interface DeviceInfoResponse {
  [key: string]: BaseDeviceInfo;
}

export function getDevices(): Promise<{ [key: string]: BaseDeviceInfo }> {
  return fetchJson(GATEWAY_URL);
}

export function getDevice(slug: string): Promise<BaseDeviceInfo> {
  return fetchJson(`${GATEWAY_URL}/${slug}`); // TODO: Sanitize the slug
}
