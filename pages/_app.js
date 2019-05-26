import React from "react";
import App, { Container } from "next/app";
import { Layout } from "../src/Layout";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPaypal,
  faTwitter,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

library.add(faPaypal, faTwitter, faGithub, faArrowRight);

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
