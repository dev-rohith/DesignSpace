import { Router } from "express";
import landingCtrl from "../controllers/landing-controller.js";
import { uploadSingleFile } from "../middleware/multer-middleware.js";

const router = Router();

router.get("/", landingCtrl.getLanding);

router.post(
  "/carousel",
  uploadSingleFile(
    ["image/jpeg", "image/png", "image/gif", "video/mp4"],
    "carousel"
  ),
  landingCtrl.createCarouselItem
);

router.delete("/carousel/:public_id", landingCtrl.deleteCarouselItem);

router.post("/designer", landingCtrl.addTopDesigner);
router.delete("/desinger/:desinger_id", landingCtrl.deleteTopDesigner);

router.post(
  "/customer-review",
  uploadSingleFile(["video/mp4"], "reviewVideo"),
  landingCtrl.addCustomerReview
);

router.delete("/customer-review/:public_id", landingCtrl.deleteCustomerReview);

export default router;
