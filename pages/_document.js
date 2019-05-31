import React from "react";
import Document from "next/document";
import Head from "next/head";
import "../static/styles/nprogress.css";

import { SheetsRegistry, JssProvider, createGenerateId } from "react-jss";

export default class JssDocument extends Document {
  static async getInitialProps(ctx) {
    const registry = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => (
          <JssProvider registry={registry} generateId={generateId}>
            <App {...props}>
              <Head>
                <Head>
                  <meta charSet="utf-8" />
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                  />
                  <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
                  />
                </Head>
              </Head>
            </App>
          </JssProvider>
        )
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{registry.toString()}</style>
        </>
      )
    };
  }
}
