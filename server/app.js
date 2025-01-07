import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import fs from "fs";

import userRouter from "./routes/user-routes.js";
import globalErrorHandler from "./controllers/error-controller.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());


const logStream = fs.createWriteStream("./access.log", { flags: "a" });
app.use(morgan("dev", { stream: logStream }));

//routing api middleware
app.use("/api/v1", userRouter);



app.use(globalErrorHandler);

export default app;
