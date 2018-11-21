import { values } from "lodash";
import * as endpoints from "../utility/endpoints";

export const resetTheStateAction = () => {
  return { type: "RESET_DATA" };
};

export const setMembershipInfoAction = playerGamerTag => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: "START_SET_DATA" });
        const res = await endpoints.getMembershipID(playerGamerTag);
        if (res.data.Response.length === 0) {
          dispatch({ type: "FAIL_SET_DATA" });
          reject("Player not found");
          return;
        }

        dispatch({
          type: "SET_MEMBERSHIP_DATA",
          payload: {
            memberships: res.data.Response
          }
        });
        dispatch({ type: "SUCCESS_SET_DATA" });
        resolve(res.data.Response);
      } catch (err) {
        dispatch({ type: "FAIL_SET_DATA" });
        reject(err);
      }
    });
  };
};

export const setGambitStatsAction = (membershipType, membershipId) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const gambitStats = await endpoints.getGambitStats(
          membershipType,
          membershipId
        );
        const infamyStats = await endpoints.getInfamyProgression(
          membershipType,
          membershipId
        );
        const { currentProgress, progressToNextLevel, level } = values(
          infamyStats.data.Response.characterProgressions.data
        )[0].progressions["2772425241"];
        const progress =
          infamyStats.data.Response.profileRecords.data.records["3901785488"]
            .objectives[0].progress;

        const infamy = {
          currentProgress,
          progressToNextLevel,
          level,
          progress
        };

        dispatch({ type: "START_SET_DATA" });
        dispatch({
          type: "SET_GAMBIT_DATA",
          payload: {
            gambitStats: gambitStats.data.Response.pvecomp_gambit,
            infamy
          }
        });
        dispatch({ type: "SUCCESS_SET_DATA" });
        dispatch({ type: "FINISHED_LOADING" });
        resolve();
      } catch (err) {
        dispatch({ type: "FAIL_SET_DATA" });
        reject(err);
      }
    });
  };
};
