import { raidActionTypes } from "./actionTypes";

export const setRaidData = data => ({
  type: raidActionTypes.SET_RAID_DATA,
  payload: data
});

export const setRaidBadges = data => ({
  type: raidActionTypes.SET_RAID_BADGES,
  payload: data
});
