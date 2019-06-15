import { crucibleActionTypes } from "./actionTypes";

export const setCrucibleData = data => ({
  type: crucibleActionTypes.SET_CRUCIBLE_DATA,
  payload: data
});
