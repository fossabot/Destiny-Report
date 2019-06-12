const { getItem } = require("../utils/endpoints");

module.exports = (membershipId, membershipType, item, manifestJson) => {
  return new Promise(async (resolve, reject) => {
    let data = {};

    try {
      const itemDefinition =
        manifestJson.DestinyInventoryItemDefinition[item.itemHash];

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
            const itemPerkDefinition =
              manifestJson.DestinySandboxPerkDefinition[
                itemPerksLevel.perks.data.perks[j].perkHash
              ];

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
