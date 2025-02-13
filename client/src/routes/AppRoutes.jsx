import { Navigate, Route, Routes } from "react-router-dom";
import {
  AdminDashbord,
  AssociateApplication,
  DesingerApplication,
  DeviceLimit,
  ForgotPassword,
  Landing,
  Login,
  ManageUsers,
  Mychat,
  NotFound,
  OurWork,
  Pricing,
  SignUp,
  UnAuthorized,
} from "../pages";
import DesignSpaceLayout from "../layout/DesignSpaceLayout";
import DesingersFeed from "../components/designSpace/DesingersFeed";
import { PendingProjects } from "../components";
import MyAccount from "../components/common/MyAccount";
import PrivateRoute from "./PrivateRoute";
import InternalSpaceLayout from "../layout/InternalSpaceLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route
        path="/"
        element={<PrivateRoute exculde={true} allowedRoles={["client"]} />}
      >
        <Route index element={<Landing />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />{" "}
        {/*it should be the private after*/}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/device-limit" element={<DeviceLimit />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route
        path="/application-designer"
        element={
          <PrivateRoute>
            <DesingerApplication />
          </PrivateRoute>
        }
      />
      <Route
        path="/application-associate"
        element={
          <PrivateRoute>
            <AssociateApplication />
          </PrivateRoute>
        }
      />

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
        <Route path="chat" element={<Mychat />} />
      </Route>

      <Route path="/admin" element={<InternalSpaceLayout />}>
        <Route path="dashbord" element={<AdminDashbord />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-applications" element={<ManageUsers />} />
      </Route>

      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
