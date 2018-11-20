import axios from "axios";

export const getMembershipID = playerTag => {
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
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=CharacterProgressions`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};
