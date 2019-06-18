import { crucibleActionTypes } from "./actionTypes";

export const setCrucibleData = data => ({
  type: crucibleActionTypes.SET_CRUCIBLE_DATA,
  payload: data
});

export const setCrucibleMatches = data => ({
  type: crucibleActionTypes.SET_CRUCIBLE_MATCHES,
  payload: data
});
