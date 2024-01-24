import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) { // Check if mongoose is not connected
      await mongoose.connect(MONGODB_URI);3

      mongoose.connection.on("error", (error) => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running.",
          error
        );
        process.exit();
      });
      mongoose.connection.once("open", () => { // Use 'once' instead of 'on' to avoid adding multiple listeners
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