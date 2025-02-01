import { Router } from "express";
import associateProfileCtrl from "../controllers/associate-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";

const router = Router();

router.use(authMiddleWare.protect);

router.get('/all',authMiddleWare.authorize('designer'), associateProfileCtrl.getAssociates)

router.use(authMiddleWare.authorize("associate"));

router
  .route("/profile")
  .post(associateProfileCtrl.createProfile)
  .put(associateProfileCtrl.updateProfile)
  .get(associateProfileCtrl.getMyProfile);

export default router;


