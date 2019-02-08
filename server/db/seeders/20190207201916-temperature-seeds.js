"use strict";

function getRandomNum(min, max) {
  return +(Math.random() * (max - min + 1) + min).toFixed(2);
}

module.exports = {
  up: queryInterface => {
    let lastTimestamp = new Date("1/1/2019");
    let lastTemperature = getRandomNum(20, 30);

    const records = [];
    for (var i = 0; i < 40; i++) {
      records.push({ value: lastTemperature, timestamp: lastTimestamp });
      lastTimestamp = new Date(lastTimestamp.getTime() + 5000);
      lastTemperature += getRandomNum(-2, 2);
    }

    return queryInterface.bulkInsert("TemperatureRecord", records, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("TemperatureRecord", null, {});
  }
};
