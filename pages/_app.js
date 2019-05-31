import React from "react";
import App, { Container } from "next/app";
import { Layout } from "../src/Layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import Router from "next/router";
import NProgress from "nprogress";
import {
  faPaypal,
  faTwitter,
  faGithub,
  faWindows,
  faPlaystation,
  faXbox
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faChevronDown,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { UserProvider } from "../src/context/UserContext";
import { GlobalProvider } from "../src/context/GlobalContext";
import { Loading } from "../src/components";

library.add(
  faTimes,
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
    showLoader: false
  };

  componentDidMount() {
    Router.events.on("routeChangeStart", () => {
      this.setState({ showLoader: true });
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      this.setState({ showLoader: false });
      NProgress.done();
    });
    Router.events.on("routeChangeError", () => {
      this.setState({ showLoader: false });
      NProgress.done();
    });

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
    const { showLoader } = this.state;
    return (
      <Container>
        <GlobalProvider>
          <UserProvider>
            <Layout>
              {showLoader ? <Loading /> : <Component {...pageProps} />}
            </Layout>
          </UserProvider>
        </GlobalProvider>
      </Container>
    );
  }
}
