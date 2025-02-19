import { Schema, model } from "mongoose";

const associateProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    location: {
      type: {
        type: String,
        enum: ["Point"], // GeoJSON format for geospatial queries
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    recent_completed_tasks: {
      type: Schema.Types.ObjectId,
      unique: true,
    },
    completedTasksCount: {
      type: Number,
      default: 0, // Track completed tasks
    },
    bio: {
      type: String,
      default: "", // Optional bio or description about the associate
    },
    skills: {
      type: [String],
      default: [], // Skills related to the associate's work
    },

    availability: {
      type: Boolean,
      default: true, // Whether the associate is available for new tasks
    },
  },
  { timestamps: true }
);

associateProfileSchema.index({ location: "2dsphere" });

const AssociateProfile = model("AssociateProfile", associateProfileSchema);

// AssociateProfile.createIndexes({ location: "2dsphere" });

export default AssociateProfile;

// db.associates.find({
//   location: {
//     $near: {
//       $geometry: { type: "Point", coordinates: [77.5946, 12.9716] }, // Example coordinates (Bangalore)
//       $maxDistance: 10000 // 10 km radius
//     }
//   }
// });
