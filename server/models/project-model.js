import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  name: String,
  description: String,
  clientId: { type: ObjectId, ref: "User" },
  designerId: { type: ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["draft", "pending", "in_progress", "review", "completed"],
  },
  startDate: Date,
  deadline: Date,
  completedDate: Date,
  budget: Number,
  files: [
    {
      name: String,
      url: String,
      uploadedBy: { type: ObjectId, ref: "User" },
      uploadedAt: Date,
    },
  ],
  milestones: [
    {
      title: String,
      description: String,
      dueDate: Date,
      status: String,
      completedAt: Date,
    },
  ],
});
