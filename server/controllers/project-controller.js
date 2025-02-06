import Project from "../models/project-model.js";
import CloudinaryService from "../services/cloudinary-service.js";
import { getCoordinates } from "../services/georeverse-coding.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

import fs from "fs";

const projectCtrl = {};


projectCtrl.createProject = catchAsync(async (req, res, next) => {
  const { title, description, clientId, address, minimumDays, budget } =
    req.body;

  const { lat, lng } = await getCoordinates(address);

  const project = await Project.create({
    title,
    description,
    clientId,
    address,
    minimumDays,
    budget,
    location: { lat, lng },
    designerId: req.user.userId,
  });

  res.json({ message: "project created successfully", data: project }); // only creating is enough
});

projectCtrl.getProject = catchAsync(async (req, res, next) => {
  const { project_id } = req.params;
  const project = await Project.findById(project_id);
  if (!project) return next(new AppError("project not found", 404));
  res.json({ data: project });
});

projectCtrl.editProject = catchAsync(async (req, res, next) => {
  const { project_id } = req.params;
  const project = await Project.findById(project_id);
  if (!project) return next(new AppError("Project not found", 404));
  if (project.status !== "pending") {
    return next(
      new AppError(
        "Project is in progress; only progress updates are allowed",
        400
      )
    );
  }

  const { title, description, budget, address, minimumDays } = req.body;
  const { lat, lng } = await getCoordinates(address);

  Object.assign(project, {
    title,
    description,
    budget,
    address,
    minimumDays,
    location: { lat, lng },
  });
  const updatedProject = await project.save();

  res.json({
    message: "Project updated successfully",
    project: updatedProject,
  });
});

projectCtrl.deleteProject = catchAsync(async (req, res, next) => {
  const { project_id } = req.params;
  const project = await Project.findById(project_id);
  if (!project) return next(new AppError("Project not found", 404));
  if (project.status !== "pending") {
    return next(
      new AppError(
        "Project is in progress; only progress updates are allowed",
        400
      )
    );
  }

  await Project.findByIdAndDelete(project_id);

  res.json({ message: "Project deleted successfully" });
});

projectCtrl.getMyPendingProjects = catchAsync(async (req, res, next) => {
  const myPendingProjects = await Project.find({
    designerId: req.user.userId,
    status: "pending",
  })
    .populate("clientId", "firsName lastName profilePicture")
    .select("title description budget")
    .lean();
  res.json({ data: myPendingProjects });
});

projectCtrl.updateProjectProgress = catchAsync(async (req, res, next) => {
  const { project_id } = req.params;
  const project = await Project.findById(project_id);
  if (!project) return next(new AppError("Project not found", 404));
  if (project.status !== "in_progress") {
    return next(
      new AppError(
        "your project not in progress state; you can't update progress",
        400
      )
    );
  }

  const { milestones, completion_percentage } = req.body;

  Object.assign(project, { milestones, completion_percentage });

  project.save();

  res.json({ message: "progress updated successfully", data: project });
});

projectCtrl.addBeforeProjectToPortfolio = catchAsync(async (req, res, next) => {
  const { project_id } = req.params;
  const project = await Project.findById(project_id);

  if (!project) return next(new AppError("Project not found", 400));
  if (project.status !== "review")
    return next(new AppError("You can only upload in review state", 400));
  if (!req.file)
    return next(new AppError("Upload an image to add to portfolio", 400));

  const uploadResult = await CloudinaryService.uploadFile(req.file);

  try {
    await fs.promises.unlink(req.file.path); // Use req.file.path
  } catch (unlinkError) {
    console.error("Error while deleting the file:", unlinkError.message);
  }

  project.beforePrictures.push({
    url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  });

  await project.save();

  res.json({ message: "Uploaded successfully", project });
});

projectCtrl.deleteBeforeProjectToPortifolio = catchAsync(
  async (req, res, next) => {
    const { project_id, Item_id } = req.params;
    const project = await Project.findById(project_id);

    if (!project) return next(new AppError("project is not found", 404));

    const removedItem = project.beforePrictures.find(
      (item) => `${item._id}` === Item_id
    );

    project.beforePrictures = project.beforePrictures.filter(
      (item) => `${item._id}` !== Item_id
    );
    await CloudinaryService.deleteFile(removedItem.public_id, "image");
    await project.save();
    res.json({ message: "item is successfully removed from before list" });
  }
);

projectCtrl.addAfterProjectToPortfolio = catchAsync(async (req, res, next) => {
  const { project_id } = req.params;
  const project = await Project.findById(project_id);

  if (!project) return next(new AppError("Project not found", 400));
  if (project.status !== "review")
    return next(new AppError("You can only upload in review state", 400));
  if (!req.file)
    return next(new AppError("Upload an image to add to portfolio", 400));

  const uploadResult = await CloudinaryService.uploadFile(req.file);

  try {
    await fs.promises.unlink(req.file.path); // Use req.file.path
  } catch (unlinkError) {
    console.error("Error while deleting the file:", unlinkError.message);
  }

  project.afterPictures.push({
    url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
  });

  await project.save();

  res.json({ message: "Uploaded successfully", project });
});

projectCtrl.deleteAfterProjectToPortifolio = catchAsync(
  async (req, res, next) => {
    const { project_id, Item_id } = req.params;
    const project = await Project.findById(project_id);

    if (!project) return next(new AppError("project is not found", 404));

    const removedItem = project.afterPictures.find(
      (item) => `${item._id}` === Item_id
    );

    project.afterPictures = project.afterPictures.filter(
      (item) => `${item._id}` !== Item_id
    );
    await CloudinaryService.deleteFile(removedItem.public_id, "image");
    await project.save();
    res.json({ message: "item is successfully removed from after list" });
  }
);

projectCtrl.complete = catchAsync(async (req, res, next) => {
  const { project_id } = req.params;

  const project = await Project.findById(project_id);

  if (!project) return next(new AppError("project is not found", 404));
  if (project.status !== "review")
    return next(new AppError("You can only upload in review state", 400));
  if (
    project.beforePrictures.length === 0 &&
    project.afterPictures.length === 0
  )
    next(
      new AppError(
        "Add atleast one image on before and after project to complete",
        400
      )
    );

  project.status = "completed";
  project.save();
  res.json({ message: "project is successfully completed" });
});



export default projectCtrl;
