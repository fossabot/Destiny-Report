const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      state = {
        ...state,
        user: action.playload,
        fetchingSucceed: true,
        fecthingFailed: false
      };
      return state;
    default:
      return state;
  }
};

export default userReducer;
