import { Navigate, Route, Routes } from "react-router-dom";
import { Landing, Login, NotFound, SignUp } from "../pages";
import Pricing from "../pages/Pricing";
import DesignSpaceLayout from "../layout/DesignSpaceLayout";
import DesignSpaceLanding from "../pages/DesignSpaceLanding";
import DesingersFeed from "../components/designSpace/DesingersFeed";
import { PendingProjects } from "../components";
import DeviceLimit from "../pages/DeviceLimit";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/pricing" element={<Pricing/>} />  {/*it should be the private after*/}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/device-limit" element={<DeviceLimit />} />
      
      <Route path="/design-space" element={<DesignSpaceLayout />} >
         <Route index element={<Navigate to="designers" replace />} />
         <Route path="designers"  element={<DesingersFeed />} />
         <Route path="pending-projects" element={<PendingProjects />} />
      </Route>
 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
