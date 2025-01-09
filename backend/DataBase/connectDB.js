import mongoose from "mongoose";
// DATA BASE NAME
export const DB_NAME = "HospitalUser";

// CONNECTION STRING
const connectDb = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${DB_NAME}`,
      console.log(`MongoDB Connected successfully to ${DB_NAME}`)
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export { connectDb };
