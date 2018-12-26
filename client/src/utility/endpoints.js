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
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/0/Stats/?modes=63&periodType=2`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};
export const getAllProgression = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=100,202,900`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};

export const getCrucibleStats = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/0/Stats/?modes=5&periodType=2`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};

export const getRaidStats = (membershipType, membershipId, characterId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/AggregateActivityStats/`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};

export const getRaidBadges = (membershipType, membershipId) => {
  return axios.get(`/api/getbadges/${membershipId}?platform=${membershipType}`);
};

export const getCheckRaidBadges = (membershipType, membershipId) => {
  return axios.get(
    `/api/checkbadges/${membershipId}?platform=${membershipType}`
  );
};

export const getPGCR = instanceId => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/${instanceId}/`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};
