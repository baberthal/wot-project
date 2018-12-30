// Development Webpack Configuration

const merge = require("webpack-merge");

const baseConfig = require("./base.config");
const stats = require("./stats.config");

const devConfig = {
  mode: "development",

  devtool: "#eval-source-map",

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    host: "0.0.0.0",
    port: 8080,
    contentBase: "./dist",
    disableHostCheck: true,
    stats
  }
};

module.exports = merge(baseConfig, devConfig);
