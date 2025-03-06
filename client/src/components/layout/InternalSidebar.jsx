import { useSelector } from "react-redux";
import SidebarItem from "../common/SidebarItem";
import { Link } from "react-router-dom";
import { SidebarProvider } from "../../context/SidebarProvider";
import {
  BadgeIndianRupee,
  ChartArea,
  CircleCheckBig,
  ClipboardList,
  ClipboardPlus,
  ClockArrowDown,
  ContactRound,
  FilePlus2,
  Images,
  MessageCircle,
  MousePointerClick,
  PanelsTopLeft,
  Snail,
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
        <SidebarItem icon={<MessageCircle />} text="My Chat" to="/chat" />
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

      {user?.role === "designer" && (
        <SidebarItem
          icon={<ClipboardPlus />}
          text="Create Task"
          to="/designer/create-task"
        />
      )}

      {user?.role === "designer" && (
        <SidebarItem icon={<ClipboardList />} text="manage projects">
          <nav className="flex flex-col relative text-sm bg-white shadow-md  mr-3">
            <Link
              to="/designer/pending-tasks"
              className="px-2 py-1 hover:bg-gray-100"
            >
              My Pending Tasks &#10132;
            </Link>
            <Link
              to="/designer/inprogress-tasks"
              className="px-2 py-1 hover:bg-gray-100"
            >
              In progress Tasks &#10132;
            </Link>
            <Link
              to="/designer/completed-tasks"
              className="px-2 py-1 hover:bg-gray-100"
            >
              Completed Tasks &#10132;
            </Link>
          </nav>
        </SidebarItem>
      )}

      {user?.role === "associate" && (
        <SidebarItem
          icon={<UserPen />}
          text="Work Profile"
          to="/associate/profile"
        />
      )}
      {user?.role === "associate" && (
        <SidebarItem
          icon={<ClockArrowDown />}
          text="Live Tasks"
          to="/associate/live-tasks"
        />
      )}
      {user?.role === "associate" && (
        <SidebarItem
          icon={<Snail />}
          text="Running Tasks"
          to="/associate/running-tasks"
        />
      )}
      {user?.role === "associate" && (
        <SidebarItem
          icon={<CircleCheckBig />}
          text="Completed Tasks"
          to="/associate/completed-tasks"
        />
      )}
    </SidebarProvider>
  );
};
export default InternalSidebar;
