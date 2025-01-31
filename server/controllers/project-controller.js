import Project from "../models/project-model.js";
import { getCoordinates } from "../services/georeverse-coding.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

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


projectCtrl.updateProjectProgress = catchAsync(async (req,res,next) => {
     
})

export default projectCtrl;
