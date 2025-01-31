import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  name: String,
  description: String,
  clientId: { type: Schema.Types.ObjectId, ref: "User" },
  designerId: { type: Schema.Types.ObjectId, ref: "User" },
  address: {
    street: {
      type: String,
      required: true,
    },
    house_number: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    postal_code: String,
  },
  location: { lat: Number, lng: Number },
  status: {
    type: String,
    enum: ["pending", "in_progress", "review", "completed"],
    default: "pending",
  },
  minimumDays: Number,
  completedDate: Date,
  budget: Number,
  isPaid: {
    type: Boolean,
    default: false,
  },
  completion_percentage: Number,
  beforePrictures: [
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
  afterPictures: [
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
  milestones: [String],
});

const Project = model("Project", projectSchema);

export default Project;
