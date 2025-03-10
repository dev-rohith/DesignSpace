import chalk from "chalk"; //light weight for logs coloring
import mongoose from "mongoose";

//we can also more explicitly pass the connection string by combining url and password but this is fine
const DB_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/navora";

const connectDB = async () => {
  try {
    const DB = await mongoose.connect(DB_URI);
    console.log(chalk.blue(`MongoDB Connected : ${DB.connection.host}...`));
  } catch (error) {
    console.log(chalk.red(`MongoDB Not Connected 💥: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
