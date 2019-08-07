import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

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
            <App {...props} />
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

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <link rel="icon" type="image/png" href="../static/dr-icon.png" />

          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
          />

          <meta
            name="keywords"
            content="Destiny Report, Report, Destiny 2, Raid, Crucible, KD, Gambit, Flawless, loadout, Raid Badges, Destiny 2 raid stats,crown of sorrrow, last wish, leviathan, scourge of the past, eater of worlds, spire of stars, Xur, Milestones, Nightfall, Flashpoint"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
