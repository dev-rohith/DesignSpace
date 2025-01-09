import Application from "../models/application-model.js";
import catchAsync from "../utils/catch-async-util.js";

const applicationController = {};

applicationController.createApplication = catchAsync(async (req, res, next) => {
  const { requestedBy, requestId, requestedRole, approvedBy } = req.body;
  const application = await Application.create({
    requestedBy: req.user._id,
    requestId,
    requestedRole,
  });
  res.json({ message: "Application sent successfully", application });
});

applicationController.getApplications = catchAsync(async (req, res, next) => {
  const applications = await Application.find();
  res.json({ applications });
});

applicationController.updateApplication = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = await Application.findById(id);
  if (!application) return next(new AppError("Application not found", 404));

  application.status = status;

  const requesetedUser = await User.findById(application.requestedBy);

  if (status === "approved") {
    application.approvedBy = req.user._id;
    application.approvalDate = new Date();
    requesetedUser.role = application.requestedRole;
    await requesetedUser.save();
  } else if (status === "rejected") {
    application.rejectedBy = req.user._id;
    application.rejectionDate = new Date();
  }

  await application.save();

  res.json({ message: "Application updated successfully", application });
});

export default applicationController;
