import React from "react";
import { SearchForm, SearchHistory, Spacer } from "../src/components";
import "../src/styles/Home.scss";

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
