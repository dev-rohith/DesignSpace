import { Router } from "express";

import designerProfileCtrl from "../controllers/desinger-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadMultipleFiles } from "../middleware/multer-middleware.js";

const router = Router();

// router.get('/', designerProfileCtrl.get)
router.get("/portfolios", designerProfileCtrl.getAllPortfolios);

router.get("/all", designerProfileCtrl.getAllDesingers);

router.get("/:designer_id", designerProfileCtrl.getDesingerProfile);


/////////////////////////////--auth-needed--///////////////////////////////////////////////////////////////////////////

router.use(authMiddleWare.protect);
router.use(authMiddleWare.authorize("designer"));

router
  .route("/")
  .post(designerProfileCtrl.createProfile)
  .get(designerProfileCtrl.getMyProfile);
router
  .route("/portfolio")
  .post(
    uploadMultipleFiles(["image/png", "image/jpeg"], 1024 * 1024 * 10, 5),
    designerProfileCtrl.addItemToPortfolio
  )
  .get(designerProfileCtrl.getMyPortfolio);

router.delete('/portfolio/:item_id', designerProfileCtrl.deleteItemFromPortfolio)

export default router;
