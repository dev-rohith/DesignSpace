import Subscription from "../models/subscription-modal.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

const subscriptionCtrl = {};

subscriptionCtrl.getSubscriptions = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findOne({}).lean();
  if (!subscription) {
    return next(new AppError("Subscription not found", 404));
  }
  res.json({ subscription });
});

subscriptionCtrl.createSubscription = catchAsync(async (req, res, next) => {
  const {
    monthly_price,
    discounted_monthly_price,
    yearly_price,
    discounted_yearly_price,
  } = req.body;

  const alreadyExist = await Subscription.findOne({});
  if (alreadyExist)
    return next(new AppError("Subscription already exist", 400));

  const subscription = await Subscription.create({
    monthly_price,
    discounted_monthly_price,
    yearly_price,
    discounted_yearly_price,
  });
  res.json({ subscription });
});

subscriptionCtrl.updateSubscription = catchAsync(async (req, res, next) => {
  const {
    monthly_price,
    discounted_monthly_price,
    yearly_price,
    discounted_yearly_price,
  } = req.body;
  const subscription = await Subscription.findOneAndUpdate(
    {},
    {
      monthly_price,
      discounted_monthly_price,
      yearly_price,
      discounted_yearly_price,
    },
    { new: true }
  );
  res.json({ subscription });
});

export default subscriptionCtrl;
