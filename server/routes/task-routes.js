import { Router } from "express";
import taskCtrl from "../controllers/task-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadMultipleFiles } from "../middleware/multer-middleware.js";

const router = Router();

router.use(authMiddleWare.protect);


router.post("/",authMiddleWare.authorize("designer"),taskCtrl.createTask);

router.get(
  "/designer/:status",
  authMiddleWare.authorize("designer"),
  taskCtrl.getDesignerTasks
);

router.put("/:task_id",authMiddleWare.authorize("designer"),taskCtrl.updateTask);

router
  .route("/:task_id/assign/:associate_id")
  .put(authMiddleWare.authorize("designer"),taskCtrl.assignAssociateToTheTask);

router.getMyTaskDesinger = router.get(
  "/designer/mytask/:task_id",
  authMiddleWare.authorize("designer"),
  taskCtrl.getMyTaskDesinger
);

router.use(authMiddleWare.authorize("associate"));


router.get("/live", taskCtrl.getAllLiveTasks);

router.get(
  "/associate/:status",
  taskCtrl.getAssociateTasks
);

router.get(
  "/associate/details/:task_id",
  taskCtrl.getTaskDettails
)


router.put(
  "/accept/:task_id",
  taskCtrl.acceptByAssociate
);

router.get(
  "/associate/mytask/:task_id",
  taskCtrl.getMyTaskAssociate
);

router.delete(
  "/:task_id/delete/:delete_id",
  taskCtrl.deleteProgressItem
);

router.post(
  "/progress/:task_id",
  uploadMultipleFiles(["image/png", "image/jpeg"], 1024 * 1024 * 10, 10),
  taskCtrl.updateTaskProgress
);



export default router;
