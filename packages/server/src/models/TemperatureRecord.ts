//===- models/TemperatureRecord.ts - TemperatureRecord model ---------------===//
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
export class TemperatureRecord extends Model<TemperatureRecord> {
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
}
