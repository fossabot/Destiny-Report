import React, { useContext, Fragment } from "react";
import { SearchForm, SearchHistory, Spacer, Loading } from "../src/components";
import "../static/styles/Home.scss";
import GlobalContext from "../src/context/GlobalContext";

const index = () => {
  const { globalState } = useContext(GlobalContext);

  return (
    <div className="home--wrapper">
      {globalState.showLoader ? (
        <Loading />
      ) : (
        <Fragment>
          <Spacer height="50px" />
          <SearchForm />
          <SearchHistory />
        </Fragment>
      )}
    </div>
  );
};

export default index;
