import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const InternalSpaceLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default InternalSpaceLayout;
