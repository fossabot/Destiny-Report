const mongoose = require("mongoose");

module.exports = async () => {
  console.log(process.env.DB_KEY);
  await mongoose.connect(process.env.DB_KEY, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.Promise = global.Promise;
};
