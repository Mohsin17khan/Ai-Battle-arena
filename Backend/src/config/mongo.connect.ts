import mongoose from "mongoose";
import dotenv from "dotenv";
import  dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);


dotenv.config();

export const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI missing ❌");
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error("MongoDB Error ❌", error);
    process.exit(1);
  }
};