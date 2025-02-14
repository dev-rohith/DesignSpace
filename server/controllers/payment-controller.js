import razorpayInstance from "../config/razorpay-config.js";
import User from "../models/user-model.js";
import AppError from "../utils/app-error-util.js";
import crypto from "crypto";
import catchAsync from "../utils/catch-async-util.js";
import Subscription from "../models/subscription-modal.js";

const paymentCrl = {};

paymentCrl.createPaymentOrder = catchAsync(async (req, res, next) => {
  const { plan } = req.body;

  const user = await User.findById(req.user.userId).select("subscription");
  if (user.subscription.active) {
    return next(
      new AppError(
        "You have already subscribed to a plan wait until it expires",
        400
      )
    );
  }

  const subcription = await Subscription.findOne({}).lean();
  let amount;
  if (plan === "Monthly") {
    amount = subcription.discounted_monthly_price * 100;
  } else if (plan === "Yearly") {
    amount = subcription.discounted_yearly_price * 100;
  }

  const options = {
    amount,
    currency: "INR",
    receipt: "receipt_order_1",
  };

  razorpayInstance.orders.create(options, (err, order) => {
    if (err) {
      console.log(err);
      return next(new AppError("Something went wrong", 500));
    }
    res.status(200).json({ order, key: process.env.RAZORPAY_KEY_ID });
  });
});

paymentCrl.verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  //creating hmac crypto object

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    //db verification
    console.log(req.body);

    return res.status(200).json({
      message: "Payment verified",
    });
  } else {
    return res.status(400).json({
      message: "Payment not verified",
    });
  }
};

export default paymentCrl;
