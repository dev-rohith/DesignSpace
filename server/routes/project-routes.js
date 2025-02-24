import { Router } from "express";
import projectCtrl from "../controllers/project-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadSingleFile } from "../middleware/multer-middleware.js";

const router = Router();

router.use(authMiddleWare.protect);


router.get(
  "/:project_id",
  authMiddleWare.authorize("client", "designer"),
  projectCtrl.getProject
);

router.put(
  "/accept/:project_id",
  authMiddleWare.authorize("client"),   //payment here ---------------------------------
  projectCtrl.acceptProject
);

router.put(
  "/review/:project_id",
  authMiddleWare.authorize("client"),
  projectCtrl.clientRating
)

router.get(
  "/client/:status",
  authMiddleWare.authorize("client"),
  projectCtrl.getMyProjectsClient
);

router.use(authMiddleWare.authorize("designer"));

router.post("/", projectCtrl.createProject);
router.get("/designer/:status", projectCtrl.getMyProjectsDesigner);

router
  .route("/:project_id")
  .put(projectCtrl.editProject)
  .delete(projectCtrl.deleteProject);

router.put("/:project_id/sent-review", projectCtrl.sentProjectToReview);

router.put("/progress/:project_id", projectCtrl.updateProjectProgress);

router.put(
  "/before/:project_id",
  uploadSingleFile(["image/png", "image/jpeg"], "image", 1024 * 1024 * 10),
  projectCtrl.addBeforeProjectToPortfolio
);

router.delete(
  "/before/:project_id/item/:Item_id",
  projectCtrl.deleteBeforeProjectToPortifolio
);

router.put(
  "/after/:project_id",
  uploadSingleFile(["image/png", "image/jpeg"], "image", 1024 * 1024 * 10),
  projectCtrl.addAfterProjectToPortfolio
);

router.delete(
  "/after/:project_id/item/:Item_id",
  projectCtrl.deleteAfterProjectToPortifolio
);

router.put("/:project_id/complete", projectCtrl.complete);

export default router;
