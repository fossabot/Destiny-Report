import { raidActionTypes } from "./actionTypes";
import getOverallRaidActivitiesPlayed from "../utils/getOverallRaidActivitiesPlayed";

export const setRaidData = data => ({
  type: raidActionTypes.SET_RAID_DATA,
  payload: data
});

export const setRaidBadges = data => ({
  type: raidActionTypes.SET_RAID_BADGES,
  payload: data
});
export const updateRaidBadges = data => ({
  type: raidActionTypes.UPDATE_RAID_BADGES,
  payload: data
});

export const failUpdateRaidBadges = () => ({
  type: raidActionTypes.FAIL_UPDATE_RAID_BADGES
});
export const setRaidActivitiesPlayed = (
  membershipId,
  membershipType
) => async dispatch => {
  const data = await getOverallRaidActivitiesPlayed(
    membershipType,
    membershipId
  );

  dispatch({
    type: raidActionTypes.SET_ACTIVITIES_PLAYED,
    payload: data
  });
};
