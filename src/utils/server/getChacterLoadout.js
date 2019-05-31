const getItemPerks = require("./getItemPerks");
const constansts = require("./apiConstants");

module.exports = (membershipId, membershipType, equipments, character) => {
  return new Promise(async (resolve, reject) => {
    const simplifiedCharacterData = {
      characterId: character.characterId,
      minutesPlayedTotal: character.minutesPlayedTotal,
      light: character.light,
      race: constansts.raceType[character.raceType],
      gender: constansts.genderType[character.genderType],
      class: constansts.classType[character.classType],
      items: []
    };
    const promisesToBeResolved = [];
    for (let k = 0; k < equipments.items.length; ++k) {
      promisesToBeResolved.push(
        getItemPerks(membershipId, membershipType, equipments.items[k])
      );
    }
    const itemsPerks = await Promise.all(promisesToBeResolved);

    simplifiedCharacterData.items = itemsPerks;
    resolve(simplifiedCharacterData);
  });
};
