import { Router, text } from "express";
import passport from "passport";
import nodemailer from "nodemailer";

import authController from "../controllers/auth-controller.js";
import userCtrl from "../controllers/user-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import Email from "../utils/send-email.js";

const router = Router();

//authentication stuff here
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleLoginSuccess
);

//auth router
router.post("/signup", authController.signup);
router.post("/verify/:user_id", authController.verifyUser);
router.post("/resend-verify/:user_id", authController.resendVerification);

router.post("/login", authController.login);

router.post("/forgetPassword", authController.forgotPassword);
router.put("/resetPassword/:token", authController.resetPassword);

router.post("/logout/:deviceId", authController.logoutDevice);

//refresh token rotation

router.get("/refreshToken", authMiddleWare.refreshToken_rotation);

//////////////////////////////////////////////////////////////////////////////

//user controller stuff here

router.get("/me", authMiddleWare.protect, userCtrl.getUser);

router.post("/forgetPassword", authController.forgotPassword);

router.put("/resetPassword/:token", authController.resetPassword);

router.use(authMiddleWare.protect);

router.post("/logout", authController.logoutUser);

router.post("/logoutall", userCtrl.logoutAllUsers);

router.put("/updatePassword", userCtrl.updatePassword); // currentPassword, newPassword

router.put("/update");

//designer power /////////////////////////////////////////////////////

router.get(
  "/clients",
  authMiddleWare.authorize("designer"),
  userCtrl.getClients
);

//admin power ////////////////////////////////////////////////////////

router.use(authMiddleWare.authorize("admin"));

router.get("/", userCtrl.getUsers);
router.put("/:id", userCtrl.UserStatusController);

export default router;
