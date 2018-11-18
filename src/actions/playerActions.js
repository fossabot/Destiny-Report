import axios from "axios";
import { values } from "lodash";

export const setMembershipDataAction = playerGamerTag => {
  return async dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${playerGamerTag}/`,
          {
            headers: {
              "X-API-KEY": process.env.REACT_APP_API_KEY
            }
          }
        );
        if (res.data.Response.length !== 0) {
          const {
            membershipId,
            displayName,
            membershipType
          } = res.data.Response[0];
          const stats = await axios.get(
            `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/0/Stats/?modes=63&periodType=0`,
            {
              headers: {
                "X-API-KEY": process.env.REACT_APP_API_KEY
              }
            }
          );
          const infamyStats = await axios.get(
            `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=CharacterProgressions`,
            {
              headers: {
                "X-API-KEY": process.env.REACT_APP_API_KEY
              }
            }
          );
          const { currentProgress, progressToNextLevel, stepIndex } = values(
            infamyStats.data.Response.characterProgressions.data
          )[0].progressions["2772425241"];
          const infamy = { currentProgress, progressToNextLevel, stepIndex };

          dispatch({ type: "START_SET_DATA" });
          dispatch({
            type: "SET_DATA",
            payload: {
              membershipId,
              membershipType,
              displayName,
              gambitStats: stats.data.Response.pvecomp_gambit,
              infamy
            }
          });
          dispatch({ type: "SUCCESS_SET_DATA" });
          resolve();
        } else {
          dispatch({ type: "FAIL_SET_DATA" });
          reject("Player not found");
        }
      } catch (err) {
        reject(err);
      }
    });
  };
};

export const resetTheStateAction = () => {
  console.log("RESET");
  return { type: "RESET_DATA" };
};
