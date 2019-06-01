import React, { useState } from "react";

const GlobalContext = React.createContext();

const GlobalProvider = props => {
  const [globalState, setGlobalState] = useState({
    showLoader: false,
    error: false,
    errorStatus: "Something Went Wrong!",
    errorMessage: "Please Try Again Later"
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
