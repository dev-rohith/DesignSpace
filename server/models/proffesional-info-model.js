import {model, Schema } from "mongoose";

const proffesionalInfo = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    company: String,
    position: String,
    licence: String,
    experience: Number,
    specialization: [String],
    aboutMe: String,
    portifolio: [
      {
        title: String,
        description: String,
        images: [String],
        date: Date,
      },
    ],
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
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    projects: [
      //populating only limited fields in the profile page loaded
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip_code: String,
    }, 
  });


const ProffesionalInfo = model("ProffesionalInfo", proffesionalInfo);

export default ProffesionalInfo;