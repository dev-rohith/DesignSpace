import { Router } from "express";
import passport from "passport";

import authController from "../controllers/auth-controller.js";

const router = Router()


     //Google authentication logic here
router.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email']})
)

router.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    async (req,res) => {
         //on google authentication successfull
         const deviceId = uuid4()
    }
)


    //auth router
router.post('/signup', authController.signup);

router.post('/login', authController.login);


router.post('/forgetPassword', authController.forgotPassword)
router.put('/resetPassword/:token', authController.resetPassword);


export default router