import { crucibleActionTypes } from "../actions/actionTypes";

const initialState = {
  isFetched: false,
  data: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case crucibleActionTypes.SET_CRUCIBLE_DATA:
      return { isFetched: true, data: payload };
    default:
      return state;
  }
};
