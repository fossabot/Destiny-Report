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
      this.props.reduxStore.dispatch(setLoader(true));
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      this.props.reduxStore.dispatch(setLoader(false));
      NProgress.done();
    });
    Router.events.on("routeChangeError", () => {
      if (this.props.reduxStore.getState().global.showLoader) {
        this.props.reduxStore.dispatch(setLoader(false));
      }
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
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </UserProvider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
