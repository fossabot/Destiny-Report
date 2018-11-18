import { cloneDeep } from "lodash";

const SET_DATA = "SET_DATA";
const START_SET_DATA = "START_SET_DATA";
const SUCCESS_SET_DATA = "SUCCESS_SET_DATA";
const FAIL_SET_DATA = "FAIL_SET_DATA";
const RESET_DATA = "RESET_DATA";

const initial = {
  membershipId: 0,
  membershipType: 0,
  displayName: "",
  gambitStats: {},
  infamy: {},
  success: false,
  loading: false,
  error: false
};

export const playerReducer = (state = { ...initial }, action) => {
  switch (action.type) {
    case START_SET_DATA:
      state = { ...state, loading: true, success: false };
      break;
    case SET_DATA:
      state = cloneDeep(state);
      state.membershipId = action.payload.membershipId;
      state.membershipType = action.payload.membershipType;
      state.displayName = action.payload.displayName;
      state.gambitStats = cloneDeep(action.payload.gambitStats);
      state.infamy = cloneDeep(action.payload.infamy);
      break;
    case SUCCESS_SET_DATA:
      state = { ...state, success: true, loading: false, error: false };
      break;
    case FAIL_SET_DATA:
      state = { ...state, success: false, loading: false, error: true };
      break;
    case RESET_DATA:
      state = { ...initial };
      state.gambitStats = {};
      state.infamy = {};
      break;
    default:
      return state;
  }
  return state;
};
