import User from "../models/user-model.js";
import { TokenManager } from "../services/redis-service.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

const userCtrl = {};

userCtrl.getUser = catchAsync(async (req, res, next) => {
  console.log(req.user);
  console.log("testing");
  res.json("hello world");
  // const user = User.find(req?.user.id)
});



userCtrl.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user?.userId }).select(
    "+password"
  );

  if (
    !user ||
    !(await user.correctPassword(req.body.currentPassword, user.password))
  ) {
    return next(new AppError("Incorrect password", 401));
  }

  user.password = req.body.newPassword;

  user.devices.forEach(async (device) => {
    await TokenManager.removeRefreshToken(user._id, device.deviceId);
  });

  await user.save();

  res.json({ message: "Password updated successfully" });
});

export default userCtrl;
