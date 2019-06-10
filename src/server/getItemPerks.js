const { getItem } = require("../utils/endpoints");
const readFromDb = require("./readFromDb");
const safelyParseJson = require("../utils/safeJsonParse");

module.exports = (membershipId, membershipType, item) => {
  return new Promise(async (resolve, reject) => {
    let data = {};

    try {
      const unparsedDbResult = await readFromDb(
        "DestinyInventoryItemDefinition",
        item.itemHash
      );

      const itemDefinition = JSON.parse(unparsedDbResult.json);

      if (
        itemDefinition.itemType !== 2 &&
        itemDefinition.itemType !== 3 &&
        itemDefinition.itemType !== 16
      ) {
        resolve({
          name: "Error",
          icon: "Error",
          type: "Error",
          level: "000",
          itemType: 0,
          perks: []
        });
      }
      const {
        data: { Response: itemPerksLevel }
      } = await getItem(membershipId, membershipType, item.itemInstanceId, [
        302,
        300
      ]);

      const perks = [];
      if (
        typeof itemPerksLevel.perks !== "undefined" &&
        typeof itemPerksLevel.perks.data !== "undefined"
      ) {
        for (let j = 0; j < itemPerksLevel.perks.data.perks.length; ++j) {
          if (itemPerksLevel.perks.data.perks[j].isActive) {
            const dbResult = await readFromDb(
              "DestinySandboxPerkDefinition",
              itemPerksLevel.perks.data.perks[j].perkHash
            );

            const itemPerkDefinition = JSON.parse(dbResult.json);

            if (
              itemPerkDefinition.displayProperties &&
              itemPerkDefinition.displayProperties.name
            ) {
              perks.push({
                name: itemPerkDefinition.displayProperties.name,
                icon: itemPerkDefinition.displayProperties.icon
              });
            }
          }
        }
      }

      data = {
        name: itemDefinition.displayProperties.name,
        icon: itemDefinition.displayProperties.icon,
        type: itemDefinition.itemTypeDisplayName,
        itemType: itemDefinition.itemType,
        perks
      };
      if (itemPerksLevel.instance.data.primaryStat) {
        data.level = itemPerksLevel.instance.data.primaryStat.value;
      }
    } catch (error) {
      console.log(error.message);
      data = {
        name: "Error",
        icon: "Error",
        type: "Error",
        level: "000",
        itemType: 0,
        perks: []
      };
    }

    resolve(data);
  });
};
