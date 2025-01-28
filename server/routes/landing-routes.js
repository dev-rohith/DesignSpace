import { Router } from "express";
import landingCtrl from "../controllers/landing-controller.js";
import { uploadSingleFile } from "../middleware/multer-middleware.js";

const router = Router();

router.get("/", landingCtrl.getLanding);

router.post(
  "/carousel",
  uploadSingleFile(
    ["image/jpeg", "image/png", "image/gif, video/mp3"],
    "carousel",
    1024 * 1024 * 5
  ),
  landingCtrl.createCarouselItem
);

export default router;
