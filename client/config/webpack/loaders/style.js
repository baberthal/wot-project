// Style Loader Configurations

module.exports = [
  {
    test: /\.css$/,
    use: ["vue-style-loader", "css-loader"]
  },
  {
    test: /\.scss$/,
    use: ["vue-style-loader", "css-loader", "sass-loader"]
  }
];
