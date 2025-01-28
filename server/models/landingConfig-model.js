import { Schema, model } from "mongoose";

const ladingConfig = new Schema({
  carosal: [
    {
      image: String,      //file upload -- image
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
      name: String,
      video: String,        //file upload -- video
      review: String
    },
  ],
});


const LandingConfig = model("LandingConfig", ladingConfig);


export default LandingConfig;