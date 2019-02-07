// Jest configuration

const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./test/tsconfig.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsConfig: "./test/tsconfig.json",
      isolatedModules: true
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/test/"
  })
};
