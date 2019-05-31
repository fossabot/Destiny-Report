import React, { useContext, Fragment, useEffect } from "react";
import { SearchForm, SearchHistory, Spacer, Loading } from "../src/components";
import "../static/styles/Home.scss";
import GlobalContext from "../src/context/GlobalContext";

const index = ({ error }) => {
  const { globalState, setGlobalState } = useContext(GlobalContext);

  useEffect(() => {
    if (error === "1") {
      setGlobalState({
        showLoader: false,
        error: true,
        errorMessage: "Guardian Not Found"
      });
    } else if (error === "2") {
      setGlobalState({
        showLoader: false,
        error: true,
        errorMessage: "Somthing Went Wrong"
      });
    }
  }, []);

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

index.getInitialProps = ({ query }) => {
  return { error: query.error };
};

export default index;
