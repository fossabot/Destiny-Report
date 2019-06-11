import axios from "axios";

axios.defaults.headers.common["X-API-KEY"] = process.env.API_KEY;

export const getMembershipID = (playerTag, platform) => {
  if (playerTag.includes("#")) {
    playerTag = playerTag.replace("#", "%23");
  }
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${platform}/${playerTag}/`
  );
};

export const getEntityDefinition = (hashIdentifier, entityType) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/Manifest/${entityType}/${hashIdentifier}/ `
  );
};

export const getProfile = (membershipId, membershipType, components) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${components.join(
      ","
    )}`
  );
};
export const getHistorialStats = (membershipId, membershipType, modes) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/0/Stats/?groups=0&modes=${modes.join(
      ","
    )}&periodType=2`
  );
};

export const getAllProgression = (membershipType, membershipId, components) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${components.join(
      ","
    )}`
  );
};

export const getItem = (
  membershipId,
  membershipType,
  instanceId,
  components
) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${instanceId}/?components=${components.join(
      ","
    )}`
  );
};

export const getCharactersOverallCrucibleStats = (
  membershipId,
  membershipType,
  CharacterId
) => {
  return axios.get(
    ` https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${CharacterId}/Stats/?groups=102&modes=70,69,31,37,38,71,72,73,74&periodType=2`
  );
};
