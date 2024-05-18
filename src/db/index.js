import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://reemasahusbp5345:aLMkVe8G9nvuVlTg@cluster0.dp0gusz.mongodb.net/kuvera'`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Connection to database FAILED", error);
    process.exit(1);
  }
};

export default ConnectDB;
