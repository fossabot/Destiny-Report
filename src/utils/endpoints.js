import axios from "axios";
import rateLimit from "axios-rate-limit";

axios.defaults.headers.common["X-API-KEY"] = process.env.API_KEY;

const http = rateLimit(axios.create(), {
  maxRequests: 20,
  perMilliseconds: 1000
});

export const getMembershipID = (playerTag, platform) => {
  if (playerTag.includes("#")) {
    playerTag = playerTag.replace("#", "%23");
  }
  return http.get(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${platform}/${playerTag}/`
  );
};

export const getEntityDefinition = (hashIdentifier, entityType) => {
  return http.get(
    `https://www.bungie.net/Platform/Destiny2/Manifest/${entityType}/${hashIdentifier}/ `
  );
};

export const getProfile = (membershipId, membershipType, components) => {
  return http.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=${components.join(
      ","
    )}`
  );
};
export const getHistorialStats = (membershipId, membershipType, modes) => {
  return http.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/0/Stats/?groups=0&modes=${modes.join(
      ","
    )}&periodType=2`
  );
};

export const getAllProgression = (membershipType, membershipId, components) => {
  return http.get(
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
  return http.get(
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
  return http.get(
    ` https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${CharacterId}/Stats/?groups=102&modes=70,69,31,37,38,71,72,73,74&periodType=2`
  );
};
export const getActivityHistory = (
  membershipId,
  membershipType,
  characterId,
  mode,
  page = 0,
  count = 10
) => {
  return http.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/Activities/?count=${count}&mode=${mode}&page=${page}`
  );
};

export const getPGCR = instanceId => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        http.get(
          `https://stats.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/${instanceId}/`
        )
      );
    }, 40);
  });
};

export const getAggregateActivityStats = (
  membershipId,
  membershipType,
  characterId
) =>
  http.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/AggregateActivityStats/ `
  );
export const getXur = () =>
  http.get(
    `https://www.bungie.net/Platform/Destiny2/Vendors?components=402,401,400`
  );
