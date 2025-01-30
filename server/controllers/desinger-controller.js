import DesignerProfile from "../models/designer-profile-model.js";
import CloudinaryService from "../services/cloudinary-service.js";
import { getCoordinates } from "../services/georeverse-coding.js";

import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";

const designerProfileCtrl = {};

designerProfileCtrl.createProfile = catchAsync(async (req, res, next) => {
  const {
    company,
    position,
    experience,
    aboutMe,
    specializations,
    designStyle,
    softwareExpertise,
    address,
  } = req.body;

  const { lat, lng } = await getCoordinates(address);

  const designer = new DesignerProfile({
    user: req.user.userId,
    company,
    position,
    experience,
    aboutMe,
    specializations,
    designStyle,
    softwareExpertise,
    address,
    location: {
      type: "Point",
      coordinates: [lng, lat],
    },
  });

  await designer.save();

  res.json({ designer });
});

designerProfileCtrl.addItemToPortfolio = catchAsync(async (req, res, next) => {
  const { title, description, category,  } = req.body;

  const designer = await DesignerProfile.findOne({ user: req.user.userId });

  if (!designer) {
    next(
      new AppError(
        "Designer profile not found try to create basic proflie to add portifolio",
        400
      )
    );
  }

  const newPortfolioItem = {
    title,
    description,
    images: [],
    category,
    date: new Date(),
  };

  const fileUploadPromises = req.files.map((file) => {
    return CloudinaryService.uploadFile(file); // Upload file to Cloudinary
  });
  const uploadResults = await Promise.all(fileUploadPromises);

  uploadResults.forEach((upload) => {
    newPortfolioItem.images.push({
      url: upload.secure_url,
      public_id: upload.public_id,
    });
  });

  // Add to the portfolio array
  designer.portfolio.push(newPortfolioItem);
  await designer.save();

  res.status(200).json({ message: "Portfolio item added successfully" });
});

designerProfileCtrl.getMyPortfolio = catchAsync(async (req, res, next) => {
  const portifolio = await DesignerProfile.findOne({ user: req.user.userId })
    .select("portfolio")
    .lean();
  res.json(portifolio);
});

designerProfileCtrl.getAllPortfolios = catchAsync(async (req, res, next) => {
  const portifolios = await DesignerProfile.find()
    .select("portfolio")
    .populate({
      path: "user",
      select: "firstName lastName profilePicture",
    });

  res.json(portifolios);
});

designerProfileCtrl.getDesingerProfile = catchAsync(async (req,res,next) => {
  const {designer_id} = req.params
   const desingers = await DesignerProfile.find({user: designer_id})
})

designerProfileCtrl.getAllDesingers = catchAsync(async (req,res,next) => {
     
})

export default designerProfileCtrl;
