const { getActivityHistory, getPGCR } = require("../utils/endpoints");
const Player = require("./models/player");

const dates = {
  leviathan: {
    dayOne: new Date("2017-09-14T17:00:00Z"),
    weekOne: new Date("2017-09-20T17:00:00Z")
  },
  EoW: {
    dayOne: new Date("2017-12-09T18:00:00Z"),
    weekOne: new Date("2017-12-15T18:00:00Z")
  },
  SoS: {
    dayOne: new Date("2018-05-12T17:00:00Z"),
    weekOne: new Date("2018-05-18T17:00:00Z")
  },
  lastWish: {
    dayOne: new Date("2018-09-15T17:00:00Z"),
    weekOne: new Date("2018-09-21T17:00:00Z")
  },
  SotP: {
    dayOne: new Date("2018-12-08T17:00:00Z"),
    weekOne: new Date("2018-12-14T17:00:00Z")
  },
  CoS: {
    dayOne: new Date("2019-06-04T23:00:00Z"),
    weekOne: new Date("2019-06-11T23:00:00Z")
  }
};

let data = {};

let playerId = "";
let lastTimeChecked = new Date("1993-01-01T10:00:00Z");

module.exports = async (membershipType, membershipId, characterIds) => {
  const initialData = {
    leviathan: {
      minPlayersCount: 6
    },
    EoW: {
      minPlayersCount: 6
    },
    SoS: {
      minPlayersCount: 6
    },
    lastWish: {
      minPlayersCount: 6
    },
    SotP: {
      minPlayersCount: 6
    },
    CoS: {
      minPlayersCount: 6
    }
  };
  data = initialData;
  playerId = membershipId;
  const playerDbDoc = await Player.findById(membershipId).exec();

  if (playerDbDoc) {
    data.CoS.minPlayersCount = playerDbDoc.CoS.minPlayersCount.value;
    data.SotP.minPlayersCount = playerDbDoc.SotP.minPlayersCount.value;
    data.lastWish.minPlayersCount = playerDbDoc.lastWish.minPlayersCount.value;
    data.SoS.minPlayersCount = playerDbDoc.SoS.minPlayersCount.value;
    data.EoW.minPlayersCount = playerDbDoc.EoW.minPlayersCount.value;
    data.leviathan.minPlayersCount =
      playerDbDoc.leviathan.minPlayersCount.value;

    lastTimeChecked = new Date(playerDbDoc.last_date);
  }

  for (let i = 0; i < characterIds.length; ++i) {
    await getCharacterActivities(membershipId, membershipType, characterIds[i]);
  }
  return data;
};

const checkPlayerBadges = (activity, raidName, hashes) => {
  const completionDate = new Date(activity.period);
  let count = 0;
  let flawless = true;
  if (
    hashes.some(hash => hash === activity.activityDetails.directorActivityHash)
  ) {
    for (let j = 0; j < activity.entries.length; j++) {
      if (activity.entries[j].values.completed.basic.displayValue === "Yes") {
        ++count;
      }
      if (
        activity.entries[j].values.completionReason.basic.value === 0 &&
        activity.entries[j].values.deaths.basic.value !== 0
      ) {
        flawless = false;
      }
    }

    if (count <= 4 && count < data[raidName].minPlayersCount) {
      data[raidName].minPlayersCount = count;
      findAndUpdate(
        playerId,
        raidName,
        "minPlayersCount",
        count,
        activity.activityDetails.instanceId,
        activity.period
      );
    }
    if (flawless && activity.startingPhaseIndex === 0) {
      findAndUpdate(
        playerId,
        raidName,
        "flawless",
        true,
        activity.activityDetails.instanceId,
        activity.period
      );
    }

    if (completionDate <= dates[raidName].dayOne) {
      findAndUpdate(
        playerId,
        raidName,
        "dayOne",
        true,
        activity.activityDetails.instanceId,
        activity.period
      );
    }
    if (completionDate <= dates[raidName].weekOne) {
      findAndUpdate(
        playerId,
        raidName,
        "weekOne",
        true,
        activity.activityDetails.instanceId,
        activity.period
      );
    }
  }
};

const getCharacterActivities = async (
  membershipId,
  membershipType,
  characterId
) => {
  mainLoop: for (let page = 0; page < 20; ++page) {
    const result = await getActivityHistory(
      membershipId,
      membershipType,
      characterId,
      "raid",
      page,
      250
    );

    if (Object.keys(result.data.Response).length === 0) {
      break;
    }
    for (let k = 0; k < result.data.Response.activities.length; k++) {
      const currentActivityPeriod = new Date(
        result.data.Response.activities[k].period
      );

      if (currentActivityPeriod < lastTimeChecked) {
        break mainLoop;
      }

      if (
        result.data.Response.activities[k].values.completionReason.basic
          .value === 0
      ) {
        const activity = result.data.Response.activities[k];
        getPgcrAndBadges(activity.activityDetails.instanceId);
      }
    }
  }
};

function getPgcrAndBadges(instanceId) {
  getPGCR(instanceId)
    .then(async resp => {
      const Response = resp.data.Response;

      for (let v = 0; v < Response.entries.length; v++) {
        if (
          Response.entries[v].player.destinyUserInfo.membershipId === playerId
        ) {
          if (
            Response.entries[v].values.completed.basic.displayValue === "Yes"
          ) {
            await Promise.all([
              checkPlayerBadges(Response, "leviathan", [
                2693136600,
                2693136601,
                2693136602,
                2693136603,
                2693136604,
                2693136605,
                417231112,
                757116822,
                1685065161,
                2449714930,
                3446541099,
                3879860661
              ]),
              checkPlayerBadges(Response, "EoW", [3089205900, 809170886]),
              checkPlayerBadges(Response, "SoS", [119944200, 3213556450]),
              checkPlayerBadges(Response, "lastWish", [2122313384]),
              checkPlayerBadges(Response, "SotP", [548750096, 2812525063]),
              checkPlayerBadges(Response, "CoS", [960175301, 3333172150])
            ]);
          }
        }
      }
    })
    .catch(err => console.log("v:", err));
}

const findAndUpdate = (
  membershipId,
  raidName,
  badgeName,
  value,
  instanceId,
  period
) => {
  const field = `${raidName}.${badgeName}.value`;
  const instanceIdField = `${raidName}.${badgeName}.instanceId`;
  Player.findOneAndUpdate(
    {
      _id: membershipId
    },
    {
      [field]: value,
      [instanceIdField]: instanceId,
      last_date: period
    },
    { upsert: true, setDefaultsOnInsert: true },
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};
