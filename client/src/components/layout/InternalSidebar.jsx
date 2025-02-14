import { useSelector } from "react-redux";
import SidebarItem from "../common/SidebarItem";
import { Link } from "react-router-dom";
import { SidebarProvider } from "../../context/SidebarProvider";
import { ChartArea, ContactRound, Users } from "lucide-react";

const InternalSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <SidebarProvider>
       {user?.role === "admin" && (
        <SidebarItem icon={<ChartArea />} text="deshboard" to="/admin/dashboard" />
      )}
      {user?.role === "admin" && (
        <SidebarItem icon={<Users />} text="desingers" to="/admin/manage-users" />
      )}
      {user?.role === "admin" && (
        <SidebarItem icon={<ContactRound />} text="applications">
            <nav className="flex flex-col text-sm bg-white shadow-md  mr-3">
              <Link to="/top-designers" className="px-2 py-1 hover:bg-gray-100">
                Top Designers &#10132;
              </Link>
              <Link to="/top-clients" className="px-2 py-1 hover:bg-gray-100">
                Top Clients &#10132;
              </Link>
              <Link to="/top-projects" className="px-2 py-1 hover:bg-gray-100">
                Top Projects &#10132;
              </Link>
            </nav>
        </SidebarItem>
      )}
    </SidebarProvider>
  );
};
export default InternalSidebar;
