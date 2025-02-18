import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import LandingLayout from "../layout/LandingLayout";
import { LoginComponent } from "../components";
import { login } from "../features/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deviceLimitError, error } = useSelector((store) => store.auth);

  useEffect(() => {
    if (deviceLimitError) {
      toast.error(error);
      navigate("/device-limit");
    }
  }, [deviceLimitError]);

  const handleLogin = async (data) => {
    const actionResult = await dispatch(login(data));
    if (login.fulfilled.match(actionResult)) {
      if (actionResult.payload.role === "client") navigate("/");
      if (actionResult.payload.role === "admin") navigate("/admin");
      if (actionResult.payload.role === "designer") navigate("/designer");
      if (actionResult.payload.role === "associate") navigate("/associate");
    } else if (login.rejected.match(actionResult)) {
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
