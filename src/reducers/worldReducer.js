import { worldActionTypes } from "../actions/actionTypes";

const initialState = {
  isFetched: false,
  data: { flashpoint: "Unknown", nightfalls: [], leviathan: "Unknown" },
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
    case worldActionTypes.SET_WORLD_DATA:
      return {
        ...state,
        isFetched: true,
        data: payload
      };
    default:
      return state;
  }
};
