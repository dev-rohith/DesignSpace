import { useDispatch } from "react-redux";
import { SignupComponent } from "../components";
import LandingLayout from "../layout/LandingLayout";
import { signup } from "../features/authApi";
import {toast} from "react-hot-toast";

const SignUp = () => {
  const dispatch = useDispatch();
  const handleSignup = async (data) => {
    const actionResult = await dispatch(signup(data));
    if (actionResult.type === signup.fulfilled.type) {
       console.log(actionResult.payload)
    } else if (actionResult.type === signup.rejected.type) {
      toast.error(actionResult.payload)
    }
  };
  return (
    <LandingLayout>
      <SignupComponent handleSignup={handleSignup} />
    </LandingLayout>
  );
};
export default SignUp;
