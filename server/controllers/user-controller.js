import User from "../models/user-model.js";
import { TokenManager } from "../services/redis-service.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

const userCtrl = {};

userCtrl.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user?.userId });
  res.json({ user });
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

userCtrl.updateMe = catchAsync(async (req, res, next) => {
  const inputData = req.body;
  // if(req.file)
});

userCtrl.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('firstName lastName role ')
  res.json(users);
});

userCtrl.deactivateUser = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;
  const deactivatedUser = await User.findByIdAndUpdate(
    user_id,
    { status: "suspended" },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "user deactivated successfully", user: deactivatedUser });
});

export default userCtrl;
