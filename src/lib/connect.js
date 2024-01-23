import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

const connectDB = async () => {
  try {
    mongoose.connect(MONGODB_URI);

    if (mongoose.connection) {
      mongoose.connection.on("error", (error) => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running.",
          error
        );
        // Show error message in console
        process.exit();
      });
      mongoose.connection.on("connected", () => {
        console.log("MongoDB connected.");
      });
      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected.");
      });
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default connectDB;