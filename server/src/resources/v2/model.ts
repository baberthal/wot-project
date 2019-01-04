//===- resources/v2/model.ts - V2 Resources Model --------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface WebThingResource {
  url: string;
  name: string;
}

export interface WebThingLink {
  rel: string;
  title: string;
}

export interface WebThingLinks {
  meta: WebThingLink;
  doc: WebThingLink;
  ui: WebThingLink;

  [rel: string]: WebThingLink;
}

export interface WebThingCommon {
  id: string;
  name: string;
  description: string;
  url: string;
  version: string;
  tags: string[];
  resources: {
    [rel: string]: WebThingResource;
  };
}

// export interface LinkBase {
//   link: string;
//   title: string;
// }

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
