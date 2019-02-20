import express from "express";
import Loadable from "react-loadable";

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

const PORT = process.env.PORT || 4000;

export default Loadable.preloadAll().then(() =>
	express()
		.use((req, res) => app.handle(req, res))
		.listen(PORT, function(err) {
			if (err) {
				console.error(err);
				return;
			}
			console.log(`> Started server ${PORT}`);
		})
);
