// Base Webpack Configuration

const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const BASE_DIR = path.resolve(__dirname, "../..");

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
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
              onlyCompileBundledFiles: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  resolve: {
    modules: [
      path.resolve(BASE_DIR, "node_modules"),
      path.resolve(BASE_DIR, "app")
    ],
    extensions: [".tsx", ".ts", ".js"]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      workers: 2,
      watch: ["./src"]
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      alwaysWriteToDisk: true,
      filename: "index.html",
      template: path.resolve(BASE_DIR, "src/index.html")
    })
  ]
};
