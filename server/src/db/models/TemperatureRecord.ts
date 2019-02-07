//===- db/models/TemperatureRecord.ts - TemperatureRecord Model ------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import {
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  Model,
  Scopes,
  Table
} from "sequelize-typescript";

@DefaultScope({
  order: [["timestamp", "DESC"]],
  limit: 30
})
@Table({
  updatedAt: false
})
export class TemperatureRecord extends Model<TemperatureRecord> {
  @Column(DataType.FLOAT)
  readonly value!: number;

  @CreatedAt timestamp!: Date;
}
