import chalk from "chalk";
import 'dotenv/config'

import {createServer} from 'http'

import app from "./app.js";
import connectDB from "./config/db-config.js";
import connectRedis from "./config/redis-config.js";






  // database connection
connectDB()

// redis connection
connectRedis()


const server = createServer(app)

const port = process.env.PORT ||  5000

server.listen(port, ()=> {
    console.log(chalk.yellow(`Server is running on port: ${port}`))
})