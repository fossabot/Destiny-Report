import React from "react";
import App, { Container } from "next/app";
import { Layout } from "../src/Layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import Router from "next/router";
import {
  faPaypal,
  faTwitter,
  faGithub,
  faWindows,
  faPlaystation,
  faXbox
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

import UserContext from "../src/context/UserContext";
import { GlobalProvider } from "../src/context/GlobalContext";

library.add(
  faPaypal,
  faTwitter,
  faGithub,
  faArrowRight,
  faWindows,
  faPlaystation,
  faXbox,
  faChevronDown
);

export default class MyApp extends App {
  state = {
    user: {},
    fetchingSucceed: false,
    fecthingFailed: false
  };

  componentDidMount() {
  

    const style = document.getElementById("server-side-styles");

    if (style) {
      style.parentNode.removeChild(style);
    }
  }

  setUserState = (succeed, userData) => {
    this.setState({
      user: userData,
      fetchingSucceed: succeed,
      fecthingFailed: !succeed
    });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <GlobalProvider>
          <UserContext.Provider
            value={{ userState: this.state, setUserState: this.setUserState }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContext.Provider>
        </GlobalProvider>
      </Container>
    );
  }
}
