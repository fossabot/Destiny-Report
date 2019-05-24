const { json } = require("micro");

module.exports = async (req, res) => {
  const body = await json(req);

  return body;
};
