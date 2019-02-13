import express from "express";

let app = require("./server").default;

if (module.hot) {
  module.hot.accept("./server", function() {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      app = require("./server").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

// const port = process.env.PORT || 4000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(process.env.PORT || 4000, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started server`);
  });
