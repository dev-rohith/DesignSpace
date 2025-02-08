import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const DesignSpaceLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default DesignSpaceLayout;
