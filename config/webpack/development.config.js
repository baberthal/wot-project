// Development Webpack Configuration

const merge = require("webpack-merge");

const baseConfig = require("./base.config");

const devConfig = {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    contentBase: "./dist",
    disableHostCheck: true
  }
};

module.exports = merge(baseConfig, devConfig);
