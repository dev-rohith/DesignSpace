import { Router } from "express";
import projectCtrl from "../controllers/project-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadSingleFile } from "../middleware/multer-middleware.js";

const router = Router();


router.use(authMiddleWare.protect);

// router.get('/my-pending', authMiddleWare.authorize('client'), projectCtrl.getClientPendingPortifolios)

router.use(authMiddleWare.authorize("designer"));

router.post("/", projectCtrl.createProject);
router.get("/pending", projectCtrl.getMyPendingProjects);

router
  .route("/:project_id")
  .get(projectCtrl.getProject)
  .put(projectCtrl.editProject)
  .delete(projectCtrl.deleteProject);

router.put("/progress/:project_id", projectCtrl.updateProjectProgress);

router.post(
  "/before/:project_id",
  uploadSingleFile(["image/png", "image/jpeg"], "image", 1024 * 1024 * 10),
  projectCtrl.addBeforeProjectToPortfolio
);

router.delete(
    "/before/:project_id/:Item_id",
    projectCtrl.deleteBeforeProjectToPortifolio
);

router.post(
    "/after/:project_id",
    uploadSingleFile(["image/png", "image/jpeg"], "image", 1024 * 1024 * 10),
    projectCtrl.addAfterProjectToPortfolio
);

router.delete(
    "/after/:project_id/:Item_id",
    projectCtrl.deleteAfterProjectToPortifolio
);

router.put('/:project_id/complete', projectCtrl.complete)

export default router;
