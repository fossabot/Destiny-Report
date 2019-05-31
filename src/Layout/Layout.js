import React, { useContext, useEffect } from "react";
import Router from "next/router";
import { Header, Footer, Modal } from "../components";
import "../../static/styles/Layout.scss";
import GlobalContext from "../context/GlobalContext";

const Layout = ({ children }) => {
  const { globalState } = useContext(GlobalContext);

  return (
    <div className="layout">
      <Header />
      <Modal
        active={globalState.error}
        errorMessage={globalState.errorMessage}
        secondaryMessage={
          globalState.errorLevel === 1
            ? "Battle.net ids must be in this format name#id, example: Gladd#11693"
            : ""
        }
      />
      <div className="main--wrapper">
        <main className="main--content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
