import User from "../models/user-model.js";
import { TokenManager } from "../services/redis-service.js";
import APIFeatures from "../utils/api-features.js";
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
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .paginate();
  const finalQuery = features.query
    .select(
      "-lastActive -maxDevices -subscription -devices -otp_chances -languages_known -__v"
    )
    .lean();
  const users = await finalQuery;
  res.json(users);
});

userCtrl.UserStatusController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const deactivatedUser = await User.findByIdAndUpdate(
    id,
    { status },{
      new: true,
      runValidators: true
    }
  ).select("-lastActive -maxDevices -subscription -devices -otp_chances -languages_known -__v")
  if(!deactivatedUser) throw next(new AppError('user not found', 404))
  res
    .status(200)
    .json({ message: "user account status changed successfully", user: deactivatedUser });
});

export default userCtrl;
