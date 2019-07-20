import { playerActionTypes } from "../actions/actionTypes";

const initialState = {
  isFetched: false,
  data: {},
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
    case playerActionTypes.SET_PLAYER_DATA:
      return { ...state, isFetched: true, data: payload };
    case playerActionTypes.SET_XUR_DATA:
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
    case playerActionTypes.RESET_PLAYER_DATA:
      return initialState;
    default:
      return state;
  }
};
