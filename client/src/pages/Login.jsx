import { LoginComponent } from "../components";
import LandingLayout from "../layout/LandingLayout";

import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch()

  const handleLogin = (data) => {
    console.log(data);
    
  };

  return (
    <LandingLayout>
      <LoginComponent handleLogin={handleLogin} />
    </LandingLayout>
  );
};
export default Login;
