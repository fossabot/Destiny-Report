import React from "react";
import App, { Container } from "next/app";
import { Layout } from "../src/Layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import Router from "next/router";
import NProgress from "nprogress";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";

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
import { setLoader } from "../src/actions";

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

class MyApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
    Router.events.on("routeChangeError", () => {
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
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <UserProvider>
          <Provider store={reduxStore}>
            <Layout>
              {reduxStore.getState().global.showLoader ? (
                <Loading />
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </Provider>
        </UserProvider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
