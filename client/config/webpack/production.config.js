// Production Webpack Configuration

const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./base.config");

const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",

  devtool: "#sourcemap",

  optimization: {
    minimize: true,
    nodeEnv: "production"
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.ProgressPlugin()
  ]
});
