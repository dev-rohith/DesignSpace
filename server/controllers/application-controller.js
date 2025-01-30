import fs from "fs";

import Application from "../models/application-model.js";
import User from "../models/user-model.js";
import CloudinaryService from "../services/cloudinary-service.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";
import APIFeatures from "../utils/api-features.js";

const applicationCtrl = {};

applicationCtrl.createApplication = async (req, res, next) => {
  const { description, requestedRole } = req.body;

  if (!req.files) return next(new AppError("Files are required", 400));

  const fileUploadPromises = req.files.map((file) => {
    return CloudinaryService.uploadFile(file); // Upload file to Cloudinary
  });
  try {
    const uploadResults = await Promise.all(fileUploadPromises);

    const introduction_video = {};
    const resume = {};

    uploadResults.forEach((upload) => {
      if (upload.format === "pdf") {
        resume.url = upload.secure_url;
        resume.public_id = upload.public_id;
      } else if (upload.format === "mp4") {
        introduction_video.url = upload.secure_url;
        introduction_video.public_id = upload.public_id;
      }
    });
    if (
      Object.keys(introduction_video).length === 0 ||
      Object.keys(resume) === 0
    ) {
      throw new Error("error while uploading to cloudinary");
    }

    await Application.create({
      requestedBy: req.user.userId,
      resume,
      introduction_video,
      description,
      requestedRole,
      requestedDate: Date.now(),
    });

    try {
      await Promise.all(req.files.map((file) => fs.promises.unlink(file.path)));
    } catch (unlinkError) {
      console.error("Error while deleting the file:", unlinkError.message);
    }
  } catch (error) {
    try {
      await Promise.all(req.files.map((file) => fs.promises.unlink(file.path)));
    } catch (unlinkError) {
      console.error("Error while deleting the file:", unlinkError.message);
    }
    return res.json({ message: error.message, error: error });
  }
  res.json({ message: "Application sent successfully" });
};

applicationCtrl.getPendingApplications = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Application.find({ status: "pending" }),
    req.query
  )
    .sort()
    .paginate();

  const finalQuery = features.query
    .populate("requestedBy", "firstName lastName profilePicture status")
    .lean();
  const applications = await finalQuery;
  res.json({ applications });
});

applicationCtrl.getExistingApplication = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Application.find({ $or: [{ status: "approved" }, { status: "rejected" }] }),
    req.query
  )
    .filter()
    .sort()
    .paginate();

  const finalQuery = features.query
    .populate("requestedBy", "firstName lastName profilePicture status")
    .select("-resume -description -introduction_video -isApproved -__v")
    .lean();
  const applications = await finalQuery;
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
    application.actionPerformedOn = Date.now();
    requesetedUser.role = application.requestedRole;
  } else if (status === "rejected") {
    application.actionMadeBy = req.user.userId;
    application.actionPerformedOn = Date.now();
  }

  await requesetedUser.save();

  await application.save();

  res.json({ message: "Application updated successfully", application });
});

applicationCtrl.deleteApplication = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  const deletedApplication = await Application.findByIdAndDelete(id);

  try {
    if (
      deletedApplication.resume.public_id &&
      deletedApplication.introduction_video.public_id
    ) {
      await Promise.allSettled([
        CloudinaryService.deleteFile(
          deletedApplication.introduction_video.public_id,
          "video"
        ),
        CloudinaryService.deleteFile(deletedApplication.resume.public_id),
      ]);
    } else {
      console.log("No valid public IDs found to delete.");
    }
  } catch (error) {
    console.log("Error deleting files from Cloudinary:", error.message);
  }

  res.json({
    message: "application deleted successfully",
    data: deletedApplication,
  });
});

export default applicationCtrl;
