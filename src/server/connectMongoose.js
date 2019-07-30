import mongoose from "mongoose";

export default async () => {
  await mongoose.connect(process.env.DB_KEY, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.Promise = global.Promise;
};
