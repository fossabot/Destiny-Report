import { gambitActionTypes } from "./actionTypes";

export const setGambitData = data => ({
  type: gambitActionTypes.SET_GAMBIT_DATA,
  payload: data
});

export const setGambitMatches = data => ({
  type: gambitActionTypes.SET_GAMBIT_MATCHES,
  payload: data
});
