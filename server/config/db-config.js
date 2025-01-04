import chalk from "chalk";
import mongoose from "mongoose";


const DB_URI =  'mongodb://127.0.0.1:27017/navora'
//  process.env.DB_URI.replace( '' ,  '')


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