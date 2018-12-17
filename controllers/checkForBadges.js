const { getPGCR, getCharacterActivity } = require("../utility/endpoints");
const Player = require("../models/player");

const leviathanDayOne = new Date("2017-09-14T17:00:00Z");
const leviathanWeekOne = new Date("2017-09-20T17:00:00Z");

const eowDayOne = new Date("2017-12-09T18:00:00Z");
const eowWeekOne = new Date("2017-12-15T18:00:00Z");

const sosDayOne = new Date("2018-05-12T17:00:00Z");
const sosWeekOne = new Date("2018-05-18T17:00:00Z");

const lastWishDayOne = new Date("2018-09-15T17:00:00Z");
const lastWishWeekOne = new Date("2018-09-21T17:00:00Z");

const sotpDayOne = new Date("2018-12-15T17:00:00Z");
const sotpWeekOne = new Date("2018-12-21T17:00:00Z");

module.exports = async (membershipType, membershipId, characterIds) => {
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
          for (let k = 0; k < result.data.Response.activities.length; ++k) {
            if (
              result.data.Response.activities[k].values.completed.basic
                .value === 1
            ) {
              const PGCRResult = await getPGCR(
                result.data.Response.activities[k].activityDetails.instanceId
              );
              checkFireteamBadges(PGCRResult.data.Response);
            }
          }
        }
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

const checkFireteamBadges = response => {
  const startingPhaseIndex = response.startingPhaseIndex;

  const instanceId = response.activityDetails.instanceId;
  const activityHash = response.activityDetails.directorActivityHash;
  let activeRaid = "";
  let isCompleted = false;
  let count = 0;

  //Badges
  let isFlawless = true;
  let isFourMan = false;
  let isThreeMan = false;
  let isTwoMan = false;
  let isDayOne = false;
  let isWeekOne = false;

  for (let player of response.entries) {
    if (player.values.completed.basic.value === 1) {
      count++;
      isCompleted = true;

      if (activityHash === 2122313384) {
        activeRaid = "lastWish";
        if (player.values.deaths.basic.value > 0) {
          isFlawless = false;
        }

        const finishedRaidDateAndTime = new Date(response.period);
        finishedRaidDateAndTime.setSeconds(
          finishedRaidDateAndTime.getSeconds() +
            player.values.activityDurationSeconds.basic.value
        );
        if (finishedRaidDateAndTime < lastWishDayOne) {
          isDayOne = true;
          isWeekOne = true;
        }
        if (finishedRaidDateAndTime < lastWishWeekOne) {
          isWeekOne = true;
        }
      } else if (
        activityHash === 2693136600 ||
        activityHash === 2693136601 ||
        activityHash === 2693136602 ||
        activityHash === 2693136603 ||
        activityHash === 2693136604 ||
        activityHash === 2693136605 ||
        activityHash === 417231112 ||
        activityHash === 757116822 ||
        activityHash === 1685065161 ||
        activityHash === 2449714930 ||
        activityHash === 3446541099 ||
        activityHash === 3879860661
      ) {
        activeRaid = "leviathan";
        if (player.values.deaths.basic.value > 0) {
          isFlawless = false;
        }

        const finishedRaidDateAndTime = new Date(response.period);

        finishedRaidDateAndTime.setSeconds(
          finishedRaidDateAndTime.getSeconds() +
            player.values.activityDurationSeconds.basic.value
        );

        if (finishedRaidDateAndTime < leviathanDayOne) {
          isDayOne = true;
          isWeekOne = true;
        }
        if (finishedRaidDateAndTime < leviathanWeekOne) {
          isWeekOne = true;
        }
      } else if (activityHash === 3089205900 || activityHash === 809170886) {
        activeRaid = "EoW";
        if (player.values.deaths.basic.value > 0) {
          isFlawless = false;
        }

        const finishedRaidDateAndTime = new Date(response.period);
        finishedRaidDateAndTime.setSeconds(
          finishedRaidDateAndTime.getSeconds() +
            player.values.activityDurationSeconds.basic.value
        );
        if (finishedRaidDateAndTime < eowDayOne) {
          isDayOne = true;
          isWeekOne = true;
        }
        if (finishedRaidDateAndTime < eowWeekOne) {
          isWeekOne = true;
        }
      } else if (activityHash === 119944200 || activityHash === 3213556450) {
        activeRaid = "SoS";
        if (player.values.deaths.basic.value > 0) {
          isFlawless = false;
        }

        const finishedRaidDateAndTime = new Date(response.period);
        finishedRaidDateAndTime.setSeconds(
          finishedRaidDateAndTime.getSeconds() +
            player.values.activityDurationSeconds.basic.value
        );
        if (finishedRaidDateAndTime < sosDayOne) {
          isDayOne = true;
          isWeekOne = true;
        }
        if (finishedRaidDateAndTime < sosWeekOne) {
          isWeekOne = true;
        }
      } else if (activityHash === 548750096 || activityHash === 2812525063) {
        activeRaid = "SotP";
        if (player.values.deaths.basic.value > 0) {
          isFlawless = false;
        }

        const finishedRaidDateAndTime = new Date(response.period);
        finishedRaidDateAndTime.setSeconds(
          finishedRaidDateAndTime.getSeconds() +
            player.values.activityDurationSeconds.basic.value
        );
        if (finishedRaidDateAndTime < sotpDayOne) {
          isDayOne = true;
          isWeekOne = true;
        }
        if (finishedRaidDateAndTime < sotpWeekOne) {
          isWeekOne = true;
        }
      }
    }
  }

  if (isCompleted && (isFlawless || count < 5)) {
    if (count === 4) {
      isFourMan = true;
    } else if (count === 3) {
      isThreeMan = true;
    } else if (count === 2) {
      isTwoMan = true;
    }

    if (startingPhaseIndex === 0) {
      for (let player of response.entries) {
        if (player.values.completed.basic.value === 1) {
          const membershipId = player.player.destinyUserInfo.membershipId;

          if (isFlawless) {
            findAndUpdate(membershipId, activeRaid, "flawless", instanceId);
          }
          if (isFourMan) {
            findAndUpdate(membershipId, activeRaid, "fourMan", instanceId);
          }
          if (isThreeMan) {
            findAndUpdate(membershipId, activeRaid, "threeMan", instanceId);
          }
          if (isTwoMan) {
            findAndUpdate(membershipId, activeRaid, "twoMan", instanceId);
          }
        }
      }
    }
  }

  for (let player of response.entries) {
    if (player.values.completed.basic.value === 1) {
      const membershipId = player.player.destinyUserInfo.membershipId;

      if (isDayOne) {
        findAndUpdate(membershipId, activeRaid, "dayOne", instanceId);
      }
      if (isWeekOne) {
        findAndUpdate(membershipId, activeRaid, "weekOne", instanceId);
      }
    }
  }
};

//Add the badge to DB
const findAndUpdate = (membershipId, raidName, badgeName, instanceId) => {
  const field = `${raidName}.${badgeName}.value`;
  const instanceIdField = `${raidName}.${badgeName}.instanceId`;
  Player.findOneAndUpdate(
    {
      _id: membershipId
    },
    {
      [field]: true,
      [instanceIdField]: instanceId
    },
    { upsert: true, setDefaultsOnInsert: true },
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};
