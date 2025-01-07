import User from "../models/user-model.js"
import catchAsync from "../utils/catch-async-util.js"


const userCtrl = {}

userCtrl.getUser = catchAsync(async(req,res,next) => {
    console.log('testing')
    res.json('hello world')
    // const user = User.find(req?.user.id)
})



export default userCtrl