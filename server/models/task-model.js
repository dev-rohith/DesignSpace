import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    project: { type: ObjectId, ref: "Project" },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON format
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    associate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Associate", // Assigned associate
    },
    status: {
      type: String,
      enum: ["pending", "assigned", "in-progress", "completed"],
      default: "pending",
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
        images: [
          {
            public_id: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
        ],
        timestamp: Date,
        updatedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);

export default Task;
