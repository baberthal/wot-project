//===- db/models/Sensor.ts - Sensor Model ----------------------------------===//
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
export class Sensor extends Model<Sensor> {
  @PrimaryKey
  @AllowNull(false)
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
  @Default("")
  @Column(DataType.STRING)
  unit!: string;

  // @Column value!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  gpio!: number;

  @ForeignKey(() => Device)
  @Column(DataType.STRING)
  deviceId!: string;

  @BelongsTo(() => Device)
  device!: Device;
}
