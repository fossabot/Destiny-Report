import { getProfile } from "../../../src/utils/endpoints";
import getCharacterLoadout from "../../../src/server/getChacterLoadout";

export default async (req, res) => {
  try {
    const query = req.query;
    const { membershipId, membershipType } = query;

    if (membershipType && membershipType) {
      const profileReponse = await getProfile(membershipId, membershipType, [
        200,
        205
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
      res.json({
        success: true,
        data: perksAndDefinition
      });
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
        Message: "Please Try Again Later"
      });
    }
  }
};
