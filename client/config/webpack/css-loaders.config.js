// CSS Loader Configuration

const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CONFIG_DIR = resolve(__dirname, "../");

const vueStyleLoader = {
  loader: "vue-style-loader",
  options: {
    manualInject: true
  }
};

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    config: {
      path: CONFIG_DIR
    }
  }
};

const sassLoader = {
  loader: "sass-loader"
};

const defaultOptions = {
  dialect: "css",
  mode: "development"
};

function isDevMode(mode) {
  return mode !== "prod" && mode !== "production";
}

function cssLoader(opts = {}) {
  return {
    loader: "css-loader",
    options: opts
  };
}

function createLoaderConfig({ dialect, mode } = defaultOptions) {
  const isSass = dialect === "scss" || dialect === "sass";
  const importLoaders = isSass ? 2 : 1;

  const result = [
    isDevMode(mode) ? vueStyleLoader : MiniCssExtractPlugin.loader,
    cssLoader({ importLoaders }),
    postcssLoader
  ];

  if (isSass) {
    result.push(sassLoader);
  }

  return result;
}

function plugins(mode) {
  const filename = isDevMode(mode) ? "[name].css" : "[name].[hash].css";
  const chunkFilename = isDevMode(mode) ? "[id].css" : "[id].[hash].css";

  return [new MiniCssExtractPlugin({ filename, chunkFilename })];
}

module.exports = {
  createRules: createLoaderConfig,
  plugins: plugins
};
