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

export const setAllProgressionAction = (membershipType, membershipId) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const gambitStats = await endpoints.getGambitStats(
          membershipType,
          membershipId
        );
        const crucibleStats = await endpoints.getCrucibleStats(
          membershipType,
          membershipId
        );
        console.log("crucible", crucibleStats);
        const allStats = await endpoints.getAllProgression(
          membershipType,
          membershipId
        );

        //Infamy
        const { currentProgress, progressToNextLevel, level } = values(
          allStats.data.Response.characterProgressions.data
        )[0].progressions["2772425241"];

        const progress =
          allStats.data.Response.profileRecords.data.records["3901785488"]
            .objectives[0].progress;

        //Valor
        const valorProgress = values(
          allStats.data.Response.characterProgressions.data
        )[0].progressions["3882308435"];

        const valorResets =
          allStats.data.Response.profileRecords.data.records["559943871"]
            .objectives[0].progress;
        valorProgress.progress = valorResets;

        //Glory
        const gloryProgress = values(
          allStats.data.Response.characterProgressions.data
        )[0].progressions["2679551909"];

        const gloryResets =
          allStats.data.Response.profileRecords.data.records["4185918315"]
            .objectives[0].progress;
        gloryProgress.progress = gloryResets;

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
        dispatch({
          type: "SET_CRUCIBLE_DATA",
          payload: {
            valorProgress,
            gloryProgress,
            crucibleStats: crucibleStats.data.Response.allPvP
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

export const setActiveMembership = index => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch({ type: "SET_ACTIVE_MEMBERSHIP", payload: index });
      resolve();
    });
  };
};
