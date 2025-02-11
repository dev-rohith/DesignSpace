import { Navigate, Route, Routes } from "react-router-dom";
import {
  DeviceLimit,
  ForgotPassword,
  Landing,
  Login,
  NotFound,
  Pricing,
  SignUp,
} from "../pages";
import DesignSpaceLayout from "../layout/DesignSpaceLayout";
import DesingersFeed from "../components/designSpace/DesingersFeed";
import { PendingProjects } from "../components";
import MyAccount from "../components/common/MyAccount";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pricing" element={<Pricing />} />{" "}
      {/*it should be the private after*/}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/device-limit" element={<DeviceLimit />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/my-account"
        element={
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        }
      />
      <Route path="/design-space" element={<DesignSpaceLayout />}>
        <Route index element={<Navigate to="designers" replace />} />
        <Route path="designers" element={<DesingersFeed />} />
        <Route path="pending-projects" element={<PendingProjects />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
