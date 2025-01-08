import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    project: { type: ObjectId, ref: "Project" },
    title: String,
    description: String,
    createdBy: { type: ObjectId, ref: "User" },
    acceptedBy: { type: ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "blocked"],
    },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"] },
    startDate: Date,
    dueDate: Date,
    isVisibleToClient: Boolean, 
    completedAt: Date,
    updateLocations: [
      {
        co_ordinates: { Number },
      },
    ],
    workUpdates: [
      {
        description: String,
        images: [String],
        timestamp: Date,
        updatedBy: { type: ObjectId, ref: "User" },
      },
    ],
  });


  const Task = model("Task", taskSchema);

  export default Task;