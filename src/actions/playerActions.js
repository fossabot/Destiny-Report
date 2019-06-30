import { playerActionTypes } from "./actionTypes";

export const setPlayerData = data => ({
  type: playerActionTypes.SET_PLAYER_DATA,
  payload: data
});
