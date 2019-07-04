const { getProfile } = require("../../../src/utils/endpoints");
const axios = require("axios");

module.exports = async (req, res) => {
  const query = req.query;
  const { membershipId, membershipType } = query;

  try {
    if (!membershipType || !membershipType) {
      res.json({
        success: false,
        ErrorCode: 18,
        ErrorStatus: "MembershipId And(Or) MembershipType Not Found",
        Message: "MembershipId And MembershipType Are Required"
      });
      return;
    }

    const deploymentUrl = req.headers["x-now-deployment-url"];
    const deploymentProto = req.headers["x-forwarded-proto"];

    axios.get(
      `${deploymentProto}://${deploymentUrl}/api/raid/updateBadgesQueue?membershipId=${membershipId}&membershipType=${membershipType}`,
      {
        headers: {
          "X-Invocation-Type": "Event"
        }
      }
    );

    res.end("done");
  } catch (err) {
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
        Message: "Please Try Again Later",
        data: err
      });
    }
  }
};
