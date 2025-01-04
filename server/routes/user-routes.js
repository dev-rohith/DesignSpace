import { Router } from "express";

const router = Router()

router.post('/signup', authController.signup)


export default router