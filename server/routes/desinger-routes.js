import { Router } from "express";

import designerProfileCtrl from "../controllers/desinger-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadMultipleFiles } from "../middleware/multer-middleware.js";

const router = Router();

router.get("/all", designerProfileCtrl.getAllDesingers); //only designers basic for landing page

router.get("/portfolios", designerProfileCtrl.getAllPortfolios); //only portfolios

router.get("/:designer_id", designerProfileCtrl.getDesingerProfile);

//////////////////////////////////////////--auth-needed--///////////////////////////////////////////////////////////////////////////

router.use(authMiddleWare.protect);
router.use(authMiddleWare.authorize("designer"));

router
  .route("/")
  .post(designerProfileCtrl.createMyProfile)
  .get(designerProfileCtrl.getMyProfile)
  .put(designerProfileCtrl.editMyProfile);

router
  .route("/portfolio")
  .post(
    uploadMultipleFiles(["image/png", "image/jpeg"], 1024 * 1024 * 10, 5),
    designerProfileCtrl.addItemToPortfolio
  )
  .get(designerProfileCtrl.getMyPortfolio);

router
  .route("/portfolio/:item_id")
  .delete(designerProfileCtrl.deleteItemFromPortfolio)
  .put(
    uploadMultipleFiles(["image/png", "image/jpeg"], 1024 * 1024 * 10, 5),
    designerProfileCtrl.editItemFromPortfolio
  );

export default router;
