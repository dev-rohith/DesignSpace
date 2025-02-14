import { Outlet } from "react-router-dom";
import InternalSidebar from "../components/layout/InternalSidebar";

const InternalSpaceLayout = () => {
  return (
    <div className="flex">
      <InternalSidebar />
      <Outlet />
    </div>
  );
};
export default InternalSpaceLayout;
