const withPlugins = require("next-compose-plugins");
const withSASS = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");

module.exports = withPlugins([withSASS, withCSS, withImages], {
  target: "serverless",
  env: {
    API_KEY: process.env.API_KEY
  }
});
