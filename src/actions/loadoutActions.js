import { loadoutActionTypes } from "./actionTypes";

export const setLoadout = data => ({
  type: loadoutActionTypes.SET_LOADOUT_DATA,
  payload: data
});
