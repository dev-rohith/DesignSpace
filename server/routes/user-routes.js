import { Router } from "express";

import authController from "../controllers/auth-controller.js";

const router = Router()


router.post('/signup', authController.signup);

router.post('/login', authController.login);


router.post('/forgetPassword', authController.forgotPassword)
router.put('/resetPassword/:token', authController.resetPassword);


export default router