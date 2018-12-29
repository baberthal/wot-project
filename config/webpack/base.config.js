// Base Webpack Configuration

const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const BASE_DIR = path.resolve(__dirname, "../..");

const loaderConfigs = require("./loaders");

const TS_CONFIG = path.resolve(BASE_DIR, "tsconfig.json");

module.exports = {
  context: BASE_DIR,

  entry: {
    polyfills: "./src/polyfills.ts",
    index: "./src/index.ts"
  },

  output: {
    path: path.resolve(BASE_DIR, "dist"),
    filename: "[name].bundle.js"
  },

  module: {
    rules: loaderConfigs.rules
  },

  resolve: {
    modules: [
      path.resolve(BASE_DIR, "node_modules"),
      path.resolve(BASE_DIR, "app")
    ],
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    plugins: [new TsconfigPathsPlugin({ configFile: TS_CONFIG })]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      workers: 2,
      watch: ["./src"]
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      alwaysWriteToDisk: true,
      filename: "index.html",
      template: path.resolve(BASE_DIR, "src/index.html")
    })
  ]
};
