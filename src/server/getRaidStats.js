import { getAggregateActivityStats } from "../utils/endpoints";
let data = {};

export default async (membershipId, membershipType, characterIds) => {
  const raidInitialData = {
    CoS: { normal: 0, guided: 0, timePlayed: 0 },
    SotP: { normal: 0, guided: 0, timePlayed: 0 },
    lastWish: { normal: 0, guided: 0, timePlayed: 0 },
    SoS: { normal: 0, prestige: 0, guided: 0, timePlayed: 0 },
    EoW: { normal: 0, prestige: 0, guided: 0, timePlayed: 0 },
    leviathan: {
      normal: 0,
      prestige: 0,
      guided: 0,
      timePlayed: 0
    },
    clears: 0,
    combinedTimePlayed: 0
  };
  data = raidInitialData;

  const toBeResolved = [];
  for (let i = 0; i < characterIds.length; i++) {
    toBeResolved.push(
      getRaidAggregateAndSimplify(membershipId, membershipType, characterIds[i])
    );
  }
  await Promise.all(toBeResolved);

  return data;
};

const getRaidAggregateAndSimplify = async (
  membershipId,
  membershipType,
  characterId
) => {
  const response = await getAggregateActivityStats(
    membershipId,
    membershipType,
    characterId
  );

  const activities = response.data.Response.activities;
  for (let k = 0; k < activities.length; k++) {
    if (
      activities[k].activityHash === 960175301 ||
      activities[k].activityHash === 3333172150
    ) {
      data.CoS.normal += activities[k].values.activityCompletions.basic.value;
      data.CoS.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 2122313384) {
      data.lastWish.normal +=
        activities[k].values.activityCompletions.basic.value;
      data.lastWish.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 1661734046) {
      data.lastWish.guided +=
        activities[k].values.activityCompletions.basic.value;
      data.lastWish.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 548750096) {
      data.SotP.normal += activities[k].values.activityCompletions.basic.value;
      data.SotP.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 2812525063) {
      data.SotP.guided += activities[k].values.activityCompletions.basic.value;
      data.SotP.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 3089205900) {
      data.EoW.normal += activities[k].values.activityCompletions.basic.value;
      data.EoW.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 2164432138) {
      data.EoW.guided += activities[k].values.activityCompletions.basic.value;
      data.EoW.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 809170886) {
      data.EoW.prestige += activities[k].values.activityCompletions.basic.value;
      data.EoW.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 119944200) {
      data.SoS.normal += activities[k].values.activityCompletions.basic.value;
      data.SoS.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 3213556450) {
      data.SoS.prestige += activities[k].values.activityCompletions.basic.value;
      data.SoS.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (activities[k].activityHash === 3004605630) {
      data.SoS.guided += activities[k].values.activityCompletions.basic.value;
      data.SoS.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (
      activities[k].activityHash === 2693136600 ||
      activities[k].activityHash === 2693136601 ||
      activities[k].activityHash === 2693136602 ||
      activities[k].activityHash === 2693136603 ||
      activities[k].activityHash === 2693136604 ||
      activities[k].activityHash === 2693136605
    ) {
      data.leviathan.normal +=
        activities[k].values.activityCompletions.basic.value;
      data.leviathan.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (
      activities[k].activityHash === 417231112 ||
      activities[k].activityHash === 757116822 ||
      activities[k].activityHash === 1685065161 ||
      activities[k].activityHash === 2449714930 ||
      activities[k].activityHash === 3446541099 ||
      activities[k].activityHash === 3879860661
    ) {
      data.leviathan.prestige +=
        activities[k].values.activityCompletions.basic.value;
      data.leviathan.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    } else if (
      activities[k].activityHash === 287649202 ||
      activities[k].activityHash === 3916343513 ||
      activities[k].activityHash === 4039317196 ||
      activities[k].activityHash === 89727599 ||
      activities[k].activityHash === 1875726950 ||
      activities[k].activityHash === 1699948563
    ) {
      data.leviathan.guided +=
        activities[k].values.activityCompletions.basic.value;
      data.leviathan.timePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
      data.clears += activities[k].values.activityCompletions.basic.value;
      data.combinedTimePlayed +=
        activities[k].values.activitySecondsPlayed.basic.value;
    }
  }
};
