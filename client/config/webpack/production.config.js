// Production Webpack Configuration

const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require("./base.config");
const css = require("./css-loaders.config");

const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",

  output: {
    filename: "[name].[hash].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: css.createRules({ dialect: "css", mode: "prod" })
      },
      {
        test: /\.scss$/,
        use: css.createRules({ dialect: "scss", mode: "prod" })
      }
    ]
  },

  devtool: "#sourcemap",

  optimization: {
    minimize: true,
    nodeEnv: "production"
  },

  plugins: [
    ...css.plugins("prod"),
    new CleanWebpackPlugin(["dist"]),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.ProgressPlugin()
  ]
});
