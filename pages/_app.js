import React from "react";
import App, { Container } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import Router from "next/router";
import NProgress from "nprogress";
import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";

import { Layout } from "../src/Layout";
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
  faTimes,
  faCode
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { setLoader, setError } from "../src/actions";

import { initGA, logPageView } from "../src/utils/analytics";

library.add(
  faTimes,
  faPaypal,
  faTwitter,
  faGithub,
  faArrowRight,
  faWindows,
  faPlaystation,
  faXbox,
  faChevronDown,
  faCode
);

NProgress.configure({ minimum: 0.5 });

class MyApp extends App {
  componentDidMount() {
    initGA();

    Router.events.on("routeChangeStart", () => {
      this.props.reduxStore.dispatch(setLoader(true));
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      logPageView();
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

  componentDidCatch(error, errorInfo) {
    console.log("CUSTOM ERROR HANDLING", error);
    // This is needed to render errors correctly in development / production
    this.props.reduxStore.dispatch(setError(true));
    Router.push("/");
    super.componentDidCatch(error, errorInfo);
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
        <Provider store={reduxStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
