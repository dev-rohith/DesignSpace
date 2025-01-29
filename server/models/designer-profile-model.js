import { Schema, model } from "mongoose";

// professionalProfile.model.js
const designerProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  // Basic professional info
  company: String,
  position: String,
  experience: Number,
  aboutMe: String,
  specializations: [String],
  designStyle: [String],
  softwareExpertise: [String],

  // Portfolio
  portfolio: [
    {
      title: String,
      description: String,
      images: [                    //upload file -- images
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          }
        },
      ],
      category: String,
      tags: [String],
      date: { type: Date, default: Date.now },
    },
  ],

  // Ratings and Reviews
  ratings: [
    {
      givenBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
      date: { type: Date, default: Date.now },
    },
  ],
     //average rating is calculated on frontend

  // Contact information
  address: {
    street: {
      type: String,
      required: true
    },
    house_number: {
      type: String,
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postal_code: String,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

// Add geospatial index for location
designerProfileSchema.index({ location: "2dsphere" });

const DesignerProfile = model("DesignerProfile", designerProfileSchema);

export default DesignerProfile;
