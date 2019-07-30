import { worldActionTypes, globalActionTypes } from "./actionTypes";
import {
  getXur,
  getEntityDefinition,
  getPublicMilestones
} from "../utils/endpoints";

const classType = {
  0: "Titan ",
  1: "Hunter ",
  2: "Warlock ",
  3: ""
};

const leviathanERR = {
  2693136605: ["Gauntlet", "Pleasure Gardens", "Royal Pools"],
  2693136604: ["Gauntlet", "Royal Pools", "Pleasure Gardens"],
  2693136602: ["Pleasure Gardens", "Gauntlet", "Royal Pools"],
  2693136603: ["Pleasure Gardens", "Royal Pools", "Gauntlet"],
  2693136600: ["Royal Pools", "Gauntlet", "Pleasure Gardens"],
  2693136601: ["Royal Pools", "Pleasure Gardens", "Gauntlet"],
  1685065161: ["Gauntlet", "Pleasure Gardens", "Royal Pools"],
  757116822: ["Gauntlet", "Royal Pools", "Pleasure Gardens"],
  417231112: ["Pleasure Gardens", "Gauntlet", "Royal Pools"],
  3446541099: ["Pleasure Gardens", "Royal Pools", "Gauntlet"],
  2449714930: ["Royal Pools", "Gauntlet", "Pleasure Gardens"],
  3879860661: ["Royal Pools", "Pleasure Gardens", "Gauntlet"]
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
    // if (error.response) {
    //   dispatch({
    //     type: globalActionTypes.SET_ERROR,
    //     payload: {
    //       errorStatus: error.response.data.ErrorStatus,
    //       errorMessage: error.response.data.ErrorMessage,
    //       active: true
    //     }
    //   });
    // } else {
    //   dispatch({
    //     type: globalActionTypes.SET_ERROR,
    //     payload: {
    //       active: true
    //     }
    //   });
    // }
    console.log(error);
    throw new Error(error);
  }
};

export const setWorldData = () => async dispatch => {
  const data = { flashpoint: "Unknown", nightfalls: [], leviathan: "Unknown" };
  try {
    const res = await getPublicMilestones();
    const response = res.data.Response;

    // flashpoint
    const flashpointPlanetHash =
      response["463010297"].availableQuests[0].questItemHash;
    const { data: flashpointPlanetResponse } = await getEntityDefinition(
      flashpointPlanetHash,
      "DestinyInventoryItemDefinition"
    );

    const flashpointPlanetName = flashpointPlanetResponse.Response.displayProperties.name
      .split(":")[1]
      .trim()
      .toLowerCase();

    data.flashpoint =
      flashpointPlanetName.charAt(0).toUpperCase() +
      flashpointPlanetName.slice(1);

    //Nightfalls
    const nightfallActivities = response["2853331463"].activities;
    for (let i = 0; i < nightfallActivities.length; i++) {
      const nightfallEntityResponse = await getEntityDefinition(
        nightfallActivities[i].activityHash,
        "DestinyActivityDefinition"
      );

      data.nightfalls.push(
        nightfallEntityResponse.data.Response.selectionScreenDisplayProperties
          .name
      );
    }

    //Leviathan

    const leviathanEncountersRotation =
      leviathanERR[response["3660836525"].activities[0].activityHash];
    data.leviathan = leviathanEncountersRotation;

    dispatch({
      type: worldActionTypes.SET_WORLD_DATA,
      payload: data
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: globalActionTypes.SET_ERROR,
        payload: {
          errorStatus: error.response.data.ErrorStatus,
          errorMessage: error.response.data.ErrorMessage,
          active: true
        }
      });
    } else {
      dispatch({
        type: globalActionTypes.SET_ERROR,
        payload: {
          active: true
        }
      });
    }
    throw new Error(error);
  }
};
