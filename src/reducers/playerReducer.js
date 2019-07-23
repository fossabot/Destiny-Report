import { playerActionTypes } from "../actions/actionTypes";

const initialState = {
  isFetched: false,
  data: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case playerActionTypes.SET_PLAYER_DATA:
      return { ...state, isFetched: true, data: payload };

    case playerActionTypes.RESET_PLAYER_DATA:
      return { ...state, isFetched: false, data: {} };
    default:
      return state;
  }
};
