import React, { Component } from "react";
import { Route, Switch } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Gambit from "./components/Gambit";
import Crucible from "./components/Crucible";
import Raid from "./components/Raid";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/gambit/:id" component={Gambit} />

          <Route exact path="/crucible/:id" component={Crucible} />

          <Route exact path="/raid/:id" component={Raid} />

          <Route render={() => <div>404</div>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
