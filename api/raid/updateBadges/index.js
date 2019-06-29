const { getProfile } = require("../../../src/utils/endpoints");
const checkForBadges = require("../../../src/server/checkForBadges");
const connectMongoose = require("../../../src/server/connectMongoose");
const Player = require("../../../src/server/models/player");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const query = req.query;
    const { membershipId, membershipType } = query;

    if (membershipType && membershipType) {
      const profileReponse = await getProfile(membershipId, membershipType, [
        100
      ]);

      if (profileReponse.data.ErrorCode !== 1) {
        res.json({
          ErrorCode: profileReponse.data.ErrorCode,
          success: false,
          ErrorStatus: profileReponse.data.ErrorStatus,
          Message: profileReponse.data.Message
        });
        return;
      }

      await connectMongoose();
      const characterIds =
        profileReponse.data.Response.profile.data.characterIds;

      await checkForBadges(membershipType, membershipId, characterIds);

      //update the last_date
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const data = await Player.findById(membershipId).exec();

      mongoose.connection.close();

      if (data) {
        res.json({
          success: true,
          data
        });
      } else {
        throw new Error();
      }
    } else {
      res.json({
        success: false,
        ErrorCode: 18,
        ErrorStatus: "MembershipId And(Or) MembershipType Not Found",
        Message: "MembershipId And MembershipType Are Required"
      });
    }
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
