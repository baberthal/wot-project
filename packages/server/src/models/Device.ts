//===- db/models/Device.ts - Device Model ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  AllowNull,
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  Max,
  Min,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import { Value } from "./Value";

@DefaultScope({
  attributes: ["id", "name", "description", "pin"],
  include: []
})
@Table
export class Device extends Model<Device> {
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
  @Min(0)
  @Max(54)
  @Column(DataType.INTEGER)
  pin!: number;

  @HasMany(() => Value)
  values!: Value[];
}
