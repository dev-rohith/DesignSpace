import Application from "../models/application-model.js";
import User from "../models/user-model.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

const applicationCtrl = {};

applicationCtrl.createApplication = catchAsync(async (req, res, next) => {
  const {resume, introduction_video, description,  requestedRole } = req.body;
   if(!req.files) return next(new AppError('files are required', 400))
  req.files
  const application = await Application.create({
    requestedBy: req.user.userId,
    //more stuff will goes here
    requestedRole,
  });
  res.json({ message: "Application sent successfully", application ,data: req.files}); //here the email functionality will be added
});

applicationCtrl.getApplications = catchAsync(async (req, res, next) => {
  const applications = await Application.find();
  res.json({ applications });
});

applicationCtrl.updateApplication = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = await Application.findById(id);
  if (!application) return next(new AppError("Application not found", 404));

  application.status = status;

  const requesetedUser = await User.findById(application.requestedBy);

  if (status === "approved") {
    application.actionMadeBy = req.user.userId;
    application.isApproved = true;
    requesetedUser.role = application.requestedRole;
  } else if (status === "rejected") {
    application.actionMadeBy = req.user.userId;
  }

  await requesetedUser.save();

  await application.save();

  res.json({ message: "Application updated successfully", application });
});

export default applicationCtrl;
