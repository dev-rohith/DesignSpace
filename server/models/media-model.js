import { Schema, model } from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    filePath: {
      type: String, // Path or URL where the media is stored (cloudinary or s3)
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video", "audio"],
      required: true,
    },
    size: {
      type: Number, // Size of the file in bytes/or mb this will come from multer because of mutiple file upload at same time their will be an limit may be 50mb
      required: true,
    },
  },
  { timeStamps: true }
);

const Media = model("Media", MediaSchema);

export default Media;
