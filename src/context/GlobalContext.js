import React, { useState } from "react";

const GlobalContext = React.createContext();

const GlobalProvider = props => {
  const [globalState, setGlobalState] = useState({
    showLoader: false,
    error: false,
    errorMessage: "Something went wrong!"
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
