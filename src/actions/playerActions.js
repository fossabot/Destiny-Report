import { values } from "lodash";
import * as endpoints from "../utility/endpoints";

export const resetTheStateAction = () => {
  return { type: "RESET_DATA" };
};

export const setMembershipInfoAction = (playerGamerTag, pageName) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({ type: "START_SET_DATA", payload: pageName });
        const res = await endpoints.getMembershipID(playerGamerTag);
        if (res.data.Response.length === 0) {
          dispatch({ type: "PLAYER_NOT_FOUND" });
          reject("Player not found");
          return;
        }

        dispatch({
          type: "SET_MEMBERSHIP_DATA",
          payload: {
            memberships: res.data.Response
          }
        });
        dispatch({ type: "SUCCESS_SET_DATA", payload: pageName });
        resolve(res.data.Response);
      } catch (err) {
        dispatch({ type: "FAIL_SET_DATA", payload: pageName });
        reject(err);
      }
    });
  };
};

export const setGambitProgressionAction = (membershipType, membershipId) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const gambitStats = await endpoints.getGambitStats(
          membershipType,
          membershipId
        );
        const allStats = await endpoints.getAllProgression(
          membershipType,
          membershipId
        );

        //Infamy
        const { currentProgress, progressToNextLevel, level } = values(
          allStats.data.Response.characterProgressions.data
        )[0].progressions["2772425241"];

        console.log(
          allStats.data.Response.profileRecords.data.records["3470255495"]
            .objectives[0]
        );

        const ranks =
          allStats.data.Response.profileRecords.data.records["3470255495"]
            .objectives[0].progress;
        const progress =
          allStats.data.Response.profileRecords.data.records["3901785488"]
            .objectives[0].progress;
        const armyOfOne =
          allStats.data.Response.profileRecords.data.records["1071663279"]
            .objectives[0].progress;

        const infamy = {
          currentProgress,
          progressToNextLevel,
          level,
          ranks,
          progress,
          armyOfOne
        };

        dispatch({ type: "START_SET_DATA", payload: "gambit" });
        dispatch({
          type: "SET_GAMBIT_DATA",
          payload: {
            gambitStats: gambitStats.data.Response.pvecomp_gambit,
            infamy
          }
        });
        dispatch({ type: "SUCCESS_SET_DATA", payload: "gambit" });
        dispatch({ type: "FINISHED_LOADING", payload: "gambit" });
        resolve();
      } catch (err) {
        dispatch({ type: "FAIL_SET_DATA", payload: "gambit" });
        reject(err);
      }
    });
  };
};
export const setCrucibleProgressionAction = (membershipType, membershipId) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const crucibleStats = await endpoints.getCrucibleStats(
          membershipType,
          membershipId
        );
        const allStats = await endpoints.getAllProgression(
          membershipType,
          membershipId
        );

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

        dispatch({ type: "START_SET_DATA", payload: "crucible" });
        dispatch({
          type: "SET_CRUCIBLE_DATA",
          payload: {
            valorProgress,
            gloryProgress,
            crucibleStats: crucibleStats.data.Response.allPvP
          }
        });
        dispatch({ type: "SUCCESS_SET_DATA", payload: "crucible" });
        dispatch({ type: "FINISHED_LOADING", payload: "crucible" });
        resolve();
      } catch (err) {
        dispatch({ type: "FAIL_SET_DATA", payload: "crucible" });
        reject(err);
      }
    });
  };
};
export const setRaidProgressionAction = (membershipType, membershipId) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        //needs to be improved
        const allStats = await endpoints.getAllProgression(
          membershipType,
          membershipId
        );

        const characterIds = allStats.data.Response.profile.data.characterIds;

        const raidStats = [];
        for (let i = 0; i < characterIds.length; ++i) {
          const characterRaidStat = await endpoints.getRaidStats(
            membershipType,
            membershipId,
            characterIds[i]
          );
          raidStats.push({
            [`character${i + 1}`]: characterRaidStat.data.Response.activities
          });
        }

        dispatch({ type: "START_SET_DATA", payload: "raid" });
        dispatch({
          type: "SET_RAID_DATA",
          payload: raidStats
        });
        dispatch({ type: "SUCCESS_SET_DATA", payload: "raid" });
        dispatch({ type: "FINISHED_LOADING", payload: "raid" });
        resolve();
      } catch (err) {
        dispatch({ type: "FAIL_SET_DATA", payload: "raid" });
        reject(err);
      }
    });
  };
};

export const setActiveMembership = (index, pageName) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch({ type: "START_SET_DATA", payload: pageName });
      dispatch({ type: "SET_ACTIVE_MEMBERSHIP", payload: index });
      resolve();
    });
  };
};
