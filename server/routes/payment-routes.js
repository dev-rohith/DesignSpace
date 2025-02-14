import { Router } from "express";
import paymentCrl from "../controllers/payment-controller.js";
import authMiddleWare from "../middleware/auth-middleware.js";
import subscriptionCtrl from "../controllers/subscription-controller.js";

const router = Router();

router.get("/get-subcription-prices", subscriptionCtrl.getSubscriptions);

router.use(authMiddleWare.protect);

router.post("/create-subcription", paymentCrl.createPaymentOrder);
router.post("/verify-payment", paymentCrl.verifyPayment);

router.use(authMiddleWare.authorize("admin"));

router.post("/create-subcription-prices", subscriptionCtrl.createSubscription);
router.put("/update-subcription", subscriptionCtrl.updateSubscription);

export default router;
