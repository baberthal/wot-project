// Development Webpack Configuration

const merge = require("webpack-merge");

const baseConfig = require("./base.config");
const stats = require("./stats.config");

const devConfig = {
  mode: "development",

  devtool: "#eval-source-map",

  devServer: {
    historyApiFallback: true,
    clientLogLevel: "none",
    noInfo: true,
    overlay: true,
    contentBase: "./dist",
    host: "0.0.0.0",
    port: 8080,
    disableHostCheck: true,
    stats
  }
};

module.exports = merge(baseConfig, devConfig);
