const { json } = require("micro");

module.exports = async (req, res) => {
  const body = await json(req);
  console.log(res);
  res.end(JSON.stringify(body));
};
