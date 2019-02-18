// eslint configuration

module.exports = {
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  env: {
    node: true
  },
  rules: {
    "spaced-comment": "off",
    "no-console": "off",
    "prettier/prettier": ["warn"]
  }
};
