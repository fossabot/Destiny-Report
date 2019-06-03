import React, { useContext, useEffect } from "react";
import Router from "next/router";
import { Header, Footer, Modal } from "../components";
import "../../static/styles/Layout.scss";
import GlobalContext from "../context/GlobalContext";
import ReactTooltip from "react-tooltip";

const Layout = ({ children }) => {
  const { globalState } = useContext(GlobalContext);

  return (
    <div className="layout">
      <Header />
      <Modal active={globalState.error} />
      <div className="main--wrapper">
        <main className="main--content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
