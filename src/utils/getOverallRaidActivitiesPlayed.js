import { getProfile, getActivityHistory } from "./endpoints";

export default async (membershipType, membershipId) => {
  const raidActivitiesPlayed = {
    CoS: [],
    SotP: [],
    lastWish: [],
    SoS: [],
    EoW: [],
    leviathan: []
  };

  const characterIdsResult = await getProfile(membershipId, membershipType, [
    100
  ]);

  const characterIds =
    characterIdsResult.data.Response.profile.data.characterIds;
  try {
    for (let i = 0; i < characterIds.length; ++i) {
      for (let page = 0; page < 16; ++page) {
        const result = await getActivityHistory(
          membershipId,
          membershipType,
          characterIds[i],
          "raid",
          page,
          250
        );

        if (Object.keys(result.data.Response).length !== 0) {
          for (
            let k = result.data.Response.activities.length - 1;
            k > -1;
            --k
          ) {
            const activity = result.data.Response.activities[k];

            const isCompleted = activity.values.completed.basic.value;
            if (activity.activityDetails.directorActivityHash === 2122313384) {
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
            } else if (
              activity.activityDetails.directorActivityHash === 960175301 ||
              activity.activityDetails.directorActivityHash === 3333172150
            ) {
              raidActivitiesPlayed.CoS.push({
                x: raidActivitiesPlayed.CoS.length,
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
  } catch (err) {
    console.log(err.Response);
  }
  return raidActivitiesPlayed;
};
