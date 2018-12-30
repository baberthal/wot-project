//===- resources/v2/model.ts - V2 Resources Model --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface WebThingBase {
  /** REQUIRED */
  id: string;
  tags?: string[];
}

export interface WebThingCommonBase {
  name: string;
  description?: string;
}

export interface WebThingCommon extends WebThingBase, WebThingCommonBase {
  name: string;
  description: string;
  tags: string[];
  customFields: {
    [key: string]: number | string | boolean;
  };
  links: WebThingLinksObject;
}

export interface WebThingLinkBase {
  link: string;
  title: string;
}

export interface WebThingLinksObject {
  [relType: string]: WebThingLinkBase | undefined;

  model?: WebThingLinkBase;
  properties?: WebThingLinkBase;
  actions?: WebThingLinkBase;
  things?: WebThingLinkBase;
  subscriptions?: WebThingLinkBase;
  type?: WebThingLinkBase;
  product?: WebThingLinkBase;
  help?: WebThingLinkBase;
  ui?: WebThingLinkBase;
}

export interface WebThingValuesObject {
  [valueName: string]: WebThingValue;
}

export interface WebThingValue {
  name: string;
  description: string;
}

export interface Timestamps {
  createdAt?: string;
  updatedAt?: string;
}

// export interface WebThingLinks {
//   model: LinkBase;
//   properties: LinkBase;
//   actions: LinkBase;
//   things: LinkBase;
//   subscriptions: LinkBase;
//   type: LinkBase;
//   product: LinkBase;
//   help: LinkBase;
//   ui: LinkBase;
//   [rel: string]: LinkBase;
// }

// export interface ValueKindMap {
//   integer: number;
//   float: number;
//   boolean: boolean;
//   string: string;
// }

// export interface Value {
//   valueName: string;
//   name?: string;
//   description?: string;
//   type?: "integer" | "float" | "boolean" | "string";
//   unit?: string;
//   required?: boolean;
//   minValue?: number;
//   maxValue?: number;
//   enum?: { [key: string]: string };
// }

// export interface WebThingResource {}
