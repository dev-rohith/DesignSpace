import DesignerProfile from "../models/designer-profile-model.js";
import CloudinaryService from "../services/cloudinary-service.js";
import { getCoordinates } from "../services/georeverse-coding.js";
import APIFeatures from "../utils/api-features.js";

import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";
import fs from "fs";

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

designerProfileCtrl.updateProfile = catchAsync(async (req,res,next) => {
  
})

designerProfileCtrl.addItemToPortfolio = catchAsync(async (req, res, next) => {
  const { title, description, category, starting_price, languages_know } =
    req.body;

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
    languages_know,
    starting_price,
    category,
    date: new Date(),
  };

  const fileUploadPromises = req.files.map((file) => {
    return CloudinaryService.uploadFile(file); // Upload file to Cloudinary
  });
  const uploadResults = await Promise.all(fileUploadPromises);

  try {
    await Promise.all(req.files.map((file) => fs.promises.unlink(file.path)));
  } catch (unlinkError) {
    console.error("Error while deleting the file:", unlinkError.message);
  }

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

designerProfileCtrl.deleteItemFromPortfolio = catchAsync(
  async (req, res, next) => {
    const { item_id } = req.params;
    const userProfile = await DesignerProfile.findOneAndUpdate(
      { user: req.user.userId },
      { $pull: { portfolio: { _id: item_id } } }
    );

    const deletedItem = userProfile.portfolio.find(
      (item) => `${item._id}` === item_id
    );

    const removeItemsFromCloudinary = deletedItem.images.map((image) => {
      return CloudinaryService.deleteFile(image.public_id, "image");
    });

    const resu = await Promise.all(removeItemsFromCloudinary);

    res.json({
      message: "item deleted successfully",
      data: deletedItem,
    });
  }
);

designerProfileCtrl.getMyPortfolio = catchAsync(async (req, res, next) => {
  const portifolio = await DesignerProfile.findOne({ user: req.user.userId })
    .select("portfolio")
    .lean();
  res.json(portifolio);
});

designerProfileCtrl.getMyProfile = catchAsync(async (req, res, next) => {
  const myProfile = await DesignerProfile.findOne({
    user: req.user.userId,
  }).select("-user -ratings -location");
  res.json(myProfile);
});

designerProfileCtrl.getAllPortfolios = catchAsync(async (req, res, next) => {
  const portifolios = await DesignerProfile.find()
    .select("portfolio")
    .populate({
      path: "user",
      select: "firstName lastName profilePicture country",
    });

  res.json(portifolios);
});

designerProfileCtrl.getDesingerProfile = catchAsync(async (req, res, next) => {
  const { designer_id } = req.params;
  const desingerProfile = await DesignerProfile.findOne({ user: designer_id })
    .populate("user", "firstName lastName profilePicture")
    .select(" -ratings -location")
    .lean();
  res.json(desingerProfile);
});

designerProfileCtrl.getAllDesingers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(DesignerProfile.find(), req.query)
    .filter()
    .sort()
    .paginate();

  const finalQuery = features.query
    .select("-portfolio -address -location")
    .populate("user", "firstName lastName profilePicture")
    .lean();

  const desingers = await finalQuery;

  res.json(desingers);
});

export default designerProfileCtrl;
