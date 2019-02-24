import React from "react";
import { Route, Switch } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ReactGA from "react-ga";
import "../styles/components/App.scss";
import Loadable from "react-loadable";

const AsyncHome = Loadable({
	loader: () => import("../components/Home"),
	loading: Loading
});
const AsyncRaid = Loadable({
	loader: () => import("../components/Raid"),
	loading: Loading
});
const AsyncGambit = Loadable({
	loader: () => import("../components/Gambit"),
	loading: Loading
});
const AsyncCrucible = Loadable({
	loader: () => import("../components/Crucible"),
	loading: Loading
});
const AsyncPGCR = Loadable({
	loader: () => import("../components/PGCR"),
	loading: Loading
});
const AsyncError = Loadable({
	loader: () => import("../components/Error"),
	loading: Loading
});

ReactGA.initialize("UA-125575293-2");

const App = () => {
	if (typeof window !== "undefined") {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
	return (
		<div className="App">
			<NavBar />
			<Switch>
				<Route exact path="/" component={AsyncHome} />
				<Route exact path="/gambit/:id" component={AsyncGambit} />
				<Route exact path="/crucible/:id" component={AsyncCrucible} />
				<Route exact path="/raid/:id" component={AsyncRaid} />
				<Route exact path="/pgcr/:instanceId" component={AsyncPGCR} />
				<Route component={AsyncError} />
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
