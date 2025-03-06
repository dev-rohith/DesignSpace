import chalk from "chalk";  //light weight maybe remove
import mongoose from "mongoose";

      //need to change later
const DB_URI =  'mongodb://127.0.0.1:27017/navora'


const connectDB = async () => {
    try {
        const DB = await mongoose.connect(DB_URI)
        console.log(chalk.blue(`MongoDB Connected : ${DB.connection.host}...`))
    } catch (error) {
        console.log(chalk.red(`MongoDB Not Connected 💥: ${error.message}`))
        process.exit(1);
    }
}

export default connectDB