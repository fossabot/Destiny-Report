const { getHistorialStats, getAllProgression } = require("../utils/endpoints");
const getSafe = require("../utils/getValueSafely");
const { values } = require("lodash");
const { infamySteps } = require("../utils/steps");

const data = {
  overall: {
    activitiesEntered: 0,
    activitiesWon: 0,
    kd: "",
    totalActivityDuration: ""
  },
  gambit: {
    activitiesEntered: 0,
    activitiesWon: 0,
    kd: "",
    totalActivityDuration: ""
  },
  gPrime: {
    activitiesEntered: 0,
    activitiesWon: 0,
    kd: "",
    totalActivityDuration: ""
  },
  infamy: {
    name: "Infamy",
    resets: 0,
    currentPoints: 0,
    rank: 0,
    icon: "",
    stepName: ""
  }
};

module.exports = async (membershipId, membershipType) => {
  const {
    data: { Response }
  } = await getHistorialStats(membershipId, membershipType, [63, 75]);

  //gambit
  data.gambit.kd = Response.pvecomp_gambit.allTime.killsDeathsRatio.basic.value;
  data.gambit.activitiesEntered =
    Response.pvecomp_gambit.allTime.activitiesEntered.basic.value;
  data.gambit.activitiesWon =
    Response.pvecomp_gambit.allTime.activitiesWon.basic.value;
  data.gambit.totalActivityDuration =
    Response.pvecomp_gambit.allTime.totalActivityDurationSeconds.basic.value;

  //Gambit Prime
  data.gPrime.kd = Response.pvecomp_mamba.allTime.killsDeathsRatio.basic.value;
  data.gPrime.activitiesEntered =
    Response.pvecomp_mamba.allTime.activitiesEntered.basic.value;
  data.gPrime.activitiesWon =
    Response.pvecomp_mamba.allTime.activitiesWon.basic.value;
  data.gPrime.totalActivityDuration =
    Response.pvecomp_mamba.allTime.totalActivityDurationSeconds.basic.value;

  //Overall
  data.overall.kd = (data.gambit.kd + data.gPrime.kd) / 2;
  data.overall.activitiesEntered =
    data.gambit.activitiesEntered + data.gPrime.activitiesEntered;
  data.overall.activitiesWon =
    data.gambit.activitiesWon + data.gPrime.activitiesWon;
  data.overall.totalActivityDuration =
    data.gambit.totalActivityDuration + data.gPrime.totalActivityDuration;

  //infamy
  const {
    data: { Response: progressionStats }
  } = await getAllProgression(membershipType, membershipId, [100, 202, 900]);

  const infamyLevelStats = values(
    progressionStats.characterProgressions.data
  )[0].progressions["2772425241"];

  data.infamy.rank = infamyLevelStats.level;
  data.infamy.currentPoints = infamyLevelStats.currentProgress;

  data.infamy.resets = getSafe(
    () =>
      progressionStats.profileRecords.data.records["3901785488"].objectives[0]
        .progress,
    0
  );
  step = infamyLevelStats.stepIndex;
  data.infamy.stepName = infamySteps[step].stepName;
  data.infamy.icon = "https://www.bungie.net" + infamySteps[step].icon;

  return data;
};
