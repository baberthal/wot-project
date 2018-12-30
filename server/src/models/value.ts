//===- models/value.ts - Represents a value from a sensor ------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

export type ValueType = "integer" | "float" | "boolean" | "string";

export interface IntegerValue {
  type: "integer";
  value: number;
}

export interface FloatValue {
  type: "float";
  value: number;
}

export interface BooleanValue {
  type: "boolean";
  value: boolean;
}

export interface StringValue {
  type: "string";
  value: string;
}

export type SensorValue =
  | IntegerValue
  | FloatValue
  | BooleanValue
  | StringValue;
