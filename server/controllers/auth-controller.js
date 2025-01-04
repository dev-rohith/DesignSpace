import User from "../models/user-model.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";



const authController = {};



authController.signup = catchAsync(async (req, res, next) => {
  
});

authController.login = catchAsync(async (req, res, next) => {

});

authController.forgotPassword = catchAsync(async (req, res, next) => {
      // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

           //email logic here
       
    // await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined; 
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    )}
});

authController.resetPassword = catchAsync(async (req, res, next) => {
     // 1) Get user based on the token
  const hashedToken = crypto
  .createHash('sha256')
  .update(req.params.token)
  .digest('hex');

const user = await User.findOne({
  passwordResetToken: hashedToken,
  passwordResetExpires: { $gt: Date.now() }
});

// 2) If token has not expired, and there is user, set the new password
if (!user) {
  return next(new AppError('Token is invalid or has expired', 400));
}
user.password = req.body.password;
user.passwordConfirm = req.body.passwordConfirm;
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;
await user.save();

// 3) Update changedPasswordAt property for the user
// 4) Log the user in, send JWT
createSendToken(user, 200, req, res);
});



authController.protect = catchAsync(async (req, res, next) => {});



authController.authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
             return next(
                new AppError('You dont have permission to perform this action',403)
             )
        }
    }
}




export default authController;
