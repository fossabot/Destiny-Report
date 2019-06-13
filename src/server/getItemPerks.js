const { getItem, getEntityDefinition } = require("../utils/endpoints");

module.exports = (membershipId, membershipType, item) => {
  return new Promise(async (resolve, reject) => {
    let data = {};

    try {
      const {
        data: { Response: itemDefinition }
      } = await getEntityDefinition(
        item.itemHash,
        "DestinyInventoryItemDefinition"
      );

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
          if (
            itemPerksLevel.perks.data.perks[j].isActive &&
            itemPerksLevel.perks.data.perks[j].visible
          ) {
            perks.push({
              icon: itemPerksLevel.perks.data.perks[j].iconPath
            });
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
