import Player from "../../../../src/server/models/player";
import connectMongoose from "../../../../src/server/connectMongoose";

export default async (req, res) => {
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

  connectMongoose()
    .then(() => {
      Player.findById(membershipId, (err, doc) => {
        if (err) {
          res.json({
            success: false,
            ErrorCode: 111993,
            ErrorStatus: "Something Went Wrong",
            Message: "Please Try Again Later"
          });
        } else {
          res.json({ success: true, data: doc });
        }
      });
    })
    .catch(err => {
      res.json({
        success: false,
        ErrorCode: 111993,
        ErrorStatus: "Something Went Wrong",
        Message: "Please Try Again Later"
      });
    });
};
