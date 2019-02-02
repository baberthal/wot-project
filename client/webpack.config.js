// Webpack Configuration

/* eslint no-unused-vars:0 */
module.exports = function(env, argv) {
  if (env && env.production) {
    console.log("Detected **production** environment.");
    return require("./config/webpack/production.config.js");
  } else {
    console.log("Detected **development** environment.");
    return require("./config/webpack/development.config.js");
  }
};
