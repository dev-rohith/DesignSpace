import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import googleAuth from "passport-google-oauth20";

import fs from "fs";

import userRouter from "./routes/user-routes.js";
import User from "./models/user-model.js";

const app = express();

app.use(cors());

app.use(cookieParser());

const GoogleStrategy = googleAuth.Strategy;
app.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "auth/google/callback",
    },
    async (_, _, profile, done) => {
      try {
        let user = await User.find({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            googleId: profile.id,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

const logStream = fs.createWriteStream("./access.log", { flags: "a" });
app.use(morgan("combined", { stream: logStream }));

//routing api middleware
app.use("/api/v1", userRouter);

export default app;
