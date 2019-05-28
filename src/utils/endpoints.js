import axios from "axios";

axios.defaults.headers.common["X-API-KEY"] = "1eec7ade76114bf280b3e4e468a8ff3f";

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
