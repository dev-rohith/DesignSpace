import { Schema, model } from "mongoose";

const associateProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON format for geospatial queries
        required: true,
      }, 
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    completedTasksCount: {
      type: Number,
      default: 0, // Track completed tasks
    },
    bio: { 
      type: String,
      default: "", // Optional bio or description about the associate
    },
    skills: [
      {
        type: [String],
        default: [], // Skills related to the associate's work
      },
    ],
    availability: {
      type: Boolean,
      default: true, // Whether the associate is available for new tasks
    },
  },
  { timestamps: true }
);

const AssociateProfile = model("AssociateProfile", associateProfileSchema);

export default AssociateProfile;
