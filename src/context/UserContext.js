import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = props => {
  const [userState, setUserState] = useState({
    user: {},
    fetchingSucceed: false,
    fecthingFailed: false
  });

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
