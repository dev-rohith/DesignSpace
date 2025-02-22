import { useSelector } from "react-redux";
import SidebarItem from "../common/SidebarItem";
import { Link } from "react-router-dom";
import { SidebarProvider } from "../../context/SidebarProvider";
import {
  BadgeIndianRupee,
  ChartArea,
  ContactRound,
  FilePlus2,
  Images,
  MousePointerClick,
  PanelsTopLeft,
  SquareChartGantt,
  SquareKanban,
  UserPen,
  Users,
} from "lucide-react";

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
          to="/admin/landing"
        />
      )}

      {user?.role === "designer" && (
        <SidebarItem
          icon={<UserPen />}
          text="Work Profile"
          to="/designer/profile"
        />
      )}
      {user?.role === "designer" && (
        <SidebarItem
          icon={<Images />}
          text="My Portfolio"
          to="/designer/portfolio"
        />
      )}
      {user?.role === "designer" && (
        <SidebarItem
          icon={<FilePlus2 />}
          text="Create Porject"
          to="/designer/create-project"
        />
      )}

      {user?.role === "associate" && (
        <SidebarItem
          icon={<UserPen />}
          text="Work Profile"
          to="/associate/profile"
        />
      )}

      {user?.role === "designer" && (
        <SidebarItem
          icon={<SquareKanban />}
          text="Progress Projects"
          to="/designer/inprogress-projects"
        />
      )}

      {user?.role === "designer" && (
        <SidebarItem icon={<SquareChartGantt />} text="manage projects">
          <nav className="flex flex-col relative text-sm bg-white shadow-md  mr-3">
            <Link
              to="/designer/pending-projects"
              className="px-2 py-1 hover:bg-gray-100"
            >
              Pending &#10132;
            </Link>
            <Link
              to="/designer/inreview-projects"
              className="px-2 py-1 hover:bg-gray-100"
            >
              in review &#10132;
            </Link>
            <Link
              to="/designer/completed-projects"
              className="px-2 py-1 hover:bg-gray-100"
            >
              completed &#10132;
            </Link>
          </nav>
        </SidebarItem>
      )}
    </SidebarProvider>
  );
};
export default InternalSidebar;
