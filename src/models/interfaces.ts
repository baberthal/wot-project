//===- models/interfaces.ts - Model Interfaces -----------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface WebThingCommon {
  id: string /** required! */;

  createdAt?: string /** ISO8601 */;
  updatedAt?: string /** ISO8601 */;

  name?: string;
  description?: string;
  tags?: string[];
  customFields?: { [key: string]: any };
  links: WebThingLinks;
}

export interface WebThingLinks {
  model: WebThingLink;
  properties: WebThingLink;
  actions: WebThingLink;
  things: WebThingLink;
  subscriptions: WebThingLink;
  type: WebThingLink;
  product: WebThingLink;
  help: WebThingLink;
  ui: WebThingLink;
}

export interface WebThingLink {
  link: string /** required */;
  title: string /** required */;
}

export interface WebThingValue {
  name?: string;
  description?: string;
  type?: WebThingValueType;
  unit?: string /** SI string */;
  required?: boolean /** defaults to `true` */;
  minValue?: number;
  maxValue?: number;
}

export type WebThingValueType = "integer" | "float" | "boolean" | "string";
