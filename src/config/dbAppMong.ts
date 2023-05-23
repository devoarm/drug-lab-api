import { ConnectOptions } from "mongodb";
import mongoose from "mongoose";
const dbAppMong = async () => {
  await mongoose.connect(
    process.env.NODE_ENV == "dev"
      ? `${process.env.MONGO_URI_DEV}`
      : `${process.env.MONGO_URI_PRODUCT}`
  );
  console.log("MongoDb Connected");
};
export default dbAppMong;
