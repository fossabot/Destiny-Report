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
    icon:
      "https://www.bungie.net/common/destiny2_content/icons/a4b2789de63ea71cdfb81762b073fcd9.png",
    stepName: "GUARDIAN I"
  }
};

module.exports = async (membershipId, membershipType) => {
  const {
    data: { Response }
  } = await getHistorialStats(membershipId, membershipType, [63, 75]);

  //gambit
  data.gambit.kd = getSafe(
    () => Response.pvecomp_gambit.allTime.killsDeathsRatio.basic.value,
    0
  );
  data.gambit.activitiesEntered = getSafe(
    () => Response.pvecomp_gambit.allTime.activitiesEntered.basic.value,
    0
  );
  data.gambit.activitiesWon = getSafe(
    () => Response.pvecomp_gambit.allTime.activitiesWon.basic.value,
    0
  );

  data.gambit.totalActivityDuration = getSafe(
    () =>
      Response.pvecomp_gambit.allTime.totalActivityDurationSeconds.basic.value,
    0
  );

  //Gambit Prime
  data.gPrime.kd = getSafe(
    () => Response.pvecomp_mamba.allTime.killsDeathsRatio.basic.value,
    0
  );
  data.gPrime.activitiesEntered = getSafe(
    () => Response.pvecomp_mamba.allTime.activitiesEntered.basic.value,
    0
  );
  data.gPrime.activitiesWon = getSafe(
    () => Response.pvecomp_mamba.allTime.activitiesWon.basic.value,
    0
  );
  data.gPrime.totalActivityDuration = getSafe(
    () =>
      Response.pvecomp_mamba.allTime.totalActivityDurationSeconds.basic.value,
    0
  );

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

  if (progressionStats.characterProgressions.data) {
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
  }

  return data;
};
