import { Router } from "express";
import userCtrl from "../controllers/user-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import { uploadAvatar } from "../middleware/multer-middleware.js";

const router = Router();

//--------------------- get me protected for login --------------------//
router.use(authMiddleWare.protect)

router.get("/me", userCtrl.getUser);


//-------------------------- user power ------------------------//

router.put("/update", userCtrl.updateMe);

router.put("/updatePassword", userCtrl.updatePassword); 

router.put(
  "/update-profile-pic",
  uploadAvatar(["image/png", "image/jpeg"]),
  userCtrl.updateProfilePic
);



//-------------------------- designer power ------------------------//
router.get(
  "/clients",
  authMiddleWare.authorize("designer"),
  userCtrl.getClients
);

//-------------------------- admin power ------------------------//  

router.use(authMiddleWare.authorize("admin"));

router.get("/", userCtrl.getUsers);
router.put("/:user_id", userCtrl.UserStatusController);


export default router