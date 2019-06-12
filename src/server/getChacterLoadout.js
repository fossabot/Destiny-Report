const getItemPerks = require("./getItemPerks");
const constansts = require("./apiConstants");
const { readdirSync, readFileSync } = require("fs");

module.exports = (membershipId, membershipType, equipments, character) => {
  return new Promise(async (resolve, reject) => {
    const simplifiedCharacterData = {
      characterId: character.characterId,
      minutesPlayedTotal: character.minutesPlayedTotal,
      light: character.light,
      race: constansts.raceType[character.raceType],
      gender: constansts.genderType[character.genderType],
      class: constansts.classType[character.classType],
      emblem: character.emblemBackgroundPath,
      items: []
    };

    let foundFilename = "";
    const tempFiles = readdirSync("/tmp");
    for (let i = 0; i < tempFiles.length; i++) {
      if (tempFiles[i].indexOf("aggregate") > -1) {
        foundFilename = tempFiles[i];
      }
    }

    const manifestJson = JSON.parse(readFileSync(`/tmp/${foundFilename}`));

    const promisesToBeResolved = [];

    for (let k = 0; k < equipments.items.length; ++k) {
      promisesToBeResolved.push(
        getItemPerks(
          membershipId,
          membershipType,
          equipments.items[k],
          manifestJson
        )
      );
    }
    const itemsPerks = await Promise.all(promisesToBeResolved);

    const items = {
      3: [],
      2: [],
      16: []
    };
    for (let i = 0; i < itemsPerks.length; ++i) {
      if (items[itemsPerks[i].itemType]) {
        items[itemsPerks[i].itemType].push(itemsPerks[i]);
      }
    }
    simplifiedCharacterData.items = items;
    resolve(simplifiedCharacterData);
  });
};
