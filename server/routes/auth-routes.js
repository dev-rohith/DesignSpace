import { Router, text } from "express";
import passport from "passport";

import authController from "../controllers/auth-controller.js";
import userCtrl from "../controllers/user-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadAvatar } from "../middleware/multer-middleware.js";

const router = Router();

//token rotation
router.get("/refreshToken", authMiddleWare.refreshToken_rotation);



//auth router
router.post(
  "/signup",
  authController.signup,
  authController.sendOtpVerfication
);

router.post("/verify/:user_id", authController.verifyAccount);
router.post("/resend-verify/:user_id", authController.resendVerification);

router.post("/login", authController.login);

router.post("/forgetPassword", authController.forgotPassword);
router.put("/resetPassword/:token", authController.resetPassword);


router.post("/forgetPassword", authController.forgotPassword);
router.put("/resetPassword/:token", authController.resetPassword);

 // user logout but the refresh is needed
router.post("/logout/:deviceId", authController.logoutDevice);

///   protected stuff here

router.use(authMiddleWare.protect);

router.post("/logout", authController.logoutUser);

router.post("/logoutall", userCtrl.logoutAllUsers);

////////---------------------------------------------------------------------

//refresh token rotation


//////////////////////////////////////////////////////////////////////////////

//user controller stuff here


export default router;
