// Jest Configuration

const path = require("path");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("../tsconfig.json");

const ROOT_DIR = path.resolve(__dirname, "../");

module.exports = {
  rootDir: ROOT_DIR,
  moduleFileExtensions: ["js", "json", "ts", "vue"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.html?$": "html-loader-jest"
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/"
  }),
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  snapshotSerializers: ["jest-serializer-vue"]
};
