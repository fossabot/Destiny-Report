const axios = require("axios");

export const getCharactersIds = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=Profiles`
  );
};

export const getCharacterActivity = (
  membershipType,
  membershipId,
  characterId,
  page
) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/activities/?page=${page}&mode=raid&count=250`
  );
};

export const getPGCR = instanceId => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        axios.get(
          `https://www.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/${instanceId}/`
        )
      );
    }, 40);
  });
};
