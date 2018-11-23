import { cloneDeep, isEmpty } from "lodash";
import initial2 from "../utility/initials.json";

const SET_GAMBIT_DATA = "SET_GAMBIT_DATA";
const START_SET_DATA = "START_SET_DATA";
const SUCCESS_SET_DATA = "SUCCESS_SET_DATA";
const FAIL_SET_DATA = "FAIL_SET_DATA";
const RESET_DATA = "RESET_DATA";
const SET_MEMBERSHIP_DATA = "SET_MEMBERSHIP_DATA";
const FINISHED_LOADING = "FINISHED_LOADING";
const SET_ACTIVE_MEMBERSHIP = "SET_ACTIVE_MEMBERSHIP";
const SET_CRUCIBLE_DATA = "SET_CRUCIBLE_DATA";
const SET_RAID_DATA = "SET_RAID_DATA";

export const playerReducer = (state = initial2, action) => {
  switch (action.type) {
    case START_SET_DATA:
      state = { ...state, isLoading: true, success: false };
      return state;
    case SET_GAMBIT_DATA:
      state = cloneDeep(state);
      if (!isEmpty(action.payload.gambitStats)) {
        state.gambitStats = cloneDeep(action.payload.gambitStats);
        state.infamy = cloneDeep(action.payload.infamy);
      }
      return state;
    case SET_CRUCIBLE_DATA:
      state = cloneDeep(state);
      if (!isEmpty(action.payload.valorProgress)) {
        state.valor = cloneDeep(action.payload.valorProgress);
      }
      if (!isEmpty(action.payload.gloryProgress)) {
        state.glory = cloneDeep(action.payload.gloryProgress);
      }
      if (!isEmpty(action.payload.crucibleStats)) {
        state.crucibleStats = cloneDeep(action.payload.crucibleStats);
      }
      return state;
    case SET_RAID_DATA:
      state = cloneDeep(state);
      state.raid = cloneDeep(action.payload);
      return state;
    case SET_MEMBERSHIP_DATA:
      state = cloneDeep(state);
      state.memberships = cloneDeep(action.payload.memberships);
      return state;
    case SUCCESS_SET_DATA:
      state = { ...state, success: true, isLoading: true, error: false };
      return state;
    case SET_ACTIVE_MEMBERSHIP:
      state = { ...state, activeMembership: action.payload };
      return state;
    case FINISHED_LOADING:
      state = { ...state, isLoading: false };
      return state;
    case FAIL_SET_DATA:
      state = { ...state, success: false, isLoading: false, error: true };
      return state;
    case RESET_DATA:
      state = cloneDeep(initial2);
      return state;
    default:
      return state;
  }
};
