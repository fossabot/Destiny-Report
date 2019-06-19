import { loadoutActionTypes } from "../actions/actionTypes";

const initialState = {
  isFetched: false,
  data: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case loadoutActionTypes.SET_LOADOUT_DATA:
      return { isFetched: true, data: payload };
    case loadoutActionTypes.RESET_LOADOUT:
      return initialState;
    default:
      return state;
  }
};
