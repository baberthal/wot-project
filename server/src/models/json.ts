//===- util/json.ts - JSON Type Definitions --------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonPrimitiveValue = string | number | boolean | JsonObject;

export type JsonValue = JsonPrimitiveValue | JsonPrimitiveValue[];

export type JsonArray = JsonValue[];
