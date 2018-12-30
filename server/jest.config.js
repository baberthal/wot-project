// Jest configuration

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsConfig: "./test/tsconfig.json",
      isolatedModules: true
    }
  }
};
