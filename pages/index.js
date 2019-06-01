import React, { useContext, Fragment, useEffect } from "react";
import { SearchForm, SearchHistory, Spacer, Loading } from "../src/components";
import "../static/styles/Home.scss";
import GlobalContext from "../src/context/GlobalContext";

const index = ({ error, message }) => {
  const { globalState, setGlobalState } = useContext(GlobalContext);

  useEffect(() => {
    if (error) {
      setGlobalState({
        showLoader: false,
        error: true,
        errorStatus: error,
        errorMessage: message
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
  return { error: query.error, message: query.message };
};

export default index;
