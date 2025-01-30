import { Router } from "express";

import designerProfileCtrl from "../controllers/desinger-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadMultipleFiles } from "../middleware/multer-middleware.js";

const router = Router();

// router.get('/', designerProfileCtrl.get)
router.get('/portfolios', designerProfileCtrl.getAllPortfolios)

router.get('s', designerProfileCtrl.getAllDesingers)

router.use(authMiddleWare.protect)
router.use(authMiddleWare.authorize("designer"));

router.post("/", designerProfileCtrl.createProfile)
router.route("/portfolio").post(
  uploadMultipleFiles(["image/png", "image/jpeg"], 1024 * 1024 * 10, 5),
  designerProfileCtrl.addItemToPortfolio
).get(designerProfileCtrl.getMyPortfolio)


export default router;
