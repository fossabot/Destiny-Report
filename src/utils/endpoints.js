import axios from "axios";
import rateLimit from "axios-rate-limit";

axios.defaults.headers.common["X-API-KEY"] = "1eec7ade76114bf280b3e4e468a8ff3f";

const limitedAxios = rateLimit(axios.create(), {
  maxRequests: 100,
  perMilliseconds: 1000
});

export const getMembershipID = (playerTag, platform) => {
  if (playerTag.includes("#")) {
    playerTag = playerTag.replace("#", "%23");
  }
  return limitedAxios.get(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/${platform}/${playerTag}/`
  );
};

export const getEntityDefinition = (hashIdentifier, entityType) => {
  return limitedAxios.get(
    `https://www.bungie.net/Platform/Destiny2/Manifest/${entityType}/${hashIdentifier}/ `
  );
};

export const getProfile = (membershipId, membershipType, components) => {
  return limitedAxios.get(
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
  return limitedAxios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${instanceId}/?components=${components.join(
      ","
    )}`
  );
};
