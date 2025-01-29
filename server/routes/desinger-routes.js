import { Router } from "express";

import DesignerProfile from "../models/designer-profile-model.js";
import designerProfileCtrl from "../controllers/desinger-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";

const router = Router()

router.get('/', designerProfileCtrl.get)
router.post('/', designerProfileCtrl.createProfile)


export default router