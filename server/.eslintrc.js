// eslint configuration

module.exports = {
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  env: {
    node: true
  },
  rules: {
    "spaced-comment": "off",
    "no-console": "off"
  }
};
