import { Router } from "express";
import passport from "passport";

import authController from "../controllers/auth-controller.js";
import userCtrl from "../controllers/user-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";

const router = Router()

//authentication stuff here
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


//refresh token rotation 

router.get('/refreshToken', authMiddleWare.refreshToken_rotation)

//user controller stuff here

router.get('/me',authMiddleWare.protect , userCtrl.getUser)

export default router