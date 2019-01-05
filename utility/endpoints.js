const axios = require("axios");

const getCharactersIds = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=Profiles`
  );
};

const getCharacterActivity = (
  membershipType,
  membershipId,
  characterId,
  page
) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/activities/?page=${page}&mode=raid&count=250`
  );
};

const getPGCR = instanceId => {
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

module.exports = {
  getCharactersIds,
  getCharacterActivity,
  getPGCR
};
