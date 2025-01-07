import User from "../models/user-model.js"
import catchAsync from "../utils/catch-async-util.js"


const userCtrl = {}

userCtrl.getUser = catchAsync(async(req,res,next) => {
    console.log('testing')
    res.json('hello world')
    // const user = User.find(req?.user.id)
})

userCtrl.updatePassword = catchAsync(async(req,res,next) => {
    const user = await User.findById(req.user.id).select('+password')

})



export default userCtrl