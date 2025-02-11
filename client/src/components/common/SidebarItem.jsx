import { useContext, useRef } from "react";
import SidebarContext from "../../context/SidebarProvider";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, to }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link to={to}>
      <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
       

        {!expanded && (
          <div
            className="
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            z-60
        "
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
};

export default SidebarItem;
