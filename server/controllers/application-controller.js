import Application from "../models/application-model.js";
import User from "../models/user-model.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

const applicationCtrl = {};

applicationCtrl.createApplication = catchAsync(async (req, res, next) => {
  const { requestId, requestedRole } = req.body;
  console.log(req.user);
  const application = await Application.create({
    requestedBy: req.user.userId,
    requestId,
    requestedRole,
  });
  res.json({ message: "Application sent successfully", application }); //here the email functionality will be added
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
    application.approvedBy = req.user.userId;
    application.approvalDate = new Date();
    console.log(requesetedUser)
    console.log(application)
    requesetedUser.role = application.requestedRole;
  } else if (status === "rejected") {
    application.rejectedBy = req.user.userId;
    application.rejectionDate = new Date();
  }

  await requesetedUser.save();

  await application.save();

  res.json({ message: "Application updated successfully", application });
});

export default applicationCtrl;
