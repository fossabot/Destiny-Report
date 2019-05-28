import React, { useState } from "react";

const GlobalContext = React.createContext();

//errorLevel is used to show a different style to the user
//level 1 normal, example user not found
//level 2 critical, example Bungie API is under maintenance
const GlobalProvider = props => {
  const [globalState, setGlobalState] = useState({
    showLoader: false,
    error: false,
    errorMessage: "Something went wrong!",
    errorLevel: 1
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
