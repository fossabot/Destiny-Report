import React, { useContext, useEffect } from "react";
import Router from "next/router";
import { Header, Footer, Modal } from "../components";
import "../../static/styles/Layout.scss";
import { connect } from "react-redux";

const Layout = ({ children, error }) => {
  return (
    <div className="layout">
      <Header />
      <Modal active={error} />
      <div className="main--wrapper">
        <main className="main--content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default connect(state => ({ error: state.global.error }))(Layout);
