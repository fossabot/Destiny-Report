const getRaidStats = require("../../src/server/getRaidStats");
const { getProfile } = require("../../src/utils/endpoints");

module.exports = async (req, res) => {
  const query = req.query;
  const { membershipId, membershipType } = query;

  if (!membershipId || !membershipType) {
    res.json({
      success: false,
      ErrorCode: 18,
      ErrorStatus: "MembershipId And(Or) MembershipType Not Found",
      Message: "MembershipId And MembershipType Are Required"
    });
    return;
  }

  try {
    const {
      data: { Response: charcatersResponse }
    } = await getProfile(membershipId, membershipType, [100]);

    const data = await getRaidStats(
      membershipId,
      membershipType,
      charcatersResponse.profile.data.characterIds
    );

    res.json({ success: true, data });
  } catch (err) {
    console.log(err);
    if (err.response) {
      res.json({
        success: false,
        ErrorCode: 111993,
        ErrorStatus: err.response.data.ErrorStatus,
        Message: err.response.data.Message
      });
    } else {
      res.json({
        success: false,
        ErrorCode: 111993,
        ErrorStatus: "Somthing Went Wrong",
        Message: "Please Try Again Later"
      });
    }
  }
};
