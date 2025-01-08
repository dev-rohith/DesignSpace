import { Schema, model } from "mongoose";

// Application status for role upgrades
const applicationSchema = new Schema({
  requestedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  requestId: String,  // Unique identifier for the application it was get by generated mail before application
  status: {
    type: String, 
    enum: ["pending", "approved", "rejected"],
  },
  requestedRole: {
    type: String,
    enum: ["designer", "associate"],
  },
  approvedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  approvalDate: Date,
});
  
const Application = model("Application", applicationSchema);

export default Application;
