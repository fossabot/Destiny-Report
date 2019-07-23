import { worldActionTypes } from "../actions/actionTypes";

const initialState = {
  xur: {
    isFetched: false,
    isHere: false,
    location: "",
    leavesOn: "",
    comesBackOn: "",
    items: []
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case worldActionTypes.SET_XUR_DATA:
      return {
        ...state,
        xur: {
          isFetched: true,
          isHere: payload.isHere,
          location: payload.location,
          leavesOn: payload.leavesOn,
          comesBackOn: payload.comesBackOn,
          items: payload.items
        }
      };
    default:
      return state;
  }
};
