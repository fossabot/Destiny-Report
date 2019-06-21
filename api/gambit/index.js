const getGambitStats = require("../../src/server/getGambitStats");

module.exports = async (req, res) => {
  const query = req.query;
  const { membershipId, membershipType } = query;

  if (!membershipType || !membershipType) {
    res.json({
      success: false,
      ErrorCode: 18,
      ErrorStatus: "MembershipId And(Or) MembershipType Not Found",
      Message: "MembershipId And MembershipType Are Required"
    });
    return;
  }

  try {
    const data = await getGambitStats(membershipId, membershipType);
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
