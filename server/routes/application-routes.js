import { Router } from "express";
import applicationCtrl from "../controllers/application-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadMultipleFiles } from "../middleware/multer-middleware.js";

const router = Router();

router.use(authMiddleWare.protect);

router.post(
  "/",
  authMiddleWare.authorize("client"),
  uploadMultipleFiles(["application/pdf", "video/mp4"], 1024*1024 * 1024 * 20, 2),
  applicationCtrl.createApplication
);

router.use(authMiddleWare.authorize("admin"));

router.get("/", applicationCtrl.getApplications);

router.put("/:id", applicationCtrl.updateApplication);

export default router;
