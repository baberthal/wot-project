// Database Config

const path = require("path");

module.exports = {
  development: {
    database: "wot_development",
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../dist/db/wot_development.sqlite")
  },
  test: {
    database: "wot_test",
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    database: "wot_production",
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../dist/db/wot_production.sqlite")
  }
};
