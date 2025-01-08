import { Schema,model } from "mongoose";

const projectSchema = new Schema({
  name: String,
  description: String,
  clientId: { type: ObjectId, ref: "User" },
  designerId: { type: ObjectId, ref: "User" },
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  status: {
    type: String,
    enum: ["draft", "pending", "in_progress", "review", "completed"], 
  },
  minimumDays: {
    type: Number,
    select: false
  },
  startDate: Date,
  deadline: Date,
  completedDate: Date,
  budget: Number,
  isPaid: {
    type: Boolean,
    default: false,
  },
  files: [
    {
      name: String,
      url: String,
      uploadedBy: { type: ObjectId, ref: "User" },
      uploadedAt: Date,
    },
  ],
  beforePricture: String,
  afterPicture: String,
  milestones: [
    {
      title: String,
      description: String,
      status: String,
      completedAt: Date, //milestone reached at
    },
  ],
});


const Project = model("Project", projectSchema);

export default Project;