import { Router } from "express";
import applicationCtrl from "../controllers/application-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";

const router = Router();

router.use(authMiddleWare.protect);

router.post("/",authMiddleWare.authorize('client'), applicationCtrl.createApplication);

router.use(authMiddleWare.authorize("admin"));

router.get("/", applicationCtrl.getApplications);

router.put("/:id", applicationCtrl.updateApplication);


export default router;
