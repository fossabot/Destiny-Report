import React, { Component } from "react";
import { Route, Switch } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Gambit from "./components/Gambit";
import Crucible from "./components/Crucible";
import Raid from "./components/Raid";
import Error from "./components/Error";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_GA_KEY);

class App extends Component {
  componentDidUpdate() {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/gambit/:id" component={Gambit} />

          <Route exact path="/crucible/:id" component={Crucible} />

          <Route exact path="/raid/:id" component={Raid} />

          <Route component={Error} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
