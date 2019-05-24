import React from "react";
import { Header, Footer } from "../components";
import "../../static/styles/Layout.scss";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main--wrapper">
        <main className="main--content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
