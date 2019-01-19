import axios from "axios";

export const getMembershipID = playerTag => {
  if (playerTag.includes("#")) {
    playerTag = playerTag.replace("#", "%23");
  }
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/${playerTag}/`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};
export const getGambitStats = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/0/Stats/?modes=63&periodType=2`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};
export const getAllProgression = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=100,202,900`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};

export const getCrucibleStats = (membershipType, membershipId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/0/Stats/?modes=5&periodType=2`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};

export const getRaidStats = (membershipType, membershipId, characterId) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/AggregateActivityStats/`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};

export const getRaidBadges = (membershipType, membershipId) => {
  return axios.get(`/api/getbadges/${membershipId}?platform=${membershipType}`);
};

export const getCheckRaidBadges = (membershipType, membershipId) => {
  return axios.get(
    `/api/checkbadges/${membershipId}?platform=${membershipType}`
  );
};

export const getPGCR = instanceId => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/${instanceId}/`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};

export const getCharacterActivity = (
  membershipType,
  membershipId,
  characterId,
  page
) => {
  return axios.get(
    `https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${membershipId}/Character/${characterId}/Stats/activities/?page=${page}&mode=4&count=250`,
    {
      headers: {
        "X-API-KEY": process.env.REACT_APP_API_KEY
      }
    }
  );
};

export const getOverallRaidAcitivitesPlayed = (
  membershipType,
  membershipId
) => {
  return new Promise(async (resolve, reject) => {
    const raidActivitiesPlayed = {
      SotP: [],
      lastWish: [],
      SoS: [],
      EoW: [],
      leviathan: []
    };

    const characterIdsResult = await axios.get(
      `https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=100`,
      {
        headers: {
          "X-API-KEY": process.env.REACT_APP_API_KEY
        }
      }
    );

    const characterIds =
      characterIdsResult.data.Response.profile.data.characterIds;
    try {
      for (let i = 0; i < characterIds.length; ++i) {
        for (let page = 0; page < 16; ++page) {
          const result = await getCharacterActivity(
            membershipType,
            membershipId,
            characterIds[i],
            page
          );

          if (Object.keys(result.data.Response).length !== 0) {
            for (
              let k = result.data.Response.activities.length - 1;
              k > -1;
              --k
            ) {
              const activity = result.data.Response.activities[k];

              const isCompleted = activity.values.completed.basic.value;
              if (
                activity.activityDetails.directorActivityHash === 2122313384
              ) {
                raidActivitiesPlayed.lastWish.push({
                  x: raidActivitiesPlayed.lastWish.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 1661734046
              ) {
                raidActivitiesPlayed.lastWish.push({
                  x: raidActivitiesPlayed.lastWish.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 548750096
              ) {
                raidActivitiesPlayed.SotP.push({
                  x: raidActivitiesPlayed.SotP.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 2812525063
              ) {
                raidActivitiesPlayed.SotP.push({
                  x: raidActivitiesPlayed.SotP.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 3089205900
              ) {
                raidActivitiesPlayed.EoW.push({
                  x: raidActivitiesPlayed.EoW.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 2164432138
              ) {
                raidActivitiesPlayed.EoW.push({
                  x: raidActivitiesPlayed.EoW.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 809170886
              ) {
                raidActivitiesPlayed.EoW.push({
                  x: raidActivitiesPlayed.EoW.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 119944200
              ) {
                raidActivitiesPlayed.SoS.push({
                  x: raidActivitiesPlayed.SoS.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 3213556450
              ) {
                raidActivitiesPlayed.SoS.push({
                  x: raidActivitiesPlayed.SoS.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 3004605630
              ) {
                raidActivitiesPlayed.SoS.push({
                  x: raidActivitiesPlayed.SoS.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 2693136600 ||
                activity.activityDetails.directorActivityHash === 2693136601 ||
                activity.activityDetails.directorActivityHash === 2693136602 ||
                activity.activityDetails.directorActivityHash === 2693136603 ||
                activity.activityDetails.directorActivityHash === 2693136604 ||
                activity.activityDetails.directorActivityHash === 2693136605
              ) {
                raidActivitiesPlayed.leviathan.push({
                  x: raidActivitiesPlayed.leviathan.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 417231112 ||
                activity.activityDetails.directorActivityHash === 757116822 ||
                activity.activityDetails.directorActivityHash === 1685065161 ||
                activity.activityDetails.directorActivityHash === 2449714930 ||
                activity.activityDetails.directorActivityHash === 3446541099 ||
                activity.activityDetails.directorActivityHash === 3879860661
              ) {
                raidActivitiesPlayed.leviathan.push({
                  x: raidActivitiesPlayed.leviathan.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              } else if (
                activity.activityDetails.directorActivityHash === 287649202 ||
                activity.activityDetails.directorActivityHash === 3916343513 ||
                activity.activityDetails.directorActivityHash === 4039317196 ||
                activity.activityDetails.directorActivityHash === 89727599 ||
                activity.activityDetails.directorActivityHash === 1875726950 ||
                activity.activityDetails.directorActivityHash === 1699948563
              ) {
                raidActivitiesPlayed.leviathan.push({
                  x: raidActivitiesPlayed.leviathan.length,
                  y: isCompleted ? 1 : 0,
                  instanceId: activity.activityDetails.instanceId,
                  period: activity.period
                });
              }
            }
          } else {
            break;
          }
          if (result.data.Response.activities.length < 250) {
            break;
          }
        }
      }

      resolve(raidActivitiesPlayed);
    } catch (err) {
      console.log(err);
      reject("Something went wrong");
    }
  });
};
