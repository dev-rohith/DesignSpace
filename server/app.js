import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import fs from "fs";

import userRouter from "./routes/user-routes.js";
import applicationRouter from "./routes/application-routes.js";
import taskRouter from "./routes/task-routes.js";
import landingRouter from "./routes/landing-routes.js";
import desingerRouter from "./routes/desinger-routes.js";
import projectRouter from './routes/project-routes.js'

import globalErrorHandler from "./controllers/error-controller.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

const logStream = fs.createWriteStream("./access.log", { flags: "a" });
app.use(morgan("dev", { stream: logStream }));

//routing api middleware

app.use("/api/v1/user", userRouter);

app.use("/api/v1/landing", landingRouter);

app.use("/api/v1/application", applicationRouter);

app.use("/api/v1/task", taskRouter);

app.use("/api/v1/designer", desingerRouter);

app.use("/api/v1/project", projectRouter);

app.use(globalErrorHandler);

export default app;
