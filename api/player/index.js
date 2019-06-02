const { parse } = require("url");
const { getProfile } = require("../../src/utils/endpoints");
const getCharacterLoadout = require("../../src/utils/server/getChacterLoadout");

module.exports = async (req, res) => {
  try {
    const { query } = parse(req.url, true);
    const { membershipId, membershipType } = query;

    if (membershipType && membershipType) {
      const profileReponse = await getProfile(membershipId, membershipType, [
        200,
        205
      ]);

      if (profileReponse.data.ErrorCode !== 1) {
        res.end(
          JSON.stringify({
            ErrorCode: profileReponse.data.ErrorCode,
            success: false,
            ErrorStatus: profileReponse.data.ErrorStatus,
            Message: profileReponse.data.Message
          })
        );
        return;
      }
      const equipments = profileReponse.data.Response.characterEquipment.data;
      const characters = profileReponse.data.Response.characters.data;
      const charactersIds = Object.keys(equipments);

      const promisesTobeResolved = [];

      for (let i = 0; i < charactersIds.length; ++i) {
        const promise = getCharacterLoadout(
          membershipId,
          membershipType,
          equipments[charactersIds[i]],
          characters[charactersIds[i]]
        );
        promisesTobeResolved.push(promise);
      }

      const perksAndDefinition = await Promise.all(promisesTobeResolved);

      res.end(
        JSON.stringify({
          success: true,
          data: perksAndDefinition
        })
      );
    } else {
      res.end(
        JSON.stringify({
          success: false,
          ErrorCode: 18,
          ErrorStatus: "MembershipId And(Or) MembershipType Not Found",
          Message: "MembershipId And MembershipType Are Required"
        })
      );
    }
  } catch (err) {
    console.log(err.message);
    res.end(
      JSON.stringify({
        success: false,
        ErrorCode: 111993,
        ErrorStatus: "Something Went Wrong Or Bungie API Down",
        Message: "Please Try Again Later"
      })
    );
  }
};
