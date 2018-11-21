import React, { Component } from "react";
import { Route, Switch } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Player from "./components/Player";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/gambit" component={Home} />
          <Route path="/gambit/:id" component={Player} />
          <Route exact path="/crucible" component={Home} />
          <Route path="/crucible/:id" component={Player} />

          <Route exact path="/raid" component={Home} />
          <Route path="/raid/:id" component={Player} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
