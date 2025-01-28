import catchAsync from "../utils/catch-async-util.js";
import LandingConfig from "../models/landingConfig-model.js";
import CloudinaryService from "../services/cloudinary-service.js";

import fs from "fs";

const landingCtrl = {};

landingCtrl.getLanding = catchAsync(async (req, res, next) => {
  const cofig = await LandingConfig.findOne({});
  res.json(cofig);
});

landingCtrl.createCarouselItem = async (req, res) => {
  try {
    const uploadResult = await CloudinaryService.uploadFile(req.file);
    if(!uploadResult) throw new Error('somthshdklfh')
    fs.unlink(req.file.path);
    res.status(200).json({
      message: "Files uploaded successfully",
      uploadedFiles: uploadResult,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({error});
  }
};

export default landingCtrl;
