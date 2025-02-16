import { useSelector } from "react-redux";
import SidebarItem from "../common/SidebarItem";
import { Link } from "react-router-dom";
import { SidebarProvider } from "../../context/SidebarProvider";
import { BadgeIndianRupee, ChartArea, ContactRound, PanelsTopLeft, Users } from "lucide-react";

const InternalSidebar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <SidebarProvider>
      {user?.role === "admin" && (
        <SidebarItem
          icon={<ChartArea />}
          text="deshboard"
          to="/admin/dashboard"
        />
      )}
      {user?.role === "admin" && (
        <SidebarItem
          icon={<Users />}
          text="Manage Users"
          to="/admin/manage-users"
        />
      )}

      {user?.role === "admin" && (
        <SidebarItem icon={<ContactRound />} text="applications">
          <nav className="flex flex-col text-sm bg-white shadow-md  mr-3">
            <Link
              to="/admin/manage-pending-applications"
              className="px-2 py-1 hover:bg-gray-100"
            >
              Pending &#10132;
            </Link>
            <Link
              to="/admin/manage-applications"
              className="px-2 py-1 hover:bg-gray-100"
            >
              None Pending &#10132;
            </Link>
          </nav>
        </SidebarItem>
      )}

      {user?.role === "admin" && (
        <SidebarItem
          icon={<PanelsTopLeft />}
          text="landingpage"
          to="/admin/manage-landing"
        />
      )}

      {user?.role === "admin" && (
        <SidebarItem
          icon={<BadgeIndianRupee />}
          text="projects"
          to="/admin/manage-pricing"
        />
      )}

    </SidebarProvider>
  );
};
export default InternalSidebar;
