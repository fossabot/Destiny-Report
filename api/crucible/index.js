const {
  getProfile,
  getHistorialStats,
  getAllProgression
} = require("../../src/utils/endpoints");
const getCrucibleOverallStats = require("../../src/server/getCrucibleOverallStats");
const getSafe = require("../../src/utils/getValueSafely");
const { parse } = require("url");
const { values } = require("lodash");

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  const { membershipId, membershipType } = query;
  if (!membershipType || !membershipType) {
    res.end(
      JSON.stringify({
        success: false,
        ErrorCode: 18,
        ErrorStatus: "MembershipId And(Or) MembershipType Not Found",
        Message: "MembershipId And MembershipType Are Required"
      })
    );
  }

  const data = {
    overall: {
      activitiesEntered: 0,
      activitiesWon: 0,
      totalActivityDuration: ""
    },
    valor: {
      resets: 0,
      currentPoints: 0,
      rank: 0
    },
    glory: {
      resets: 0,
      currentPoints: 0,
      rank: 0
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

    data.overall.activitiesEntered =
      Response.allPvP.allTime.activitiesEntered.basic.value;
    data.overall.activitiesWon =
      Response.allPvP.allTime.activitiesWon.basic.value;
    data.overall.totalActivityDuration =
      Response.allPvP.allTime.totalActivityDurationSeconds.basic.displayValue;

    const {
      data: { Response: progressionStats }
    } = await getAllProgression(membershipType, membershipId, [100, 202, 900]);

    //comp
    const gloryLevelStats = values(
      progressionStats.characterProgressions.data
    )[0].progressions["2000925172"];

    data.glory.rank = gloryLevelStats.level;
    data.glory.currentPoints = gloryLevelStats.currentProgress;

    data.glory.resets = getSafe(
      () =>
        progressionStats.profileRecords.data.records["4185918315"].objectives[0]
          .progress,
      0
    );

    //quick play
    const valorLevelStats = values(
      progressionStats.characterProgressions.data
    )[0].progressions["2626549951"];

    data.valor.rank = valorLevelStats.level;
    data.valor.currentPoints = valorLevelStats.currentProgress;

    data.valor.resets = getSafe(
      () =>
        progressionStats.profileRecords.data.records["559943871"].objectives[0]
          .progress,
      0
    );

    //activityTypes overall stats
    const stats = await getCrucibleOverallStats(
      membershipId,
      membershipType,
      charcatersResponse.profile.data.characterIds
    );

    data.stats = stats;
    res.end(JSON.stringify({ success: true, data }));
  } catch (err) {
    res.end(
      JSON.stringify({
        success: false,
        ErrorCode: 111993,
        ErrorStatus: err.response.data.ErrorStatus,
        Message: err.response.data.Message
      })
    );
  }
};
