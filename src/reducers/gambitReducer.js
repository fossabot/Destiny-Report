import { gambitActionTypes } from "../actions/actionTypes";

const initialState = {
  isFetched: false,
  data: {},
  matches: {
    isFetched: false,
    data: []
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case gambitActionTypes.SET_GAMBIT_DATA:
      return { ...state, isFetched: true, data: payload };
    case gambitActionTypes.RESET_GAMBIT_DATA:
      return initialState;
    case gambitActionTypes.SET_GAMBIT_MATCHES:
      return {
        ...state,
        matches: { ...state.matches, isFetched: true, data: payload }
      };
    default:
      return state;
  }
};
