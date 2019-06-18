import { crucibleActionTypes } from "../actions/actionTypes";

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
    case crucibleActionTypes.SET_CRUCIBLE_DATA:
      return { ...state, isFetched: true, data: payload };
    case crucibleActionTypes.SET_CRUCIBLE_MATCHES:
      return {
        ...state,
        matches: { ...state.matches, isFetched: true, data: payload }
      };
    default:
      return state;
  }
};
