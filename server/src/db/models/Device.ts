//===- db/models/Device.ts - Device Model ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  AllowNull,
  Column,
  DefaultScope,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";

import { Sensor } from "./Sensor";

@DefaultScope({
  attributes: ["id", "name", "description", "port"],
  include: [
    {
      model: () => Sensor
    }
  ]
})
@Table
export class Device extends Model<Device> {
  @PrimaryKey
  @Column
  id!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  description!: string;

  @AllowNull(false)
  @Column
  port!: number;

  @HasMany(() => Sensor)
  sensors!: Sensor[];
}
