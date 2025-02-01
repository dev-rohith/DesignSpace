import { Router } from "express";
import taskCtrl from "../controllers/task-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadMultipleFiles } from "../middleware/multer-middleware.js";

const router = Router();

router.use(authMiddleWare.protect);

//associate-actions //////////////////////////////////////////

router.put(
  "/accept/:task_id",
  authMiddleWare.authorize("associate"),
  taskCtrl.acceptByAssociate
);
router.get(
  "/pending",
  authMiddleWare.authorize("associate"),
  taskCtrl.getAllPendingTasks
);
router.get(
  "/progress",
  authMiddleWare.authorize("associate"),
  taskCtrl.getMyProgressTasks
);

router.get(
  "/mytask/:task_id",
  authMiddleWare.authorize("associate"),
  taskCtrl.getMyTask
);

router.delete(
  "/:task_id/delete/:delete_id",
  authMiddleWare.authorize("associate"),
  taskCtrl.deleteProgressItem
);

router.post(
  "/progress/:task_id",
  uploadMultipleFiles(["image/png", "image/jpeg"], 1024 * 1024 * 10, 10),
  authMiddleWare.authorize("associate"),
  taskCtrl.updateTaskProgress
);

router.use(authMiddleWare.authorize("designer")); //////////////////////////////designer-actions///////////////////////////////

router.post("/",taskCtrl.createTask);
router.route("/pending/mine").get(taskCtrl.getMyPendingTasks);

router.put("/:task_id",taskCtrl.updateTask);
router
  .route("/:task_id/assign/:associate_id")
  .put(taskCtrl.assignAssociateToTheTask);

export default router;
