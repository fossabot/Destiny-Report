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
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
