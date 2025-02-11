import { useDispatch, useSelector } from "react-redux";
import { SignupComponent } from "../components";
import LandingLayout from "../layout/LandingLayout";
import { resendOtp, signup, verifyOtp } from "../features/authApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OtpVerification from "./OtpVerification";

const SignUp = () => {
  const [showOtp, setShowOtp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { verifyId } = useSelector((store) => store.auth);

  const handleSignup = async (data) => {
    const actionResult = await dispatch(signup(data));
    if (actionResult.type === signup.fulfilled.type) {
      toast.success(actionResult.payload.message);
      setShowOtp(!showOtp);
    } else if (actionResult.type === signup.rejected.type) {
      toast.error(actionResult.payload);
    }
  };

  const handleOtpSubmit = async (data) => {
    if (verifyId) {
      const actionResult = await dispatch(verifyOtp({ data, verifyId }));
      if (actionResult.type === verifyOtp.fulfilled.type) {
        toast.success(actionResult.payload)
        navigate("/login")
      } else if (actionResult.type === verifyOtp.rejected.type) {
        toast.error(actionResult.payload)
      }
    }
  };

  const handleResendOtp = async () => {
    if (verifyId) {
      const actionResult = await dispatch(resendOtp(verifyId));
      if(actionResult.type === resendOtp.fulfilled.type){
        toast.success(actionResult.payload)
      }else if(actionResult.type === resendOtp.rejected.type){
        console.log(actionResult.payload)
        toast.error(actionResult.payload)
      }
    }
  };

  return (
    <LandingLayout>
      {showOtp ? (
        <OtpVerification length={4} handleOtpSubmit={handleOtpSubmit} handleResendOtp={handleResendOtp} />
      ) : (
        <SignupComponent handleSignup={handleSignup} />
      )}
    </LandingLayout>
  );
};
export default SignUp;
