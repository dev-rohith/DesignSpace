import axios from "axios";
import Task from "../models/task-model.js";
import User from "../models/user-model.js";
import CloudinaryService from "../services/cloudinary-service.js";
import { getCoordinates } from "../services/georeverse-coding.js";
import { getIpInfo } from "../services/getIpInfo-service.js";
import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

const taskCtrl = {};

taskCtrl.createTask = catchAsync(async (req, res, next) => {
  const {
    project_id,
    name,
    description,
    priority,
    startDate,
    dueDate,
    isVisibleToClient,
    address,
  } = req.body;

  const taskData = {
    project_id,
    name,
    description,
    priority,
    designer: req.user.userId,
    startDate: new Date(startDate),
    dueDate: new Date(dueDate),
    isVisibleToClient,
    address,
  };

  const { lat, lng } = await getCoordinates(address);

  if (!lat || !lng)
    return next(new AppError("please provide valid address", 400));
  taskData.location = { coordinates: [lat, lng] };

  const task = await Task.create(taskData);
  if (!task) return next(new AppError("Error while creating the task", 400));

  res.json(task);
});

taskCtrl.updateTask = catchAsync(async (req, res, next) => {
  const { task_id } = req.params;

  const {
    project_id,
    name,
    description,
    priority,
    startDate,
    dueDate,
    isVisibleToClient,
    address,
  } = req.body;

  const taskData = {
    project_id,
    name,
    description,
    priority,
    startDate,
    dueDate,
    isVisibleToClient,
    address,
    status: "in_progress",
  };

  const { lat, lng } = await getCoordinates(address);

  if (!lat || !lng)
    return next(new AppError("please provide valid address", 400));
  taskData.location = { coordinates: [lat, lng] };

  const task = await Task.findOneAndUpdate(
    { _id: task_id, status: "pending" },
    taskData,
    {
      new: true,
    }
  ).lean();

  if (!task)
    return next(
      new AppError(
        "Error while updating the task or task is not in pending stage anymore",
        400
      )
    );

  res.json(task);
});

taskCtrl.assignAssociateToTheTask = catchAsync(async (req, res, next) => {
  const { task_id, associate_id } = req.params;
  const associate = await User.findOne({
    _id: associate_id,
    role: "associate",
  }).lean();
  if (!associate)
    return next(
      new AppError("associate is not found or not an associate", 404)
    );

  const updatedProject = await Task.findByIdAndUpdate(
    task_id,
    { associate: associate_id, status: "in_progress" },
    { new: true }
  ).lean();
  if (!updatedProject)
    return next(new AppError("Error while updating the project", 400));
  // mail need to send to the associate email saying that project is assingned with prject info ------------------------------------------------
  res.json({
    message: "Associate assigned to task successfully",
    data: updatedProject,
  });
});

taskCtrl.getMyPendingTasks = catchAsync(async (req, res, next) => {
  const myPendingTasks = await Task.find({
    designer: req.user.userId,
    status: "pending",
  });
  res.json(myPendingTasks);
});

////////////////////---associate-actions------/////////////////////////////////////////////////////////

taskCtrl.getMyTask = catchAsync(async (req, res, next) => {
  const { task_id } = req.params;
  const task = await Task.findOne({ associate: req.user.userId, _id: task_id })
    .populate("designer", "firstName lastName profilePicture")
    .populate("project")
    .lean();
  res.json(task);
});

taskCtrl.acceptByAssociate = catchAsync(async (req, res, next) => {
  const { task_id } = req.params;
  const updatedProject = await Task.findByIdAndUpdate(
    task_id,
    { associate: req.user.userId, status: "in_progress" },
    { new: true }
  ).lean();
  if (!updatedProject)
    return next(new AppError("Error while updating the project", 400));
  res.json({
    message: "You assigned to task successfully",
    data: updatedProject,
  });
});

taskCtrl.getAllPendingTasks = catchAsync(async (req, res, next) => {
  const myPendingTasks = await Task.find({
    status: "pending",
  });
  res.json(myPendingTasks);
});

//////////////////////////////-----update the progress-----////////////////////////////////////////////

taskCtrl.getMyProgressTasks = catchAsync(async (req, res, next) => {
  const MyProgressTasks = await Task.find({ status: "in_progress" });
  res.json(MyProgressTasks);
});

taskCtrl.updateTaskProgress = catchAsync(async (req, res, next) => {
  if (!req.files) return next(new AppError("Files are required", 400));

  const { task_id } = req.params;
  const ip = "206.253.208.100";
  const { description } = req.body;

  const task = await Task.findOne({ _id: task_id, status: "in_progress" });
  if (!task) return next(new AppError("task not found", 404));

  const workUpdate = { description, images: [] };

  try {
    const { latitude: lat, longitude: lng } = await getIpInfo(ip);
    workUpdate.updateLocation = { lat, lng };
  } catch (error) {
    return next(
      new AppError(
        "unable to fetch the ip address please try again with following right guidlines",
        400
      )
    );
  }

  const fileUploadPromises = req.files.map((file) => {
    return CloudinaryService.uploadFile(file);
  });

  const uploadResults = await Promise.all(fileUploadPromises);

  uploadResults.forEach((upload) => {
    workUpdate.images.push({
      url: upload.secure_url,
      public_id: upload.public_id,
    });
  });

  if (workUpdate.images.length === 0) {
    return next(new AppError("upload atleast one image to add into progress"));
  }

  task.workUpdates.push(workUpdate);

  await task.save();

  res.status(200).json({
    status: "success",
    data: task,
  });
});

taskCtrl.deleteProgressItem = catchAsync(async (req, res, next) => {
  const { task_id, delete_id } = req.params;
  const task = await Task.findOne({
    _id: task_id,
    associate: req.user.userId,
    status: "in_progress",
  });
  if (!task)
    return next(new AppError("task was not found to delete prgress Item", 400));

  if (task.workUpdates.length === 0)
    return next(new AppError("there is no work updates to delete", 400));
  const deleteItem = task.workUpdates.find(
    (item) => `${item._id}` === delete_id
  );
  task.workUpdates = task.workUpdates.filter(
    (workItem) => `${workItem._id}` !== delete_id
  );
  task.save();
  const deletedItemImagesPromises = deleteItem.images.map((image) => {
    return CloudinaryService.deleteFile(image.public_id, "image");
  });

  const removeItemsFromCloudinary = await Promise.all(
    deletedItemImagesPromises
  );

  res.json({
    message: "item deleted successfully",
    data: deleteItem,
  });
});

export default taskCtrl;
