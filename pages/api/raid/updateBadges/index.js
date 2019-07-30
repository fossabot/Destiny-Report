import { getProfile } from "../../../../src/utils/endpoints";
import checkForBadges from "../../../../src/server/checkForBadges";
import connectMongoose from "../../../../src/server/connectMongoose";
import Player from "../../../../src/server/models/player";

export default async (req, res) => {
  req.socket.setTimeout(0);
  try {
    const query = req.query;
    const { membershipId, membershipType } = query;

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
    const characterIds = profileReponse.data.Response.profile.data.characterIds;

    await checkForBadges(membershipType, membershipId, characterIds);

    const data = await Player.findById(membershipId).exec();

    res.json({
      success: true,
      data
    });
  } catch (err) {
    if (err.response) {
      res.json({
        success: false,
        ErrorCode: err.response.data.ErrorCode,
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
