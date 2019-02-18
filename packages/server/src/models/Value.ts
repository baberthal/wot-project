//===- db/models/Value.ts - Value model ------------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import { Device } from "./Device";

@Table
export class Value extends Model<Value> {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  description!: string;

  @AllowNull(false)
  @Default("boolean")
  @Column(DataType.STRING)
  type!: "integer" | "float" | "boolean" | "string";

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  unit!: string;

  @AllowNull(false)
  @Default(true)
  @Column(DataType.BOOLEAN)
  required!: boolean;

  @ForeignKey(() => Device)
  @Column(DataType.STRING)
  deviceId!: string;

  @BelongsTo(() => Device)
  device!: Device;
}
