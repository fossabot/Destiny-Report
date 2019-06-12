const { parse } = require("url");
const { getProfile } = require("../../src/utils/endpoints");
const getCharacterLoadout = require("../../src/server/getChacterLoadout");
const getJsonManifest = require("../../src/server/getJsonManifest");

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

      await getJsonManifest();
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
