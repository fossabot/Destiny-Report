import React from "react";
import { Route, Switch } from "react-router";
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import Footer from "../components/Footer";
import Gambit from "../components/Gambit";
import Crucible from "../components/Crucible";
import Raid from "../components/Raid";
import PGCR from "../components/PGCR";
import Error from "../components/Error";
import ReactGA from "react-ga";
import "../styles/main.scss";

ReactGA.initialize("UA-125575293-2");

const App = () => {
  if (typeof window !== "undefined") {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/gambit/:id" component={Gambit} />
        <Route exact path="/crucible/:id" component={Crucible} />
        <Route exact path="/raid/:id" component={Raid} />
        <Route exact path="/pgcr/:instanceId" component={PGCR} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//   }

//   render() {
//     if (typeof window !== "undefined") {
//       ReactGA.pageview(window.location.pathname + window.location.search);
//     }
//     return (

//     );
//   }
// }

export default App;
