import { Router } from "express";
import applicationController from "../controllers/application-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";

const router = Router();

router.post("/applications", applicationController.createApplication);

router.use(authMiddleWare.authorize("admin"));

router.get("/applications", applicationController.getApplications);

router.put("/applications/:id", applicationController.updateApplication);


export default router;
