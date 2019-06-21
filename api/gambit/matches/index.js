const {
  getActivityHistory,
  getProfile
} = require("../../../src/utils/endpoints");

module.exports = async (req, res) => {
  const query = req.query;
  const { membershipId, membershipType } = query;

  try {
    const charcatersResponse = await getProfile(membershipId, membershipType, [
      100
    ]);

    const characterIds =
      charcatersResponse.data.Response.profile.data.characterIds;

    const promisesToBeResolved = [];
    for (let i = 0; i < characterIds.length; i++) {
      promisesToBeResolved.push(
        getActivityHistory(membershipId, membershipType, characterIds[i], 63)
      );
      promisesToBeResolved.push(
        getActivityHistory(membershipId, membershipType, characterIds[i], 75)
      );
      promisesToBeResolved.push(
        getActivityHistory(membershipId, membershipType, characterIds[i], 76)
      );
    }

    const result = await Promise.all(promisesToBeResolved);
    let activities = [];
    for (let i = 0; i < result.length; i++) {
      if (result[i].data.Response.activities) {
        activities = [...activities, ...result[i].data.Response.activities];
      }
    }

    activities = activities
      .sort((a, b) => {
        return new Date(b.period) - new Date(a.period);
      })
      .slice(0, 10);
    res.json(activities);
  } catch (error) {
    console.log(error);
    res.json([]);
  }
};
