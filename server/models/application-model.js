import { Schema, model } from "mongoose";

// Application status for role upgrades
const applicationSchema = new Schema({
  requestedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String, //file upload  -- pdf
      required: true,
    },
  },
  description: String,
  introduction_video: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String, //file upload -- video
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  requestedRole: {
    type: String,
    enum: ["designer", "associate"],
  },
  requestedDate: {
    type: Date,
  },
  actionMadeBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  actionPerformedOn: {
    type: Date,
  },
});

const Application = model("Application", applicationSchema);

export default Application;
