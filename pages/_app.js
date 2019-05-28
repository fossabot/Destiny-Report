import React from "react";
import App, { Container } from "next/app";
import { Layout } from "../src/Layout";
import { library } from "@fortawesome/fontawesome-svg-core";
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

import { UserProvider } from "../src/context/UserContext";
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
  componentDidMount() {
    const style = document.getElementById("server-side-styles");

    if (style) {
      style.parentNode.removeChild(style);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <GlobalProvider>
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserProvider>
        </GlobalProvider>
      </Container>
    );
  }
}
