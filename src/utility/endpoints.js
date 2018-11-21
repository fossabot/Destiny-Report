import axios from "axios";

export const getMembershipID = playerTag => {
  if (playerTag.includes("#")) {
    playerTag = playerTag.replace("#", "%23");
  }
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${playerTag}/`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};
export const getGambitStats = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/0/Stats/?modes=63&periodType=0`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};
export const getInfamyProgression = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=CharacterProgressions,900`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};
