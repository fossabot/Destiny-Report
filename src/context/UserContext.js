import React, { useReducer } from "react";
import userReducer from "./userReducer";

const UserContext = React.createContext();

const UserProvider = props => {
  const initialState = {
    user: {},
    isFetchingUser: false,
    fetchingSucceed: false,
    fecthingFailed: false
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
