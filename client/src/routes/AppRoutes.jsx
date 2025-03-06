import { Navigate, Route, Routes } from "react-router-dom";

import DesignSpaceLayout from "../layout/DesignSpaceLayout";

import {
  AdminDashboard,
  AssociateApplication,
  AssociateDashboard,
  ClientCompletedProjects,
  ClientInprogressProjects,
  ClientInReviewProjects,
  ClientPendingProjects,
  DesignerApplication,
  DesignerCompletedProjects,
  DesignerDashboard,
  DesignerInProgressProjects,
  DesignerInReviewProjects,
  DesignerPendingProjects,
  DesignerPortfolio,
  DesignerProfile,
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
import { ApplicationDetails, ApplicationSucess } from "../components";
import MyAccount from "../components/common/MyAccount";
import PrivateRoute from "./PrivateRoute";
import InternalSpaceLayout from "../layout/InternalSpaceLayout";
import ManageLanding from "../pages/admin/ManageLanding";
import AssociateProfile from "../pages/associate/AssociateProfile";
import CreateProject from "../pages/designer/CreateProject";
import ProjectDetails from "../pages/ProjectDetails";
import CreateTask from "../pages/designer/task/CreateTask";
import DesignerCompletedTasks from "../pages/designer/task/DesignerCompletedTasks";
import DesignerInProgressTasks from "../pages/designer/task/DesignerInProgressTasks";
import DesignerPendingTasks from "../pages/designer/task/DesignerPendingTasks";
import DesingersFeedOperations from "../components/designSpace/DesingersFeedOperations";
import ResetPassword from "../pages/ResetPassword";
import TaskDetails from "../pages/TaskDetails";
import LiveTasks from "../pages/associate/task/LiveTasks";
import RunningTasks from "../pages/associate/task/RunningTasks";
import CompletedTasks from "../pages/associate/task/CompletedTasks";
import MyTaskDetails from "../pages/associate/MyTaskDetails";
import { SocketProvider } from "../context/SocketContext";
import PaymentSucess from "../pages/PaymentSucess";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRoute exculde={true} allowedRoles={["client"]} />}
      >
        <Route index element={<Landing />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />{" "}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/device-limit" element={<DeviceLimit />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
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

      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <SocketProvider>
              <Mychat />
            </SocketProvider>
          </PrivateRoute>
        }
      />

      <Route path="/design-space" element={<DesignSpaceLayout />}>
        <Route index element={<Navigate to="designers" replace />} />
        <Route path="designers" element={<DesingersFeedOperations />} />

        <Route
          path="pending-projects"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientPendingProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="inprogress-projects"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientInprogressProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="inreview-projects"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientInReviewProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="completed-projects"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <ClientCompletedProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="payment-sucess"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <PaymentSucess />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<InternalSpaceLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
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
          <Route path="landing" element={<ManageLanding />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={["designer", "client"]} />}>
        <Route path="project/:project_id" element={<ProjectDetails />} />
      </Route>
      <Route
        element={<PrivateRoute allowedRoles={["designer", "associate"]} />}
      >
        <Route element={<InternalSpaceLayout />}>
          <Route path="task/:task_id" element={<TaskDetails />} />
        </Route>
      </Route>

      {/* Designer Routes */}
      <Route element={<PrivateRoute allowedRoles={["designer"]} />}>
        <Route path="/designer" element={<InternalSpaceLayout />}>
          <Route index element={<DesignerDashboard />} />
          <Route path="profile" element={<DesignerProfile />} />
          <Route path="portfolio" element={<DesignerPortfolio />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route
            path="pending-projects"
            element={<DesignerPendingProjects />}
          />
          <Route
            path="inprogress-projects"
            element={<DesignerInProgressProjects />}
          />
          <Route
            path="inreview-projects"
            element={<DesignerInReviewProjects />}
          />
          <Route
            path="completed-projects"
            element={<DesignerCompletedProjects />}
          />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="pending-tasks" element={<DesignerPendingTasks />} />
          <Route
            path="inprogress-tasks"
            element={<DesignerInProgressTasks />}
          />
          <Route path="completed-tasks" element={<DesignerCompletedTasks />} />
        </Route>
      </Route>

      {/* Assocaite Routes */}
      <Route element={<PrivateRoute allowedRoles={["associate"]} />}>
        <Route path="/associate" element={<InternalSpaceLayout />}>
          <Route index element={<AssociateDashboard />} />
          <Route path="profile" element={<AssociateProfile />} />
          <Route path="live-tasks" element={<LiveTasks />} />
          <Route path="running-tasks" element={<RunningTasks />} />
          <Route path="completed-tasks" element={<CompletedTasks />} />
          <Route path="my-task/:task_id" element={<MyTaskDetails />} />
        </Route>
      </Route>

      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
