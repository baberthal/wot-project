// TS Loader Configuration

module.exports = {
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
};
