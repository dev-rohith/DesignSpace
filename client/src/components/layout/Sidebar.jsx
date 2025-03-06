import {
  CalendarArrowDown,
  ContactRound,
  FileUser,
  MessageCircle,
  SquareChartGantt,
  SquareKanban,
  TestTubes,
  Users,
} from "lucide-react";
import { SidebarProvider } from "../../context/SidebarProvider";
import SidebarItem from "../common/SidebarItem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <SidebarProvider>
      {(!user || user.role === "client") && (
        <SidebarItem
          icon={<ContactRound />}
          text="desingers"
          to="/design-space/designers"
        />
      )}
      {(!user || user.role === "client") && (
        <SidebarItem
          icon={<MessageCircle />}
          text="mychat"
          to="/chat"
        />
      )}

      {(!user || user.role === "client") && (
        <SidebarItem
          icon={<CalendarArrowDown />}
          text="pending projects"
          to="/design-space/pending-projects"
        />
      )}

      {(!user || user?.role === "client") && (
        <SidebarItem icon={<ContactRound />} text="manage projects">
          <nav className="flex flex-col text-sm bg-white shadow-md  mr-3">
            <Link
              to="/design-space/inprogress-projects"
              className="px-2 py-1 hover:bg-gray-100"
            >
              in progress &#10132;
            </Link>
            <Link
              to="/design-space/inreview-projects"
              className="px-2 py-1 hover:bg-gray-100"
            >
              in review &#10132;
            </Link>
            <Link
              to="/design-space/completed-projects"
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
export default Sidebar;
