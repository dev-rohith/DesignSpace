import { Schema } from "mongoose";

const taskSchema = new Schema({
  _id: ObjectId,
  projectId: { type: ObjectId, ref: "Project" },
  title: String,
  description: String,
  assignedTo: { type: ObjectId, ref: "User" },
  assignedBy: { type: ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "blocked"],
  },
  priority: { type: String, enum: ["low", "medium", "high", "urgent"] },
  startDate: Date,
  dueDate: Date,
  completedAt: Date,
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  workUpdates: [
    {
      description: String,
      images: [String],
      timestamp: Date,
      updatedBy: { type: ObjectId, ref: "User" },
    },
  ],
});
