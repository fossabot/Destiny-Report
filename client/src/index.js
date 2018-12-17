import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import "font-awesome/css/font-awesome.min.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
