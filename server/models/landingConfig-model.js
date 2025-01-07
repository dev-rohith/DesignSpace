import { Schema, model } from "mongoose";

const ladingConfig = new Schema({
  carosal: [
    {
      type: String,
    },
  ],
  designers: [
    {
      type: Schema.types.ObjectId,
      ref: "User",
    },
  ],
  customer_reviews: [
    {
      type: Schema.types.ObjectId,
      ref: "project",
    },
  ],
});


const LandingConfig = model("LandingConfig", ladingConfig);


export default LandingConfig;