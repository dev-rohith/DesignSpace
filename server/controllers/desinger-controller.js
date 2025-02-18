import DesignerProfile from "../models/designer-profile-model.js";
import CloudinaryService from "../services/cloudinary-service.js";
import { getCoordinates } from "../services/georeverse-coding.js";
import APIFeatures from "../utils/api-features.js";

import AppError from "../utils/app-error-util.js";
import catchAsync from "../utils/catch-async-util.js";
import fs from "fs";

const designerProfileCtrl = {};

////////////////////--public--////////////////////////////////////////

designerProfileCtrl.getDesingerProfile = catchAsync(async (req, res, next) => {
  const { designer_id } = req.params;
  const desingerProfile = await DesignerProfile.findOne({ user: designer_id })
    .populate("user", "firstName lastName profilePicture")
    .select(" -ratings -location -portfolio")
    .lean();
  res.json(desingerProfile);
});

designerProfileCtrl.getAllDesingers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(DesignerProfile, req.query)
    .filterAndSearch()
    .sort()
    .paginate();

  const finalQuery = features.query
    .select("-portfolio -address -location")
    .populate("user", "firstName lastName profilePicture")
    .lean();

  const desingers = await finalQuery;

  res.json(desingers);
});

designerProfileCtrl.getAllPortfolios = catchAsync(async (req, res, next) => {
  const portifolios = await DesignerProfile.find({
    $expr: { $gt: [{ $size: "$portfolio" }, 0] },
  })
    .select("portfolio")
    .populate({
      path: "user",
      select: "firstName lastName profilePicture country",
    })
    .lean();

  res.json(portifolios);
});

//////////////////////////--private--/////////////////////////////////

designerProfileCtrl.createMyProfile = catchAsync(async (req, res, next) => {
  const { address } = req.body;
  const { lat, lng } = await getCoordinates(address);

  if (!lat || !lng)
    return next(new AppError("please provide valid address", 400));

  const designerProfile = await DesignerProfile.create({
    user: req.user.userId,
    ...req.body,
    location: {
      coordinates: [lat, lng],
    },
  });

  if (!designerProfile)
    return next(new AppError("error while creating profile", 500));

  const createdDesignerProfile = await DesignerProfile.findOne({
    user: req.user.userId,
  })
    .select("-portfolio -user -ratings -location -_id -__v")
    .lean();

  res.json(createdDesignerProfile);
});

designerProfileCtrl.getMyProfile = catchAsync(async (req, res, next) => {
  console.log("hitting");
  const myProfile = await DesignerProfile.findOne({
    user: req.user.userId,
  })
    .select("-portfolio -user -ratings -location -_id -__v")
    .lean();
  if (!myProfile) return next(new AppError("Profile not found", 404));
  res.json(myProfile);
});

designerProfileCtrl.getMyPortfolio = catchAsync(async (req, res, next) => {
  const portifolio = await DesignerProfile.findOne({ user: req.user.userId })
    .select("portfolio")
    .lean();
  if (!portifolio) return next(new AppError("Profile not found", 404));
  res.json(portifolio);
});

designerProfileCtrl.editMyProfile = catchAsync(async (req, res, next) => {
  const { address } = req.body;

  const { lat, lng } = await getCoordinates(address);

  const updatedProfileData = {
    ...req.body,
    location: {
      type: "Point",
      coordinates: [lng, lat],
    },
  };

  const updatedProfile = await DesignerProfile.findOneAndUpdate(
    { user: req.user.userId },
    updatedProfileData,
    { new: true }
  ).select("-portfolio -user -ratings -location -_id -__v");

  if (!updatedProfile) {
    return next(
      new AppError("Your profile was not found. Try refreshing the page.", 400)
    );
  }

  res.json({ message: "Profile updated successfully", data: updatedProfile });
});

designerProfileCtrl.addItemToPortfolio = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;

  const designer = await DesignerProfile.findOne({ user: req.user.userId });

  if (!designer) {
    return next(
      new AppError(
        "Designer profile not found try to create basic proflie to add portifolio",
        400
      )
    );
  }
  if (designer.portfolio.length >= 5) {
    return next(
      new AppError("You only can able to add 5 item to your portifolio", 400)
    );
  }

  const newPortfolioItem = {
    title,
    description,
    images: [],
  };

  const fileUploadPromises = req.files.map((file) => {
    // Upload file to Cloudinary
    return CloudinaryService.uploadFile(file);
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

  res.status(200).json({
    message: "Portfolio item added successfully",
    data: newPortfolioItem,
  });
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

    const removeItemsPromises = map((image) => {
      return CloudinaryService.deleteFile(image.public_id, "image");
    });

    const removeItemsFromCloudinary = await Promise.all(removeItemsPromises);

    res.json({
      message: "item deleted successfully",
      data: deletedItem,
    });
  }
);

designerProfileCtrl.editItemFromPortfolio = catchAsync(
  async (req, res, next) => {
    const { item_id } = req.params;
    const { title, description, category, starting_price, languages_know } =
      req.body;

    const newPortfolioItem = {
      title,
      description,
      languages_know,
      starting_price,
      category,
    };

    const designerPortfolio = await DesignerProfile.findOne({
      user: req.user.userId,
    });

    if (req.files) {
      const fileUploadPromises = req.files.map((file) => {
        return CloudinaryService.uploadFile(file); // Upload file to Cloudinary
      });
      const uploadResults = await Promise.all(fileUploadPromises);
      try {
        await Promise.all(
          req.files.map((file) => fs.promises.unlink(file.path))
        );
      } catch (unlinkError) {
        console.error("Error while deleting the file:", unlinkError.message);
      }

      const uploads = uploadResults.map((upload) => {
        return {
          url: upload.secure_url,
          public_id: upload.public_id,
        };
      });

      if (uploads.length > 0) {
        newPortfolioItem.images = uploads; //adding updated images incase user uploaded then or else previous remains same

        const targetItem = designerPortfolio.portfolio.find((element) => {
          return `${element._id}` === item_id;
        });
        const removePreviousImages = targetItem.images.map((image) => {
          CloudinaryService.deleteFile(image.public_id, "image"); //potential clean up from the cloudinay removing previous images
        });
        await Promise.allSettled(removePreviousImages);
      }
    }
    designerPortfolio.portfolio = designerPortfolio.portfolio.map((element) =>
      `${element._id}` === item_id ? newPortfolioItem : element
    );
    designerPortfolio.save();
    res.status(200).json({ message: "updated sucessfully" });
  }
);

export default designerProfileCtrl;
