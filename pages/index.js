import React, { useContext, Fragment, useEffect } from "react";
import { SearchForm, SearchHistory, Spacer, Loading } from "../src/components";
import "../static/styles/Home.scss";

const index = () => {
  return (
    <div className="home--wrapper">
      <Spacer height="50px" />
      <SearchForm />
      <SearchHistory />
    </div>
  );
};

export default index;
