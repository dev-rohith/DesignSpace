import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import fs from 'fs'


const app = express()

app.use(cors())

app.use(cookieParser())

const logStream = fs.createWriteStream('./access.log' ,{flags: 'a'})
app.use(morgan('combined', {stream: logStream}))



export default app