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
  @Column
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Default("")
  @Column
  description!: string;

  @AllowNull(false)
  @Default("")
  @Column
  unit!: string;

  // @Column value!: number;

  @AllowNull(false)
  @Column
  gpio!: number;

  @ForeignKey(() => Device)
  @Column
  deviceId!: string;

  @BelongsTo(() => Device)
  device!: Device;
}
