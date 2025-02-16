import { Navigate, Route, Routes } from "react-router-dom";

import DesignSpaceLayout from "../layout/DesignSpaceLayout";

import {
  AdmindDashboard,
  AssociateApplication,
  DesignerApplication,
  DeviceLimit,
  ForgotPassword,
  Landing,
  Login,
  ManageUsers,
  Mychat,
  NonePendingApplications,
  NotFound,
  OurWork,
  PendingApplications,
  Pricing,
  SignUp,
  UnAuthorized,
} from "../pages";
import {
  ApplicationDetails,
  ApplicationSucess,
  DesingersFeed,
  PendingProjects,
} from "../components";
import MyAccount from "../components/common/MyAccount";
import PrivateRoute from "./PrivateRoute";
import InternalSpaceLayout from "../layout/InternalSpaceLayout";
import ManageLanding from "../pages/admin/ManageLanding";
import ManagePricing from "../pages/admin/ManagePricing";

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
            <DesignerApplication />
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

      <Route
        path="/application-success"
        element={
          <PrivateRoute>
            <ApplicationSucess />
          </PrivateRoute>
        }
      />

      <Route path="/design-space" element={<DesignSpaceLayout />}>
        <Route index element={<Navigate to="designers" replace />} />
        <Route path="designers" element={<DesingersFeed />} />
        <Route path="pending-projects" element={<PendingProjects />} />
        <Route path="chat" element={<Mychat />} />
      </Route>


      {/* Admin Routes */}

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<InternalSpaceLayout />}>
          <Route path="dashboard" element={<AdmindDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
          <Route
            path="manage-pending-applications"
            element={<PendingApplications />}
          />
          <Route
            path="manage-applications"
            element={<NonePendingApplications />}
          />
          <Route
            path="application/:application_id"
            element={<ApplicationDetails />}
          />
          <Route
            path="landing"
            element={<ManageLanding />}
          />
          <Route
            path="landing"
            element={<ManagePricing />}
          />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
