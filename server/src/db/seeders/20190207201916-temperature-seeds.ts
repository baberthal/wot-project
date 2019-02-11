"use strict";

import { QueryInterface, Sequelize } from "sequelize";

function getRandomNum(min: number, max: number) {
  return +(Math.random() * (max - min + 1) + min).toFixed(2);
}

export function up(
  queryInterface: QueryInterface,
  sequelize: Sequelize
): PromiseLike<any> {
  let lastTimestamp = new Date("1/1/2019");
  let lastTemperature = getRandomNum(20, 30);

  const records = [];
  for (let i = 0; i < 40; i++) {
    records.push({ value: lastTemperature, timestamp: lastTimestamp });
    lastTimestamp = new Date(lastTimestamp.getTime() + 5000);
    lastTemperature += getRandomNum(-2, 2);
  }

  return queryInterface.bulkInsert("TemperatureRecord", records, {});
}

export function down(
  queryInterface: QueryInterface,
  sequelize: Sequelize
): PromiseLike<any> {
  return queryInterface.bulkDelete("TemperatureRecord", null!, {});
}
