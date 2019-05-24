const withPlugins = require("next-compose-plugins");
const withSASS = require("@zeit/next-sass");
const withImages = require("next-images");

module.exports = withPlugins([withSASS, withImages], { target: "serverless" });
