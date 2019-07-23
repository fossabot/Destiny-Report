import { worldActionTypes } from "./actionTypes";
import { getXur, getEntityDefinition } from "../utils/endpoints";

const classType = {
  0: "Titan ",
  1: "Hunter ",
  2: "Warlock ",
  3: ""
};

export const setXurData = () => async dispatch => {
  try {
    const res = await getXur();
    const response = res.data.Response;

    if (Object.keys(response.sales.data["2190858386"].saleItems).length >= 3) {
      const items = [];

      const saleItems = Object.values(
        response.sales.data["2190858386"].saleItems
      );

      for (let i = 0; i < saleItems.length; i++) {
        const item = await getEntityDefinition(
          saleItems[i].itemHash,
          "DestinyInventoryItemDefinition"
        );

        let description = item.data.Response.itemTypeDisplayName;
        if (
          item.data.Response.itemType === 3 ||
          item.data.Response.itemType === 2
        ) {
          description = `${classType[item.data.Response.classType]}${
            item.data.Response.itemTypeAndTierDisplayName
          }`;
        }

        items.push({
          name: item.data.Response.displayProperties.name,
          icon: item.data.Response.displayProperties.icon,
          description,
          cost: saleItems[i].costs[0] ? saleItems[i].costs[0].quantity : null
        });
      }

      dispatch({
        type: worldActionTypes.SET_XUR_DATA,
        payload: {
          isHere: true,
          location: "IO - Giants Scar",
          leavesOn: "Tuesday",
          comesBackOn: "Friday",
          items
        }
      });
    } else {
      dispatch({
        type: worldActionTypes.SET_XUR_DATA,
        payload: {
          isHere: false,
          location: "",
          leavesOn: "",
          comesBackOn: "Tuesaday",
          items: []
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
