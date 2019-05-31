const { getEntityDefinition, getItem } = require("../endpoints");

module.exports = (membershipId, membershipType, item) => {
  return new Promise(async (resolve, reject) => {
    let data = {};

    try {
      const {
        data: { Response: itemPerksLevel }
      } = await getItem(membershipId, membershipType, item.itemInstanceId, [
        302,
        300
      ]);
      const {
        data: { Response: itemDefinition }
      } = await getEntityDefinition(
        item.itemHash,
        "DestinyInventoryItemDefinition"
      );

      const perks = [];
      if (
        typeof itemPerksLevel.perks !== "undefined" &&
        typeof itemPerksLevel.perks.data !== "undefined"
      ) {
        for (let j = 0; j < itemPerksLevel.perks.data.perks.length; ++j) {
          const {
            data: { Response: itemPerkDefinition }
          } = await getEntityDefinition(
            itemPerksLevel.perks.data.perks[j].perkHash,
            "DestinySandboxPerkDefinition"
          );

          perks.push({
            name: itemPerkDefinition.displayProperties.name,
            icon: itemPerkDefinition.displayProperties.icon
          });
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
      console.log(error);
      data = {
        name: "Error",
        icon: "Error",
        type: "Error",
        level: "000",
        perks: []
      };
    }

    resolve(data);
  });
};
