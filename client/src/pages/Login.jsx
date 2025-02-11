import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import LandingLayout from "../layout/LandingLayout";
import { LoginComponent } from "../components";
import { login } from "../features/authApi";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deviceLimitError, error } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    if (deviceLimitError) {
      toast.error(error);
      navigate("/device-limit");
    }
  }, [deviceLimitError]);

  const handleLogin = async (data) => {
    const actionResult = await dispatch(login(data));
    if (actionResult.type === login.fulfilled.type) {
      // navigation here have to think about it        ----------------------------------------------------
      // navigate(redirectTo);  // Perform the navigation 
      navigate("/")
    } else if (actionResult.type === login.rejected.type) {
      toast.error(actionResult.payload);
    }
  };

  return (
    <LandingLayout>
      <LoginComponent handleLogin={handleLogin} />
    </LandingLayout>
  );
};
export default Login;
