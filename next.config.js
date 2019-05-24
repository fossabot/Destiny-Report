const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSASS = require("@zeit/next-sass");
    return withSASS({
      target: "serverless"
    });
  }
  return {
    target: "serverless"
  };
};
