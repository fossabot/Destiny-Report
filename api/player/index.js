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

      res.end(JSON.stringify(perksAndDefinition));
    } else {
      res.end(
        JSON.stringify({
          success: "false",
          error: "MembershipId and membershipType required"
        })
      );
    }
  } catch (err) {
    console.log(err);
    res.end(
      JSON.stringify({
        success: "false",
        error: "Something went wrong"
      })
    );
  }
};
