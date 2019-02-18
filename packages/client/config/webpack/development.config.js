// Development Webpack Configuration

const merge = require("webpack-merge");
const webpack = require("webpack");

const baseConfig = require("./base.config");
const stats = require("./stats.config");
const css = require("./css-loaders.config");

const devConfig = {
  mode: "development",

  output: {
    filename: "[name].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: css.createRules({ dialect: "css", mode: "dev" })
      },
      {
        test: /\.scss$/,
        use: css.createRules({ dialect: "scss", mode: "dev" })
      }
    ]
  },

  devtool: "#eval-source-map",

  plugins: [new webpack.HotModuleReplacementPlugin(), ...css.plugins("dev")],

  devServer: {
    hot: true,
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
