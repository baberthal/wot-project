//===- db/models/Sensor.ts - Sensor Model ----------------------------------===//
//
// Copyright (c) 2019 J. Morgan Lieberthal
// Licensed under the MIT License
//
//===-----------------------------------------------------------------------===//

import { Column, CreatedAt, Model, Table } from "sequelize-typescript";

@Table
export class Sensor extends Model<Sensor> {
  @Column name!: string;

  @Column description!: string;

  @Column unit!: string;

  @Column value!: number;

  @Column gpio!: number;
}
