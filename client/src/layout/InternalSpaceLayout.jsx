import { Outlet } from "react-router-dom";
import InternalSidebar from "../components/layout/InternalSidebar";

const InternalSpaceLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <InternalSidebar />
      <Outlet />
    </div>
  );
};
export default InternalSpaceLayout;
