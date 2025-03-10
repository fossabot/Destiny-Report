import { values } from "lodash";
import {
  getProfile,
  getHistorialStats,
  getAllProgression
} from "../../../src/utils/endpoints";
import getCrucibleOverallStats from "../../../src/server/getCrucibleOverallStats";
import getSafe from "../../../src/utils/getValueSafely";
import { glorySteps, valorSteps } from "../../../src/utils/steps";

export default async (req, res) => {
  const query = req.query;
  const { membershipId, membershipType } = query;

  if (!membershipType || !membershipType) {
    res.json({
      success: false,
      ErrorCode: 18,
      ErrorStatus: "MembershipId And(Or) MembershipType Not Found",
      Message: "MembershipId And MembershipType Are Required"
    });
  }
  const data = {
    overall: {
      activitiesEntered: 0,
      activitiesWon: 0,
      kd: "",
      totalActivityDuration: ""
    },
    valor: {
      name: "Valor",
      resets: 0,
      currentPoints: 0,
      rank: 0,
      icon:
        "https://www.bungie.net/common/destiny2_content/icons/34586ea2c4de2ce5d0016b3d01cec934.png",
      stepName: "GUARDIAN I"
    },
    glory: {
      name: "Glory",
      resets: 0,
      currentPoints: 0,
      rank: 0,
      icon:
        "https://www.bungie.net/common/destiny2_content/icons/34586ea2c4de2ce5d0016b3d01cec934.png",
      stepName: "GUARDIAN I"
    },
    stats: {}
  };

  try {
    const {
      data: { Response: charcatersResponse }
    } = await getProfile(membershipId, membershipType, [100]);

    const {
      data: { Response }
    } = await getHistorialStats(membershipId, membershipType, [5]);

    if (Object.entries(Response.allPvP).length) {
      data.overall.kd =
        Response.allPvP.allTime.killsDeathsRatio.basic.displayValue;
      data.overall.activitiesEntered =
        Response.allPvP.allTime.activitiesEntered.basic.value;
      data.overall.activitiesWon =
        Response.allPvP.allTime.activitiesWon.basic.value;
      data.overall.totalActivityDuration =
        Response.allPvP.allTime.totalActivityDurationSeconds.basic.displayValue;
    }

    const {
      data: { Response: progressionStats }
    } = await getAllProgression(membershipType, membershipId, [100, 202, 900]);

    if (progressionStats.characterProgressions.data) {
      //comp
      const gloryLevelStats = values(
        progressionStats.characterProgressions.data
      )[0].progressions["2000925172"];

      data.glory.rank = gloryLevelStats.level;
      data.glory.currentPoints = gloryLevelStats.currentProgress;

      data.glory.resets = getSafe(
        () =>
          progressionStats.profileRecords.data.records["4185918315"]
            .objectives[0].progress,
        0
      );

      let step = gloryLevelStats.stepIndex;

      data.glory.stepName = glorySteps[step].stepName;
      data.glory.icon = "https://www.bungie.net" + glorySteps[step].icon;

      //quick play
      const valorLevelStats = values(
        progressionStats.characterProgressions.data
      )[0].progressions["2626549951"];

      data.valor.rank = valorLevelStats.level;
      data.valor.currentPoints = valorLevelStats.currentProgress;

      data.valor.resets = getSafe(
        () =>
          progressionStats.profileRecords.data.records["559943871"]
            .objectives[0].progress,
        0
      );

      step = valorLevelStats.stepIndex;

      data.valor.stepName = valorSteps[step].stepName;
      data.valor.icon = "https://www.bungie.net" + valorSteps[step].icon;
    }
    //activityTypes overall stats
    const stats = await getCrucibleOverallStats(
      membershipId,
      membershipType,
      charcatersResponse.profile.data.characterIds
    );

    data.stats = stats;
    res.json({ success: true, data });
  } catch (err) {
    if (err.response) {
      res.json({
        success: false,
        ErrorCode: 111993,
        ErrorStatus: err.response.data.ErrorStatus,
        Message: err.response.data.Message,
        data
      });
    } else {
      res.json({
        success: false,
        ErrorCode: 111993,
        ErrorStatus: "Somthing Went Wrong",
        Message: "Please Try Again Later",
        data
      });
    }
  }
};
