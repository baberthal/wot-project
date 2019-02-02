//===- models/value.ts - Value Model ---------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import { BaseAttributes } from "./base";

export interface ValueAttributes extends BaseAttributes {
  name?: string;
  description?: string;
  type?: "integer" | "float" | "boolean" | "string";
  unit?: string;
  required?: boolean;
  minValue?: number;
  maxValue?: number;
}

@Table
export class Value extends Model<Value> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  description!: string;
}
