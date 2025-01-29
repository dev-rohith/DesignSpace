import DesignerProfile from "../models/designer-profile-model.js";
import { getCoordinates } from "../services/georeverse-coding.js";
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

   await designer.save()

  res.json({ designer });
});

designerProfileCtrl.getAllDesingersProfiles = catchAsync()

export default designerProfileCtrl;
