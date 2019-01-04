// Export bucket for loader configs

const tsLoader = require("./typescript.js");
const styleLoaders = require("./style.js");
const vueLoader = require("./vue.js");
const htmlLoader = require("./html.js");

module.exports = {
  rules: [tsLoader, ...styleLoaders, vueLoader, htmlLoader]
};
