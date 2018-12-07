import { values } from "lodash";
import * as endpoints from "../utility/endpoints";

export const resetTheStateAction = () => {
  return { type: "RESET_DATA" };
};

export const setMembershipInfoAction = (playerGamerTag, pageName) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
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

        let infamyData = {
          currentProgress: 0,
          progressToNextLevel: 0,
          level: 0,
          ranks: 0,
          progress: 0,
          armyOfOne: 0
        };
        if (allStats.data.Response.characterProgressions.data !== undefined) {
          //Infamy
          infamyData.level = values(
            allStats.data.Response.characterProgressions.data
          )[0].progressions["2772425241"].level;

          infamyData.progressToNextLevel = values(
            allStats.data.Response.characterProgressions.data
          )[0].progressions["2772425241"].progressToNextLevel;

          infamyData.currentProgress = values(
            allStats.data.Response.characterProgressions.data
          )[0].progressions["2772425241"].currentProgress;

          infamyData.ranks =
            allStats.data.Response.profileRecords.data.records[
              "3470255495"
            ].objectives[0].progress;
          infamyData.progress =
            allStats.data.Response.profileRecords.data.records[
              "3901785488"
            ].objectives[0].progress;
          infamyData.armyOfOne =
            allStats.data.Response.profileRecords.data.records[
              "1071663279"
            ].objectives[0].progress;
        } else {
          dispatch({ type: "FAIL_SET_DATA_PRIVACY" });
        }

        const infamy = {
          currentProgress: infamyData.currentProgress,
          progressToNextLevel: infamyData.progressToNextLevel,
          level: infamyData.level,
          ranks: infamyData.ranks,
          progress: infamyData.progress,
          armyOfOne: infamyData.armyOfOne
        };

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

        let crucibleData = {
          valor: {
            ranks: 0,
            progress: 0,
            resets: 0,
            level: 0,
            nextLevelAt: 0,
            progressToNextLevel: 0
          },
          glory: {
            ranks: 0,
            progress: 0,
            resets: 0,
            level: 0,
            nextLevelAt: 0,
            progressToNextLevel: 0
          }
        };
        if (allStats.data.Response.profileRecords.data !== undefined) {
          //Valor
          crucibleData.valor.ranks =
            allStats.data.Response.profileRecords.data.records[
              "1711079800"
            ].objectives[0].progress;

          const valorLevelStats = values(
            allStats.data.Response.characterProgressions.data
          )[0].progressions["3882308435"];

          crucibleData.valor.level = valorLevelStats.level;
          crucibleData.valor.nextLevelAt = valorLevelStats.nextLevelAt;
          crucibleData.valor.progressToNextLevel =
            valorLevelStats.progressToNextLevel;
          crucibleData.valor.currentProgress = valorLevelStats.currentProgress;

          crucibleData.valor.resets =
            allStats.data.Response.profileRecords.data.records[
              "559943871"
            ].objectives[0].progress;

          //Glory
          crucibleData.glory.ranks =
            allStats.data.Response.profileRecords.data.records[
              "200792717"
            ].objectives[0].progress;

          const gloryLevelStats = values(
            allStats.data.Response.characterProgressions.data
          )[0].progressions["2679551909"];

          crucibleData.glory.level = gloryLevelStats.level;
          crucibleData.glory.nextLevelAt = gloryLevelStats.nextLevelAt;
          crucibleData.glory.progressToNextLevel =
            gloryLevelStats.progressToNextLevel;
          crucibleData.glory.currentProgress = gloryLevelStats.currentProgress;

          crucibleData.glory.resets =
            allStats.data.Response.profileRecords.data.records[
              "4185918315"
            ].objectives[0].progress;
        }

        dispatch({
          type: "SET_CRUCIBLE_DATA",
          payload: {
            valorProgress: crucibleData.valor,
            gloryProgress: crucibleData.glory,
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

export const setActiveMembership = index => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch({ type: "SET_ACTIVE_MEMBERSHIP", payload: index });
      resolve();
    });
  };
};

export const startSetDataAction = () => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch({ type: "START_SET_DATA" });
      resolve();
    });
  };
};
