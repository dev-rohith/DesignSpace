import { Router } from "express";

import designerProfileCtrl from "../controllers/desinger-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadMultipleFiles } from "../middleware/multer-middleware.js";
import { validateDesingerProfile } from "../validators/designer-profile-validation.js";

const router = Router();

router.get("/all", designerProfileCtrl.getAllDesingers); //only designers basic for landing page

router.get("/portfolios", designerProfileCtrl.getAllPortfolios); //only portfolios

router.get("/profile/:designer_id", designerProfileCtrl.getDesingerProfile);

//////////////////////////////////////////--auth-needed--///////////////////////////////////////////////////////////////////////////

router.use(authMiddleWare.protect);

router.use(authMiddleWare.authorize("designer"));

router
  .route("/profile")
  .post(validateDesingerProfile, designerProfileCtrl.createMyProfile)
  .get(designerProfileCtrl.getMyProfile)
  .put(validateDesingerProfile, designerProfileCtrl.editMyProfile);

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
