import Application from "../models/application-model.js";


const applicationController = {};

applicationController.createApplication = catchAsync(async (req, res,next) => {
    const application = await Application.create(req.body);
    res.json(application);
});