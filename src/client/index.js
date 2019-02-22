import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "../common/store/configureStore";
import App from "../common/containers/App";
import { BrowserRouter as Router } from "react-router-dom";
import "../common/styles/components/Index.scss";

const store = configureStore(window.__PRELOADED_STATE__);

hydrate(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById("root")
);

if (module.hot) {
	module.hot.accept("../common/containers/App", () => {
		hydrate(
			<Provider store={store}>
				<App />
			</Provider>,
			document.getElementById("root")
		);
	});
}
