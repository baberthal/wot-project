// Base Webpack Configuration

const path = require("path");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const stats = require("./stats.config");

const BASE_DIR = path.resolve(__dirname, "../..");
const TS_CONFIG = path.resolve(BASE_DIR, "tsconfig.json");

module.exports = {
  context: BASE_DIR,

  entry: {
    polyfills: "./src/polyfills.ts",
    main: "./src/main.ts"
  },

  output: {
    path: path.resolve(BASE_DIR, "dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.vue(\.erb)?$/,
        use: ["vue-loader"]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
              onlyCompileBundledFiles: true,
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
              removeAttributeQuotes: false,
              caseSensitive: true,
              customAttrSurround: [
                [/#/, /(?:)/],
                [/\*/, /(?:)/],
                [/\[?\(?/, /(?:)/]
              ],
              customAttrAssign: [/\)?\]?=/]
            }
          }
        ]
      }
    ]
  },

  stats,

  resolve: {
    modules: [
      path.resolve(BASE_DIR, "node_modules"),
      path.resolve(BASE_DIR, "../node_modules"),
      path.resolve(BASE_DIR, "app")
    ],
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    plugins: [new TsconfigPathsPlugin({ configFile: TS_CONFIG })]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      workers: 2,
      watch: ["./src"]
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      alwaysWriteToDisk: false,
      filename: "index.html",
      template: path.resolve(BASE_DIR, "src/index.html")
    })
  ]
};
