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
  license: String,
  specializations: [String],
  designStyle: [String],
  softwareExpertise: [String],

  // Portfolio
  portfolio: [
    {
      title: String,
      description: String,
      images: [String],
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
  averageRating: {
    type: Number,
    default: 0,
  },

  // Projects
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],

  // Contact information
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip_code: String,
  },
});

const DesignerProfile = model("DesignerProfile", designerProfileSchema);

export default DesignerProfile;
