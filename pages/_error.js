import React from "react";
import Head from "next/head";
import "../src/styles/Error.scss";

const error = () => {
  return (
    <div className="error-wrapper">
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="404, Page Not Found" />
      </Head>
      <div className="error__content">404, Page Not Found</div>
    </div>
  );
};

export default error;
