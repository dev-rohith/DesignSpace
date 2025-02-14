import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import SidebarContext from "../../context/SidebarProvider";

const SidebarItem = ({ icon, text, to, children }) => {
  const { expanded, dropDown, updateDropDown } = useContext(SidebarContext);

  const handleDropDown = (e) => {
    // Prevent navigation if item has children
    if (children) {
      e.preventDefault();
      if (dropDown === text) {
        updateDropDown(null);
      } else {
        updateDropDown(text);
      }
    }
  };

  const hasChildren = Boolean(children);

  return (
    <div className="relative">
      <li className="relative">
        <Link
          to={to}
          onClick={handleDropDown}
          className={`
            flex items-center py-2.5 px-4 my-1 rounded-lg cursor-pointer
            transition-colors duration-200
            hover:bg-violet-50 hover:text-violet-700
            ${
              dropDown === text
                ? "bg-violet-50 text-violet-700"
                : "text-gray-600"
            }
          `}
        >
          <div className="flex items-center w-full">
            <span className="min-w-[24px] h-6 flex items-center justify-center">
              {icon}
            </span>

            <div
              className={`
              flex items-center justify-between w-full
              transition-all duration-200 overflow-hidden
              ${expanded ? "ml-3 w-52" : "w-0"}
            `}
            >
              <span className="whitespace-nowrap">{text}</span>
              {hasChildren && (
                <ChevronDown
                  className={`
                    w-4 h-4 ml-2 transition-transform duration-200
                    ${dropDown === text ? "rotate-180" : ""}
                  `}
                />
              )}
            </div>

            {!expanded && (
              <div
                className={`
                absolute left-full rounded-md px-3 py-2 ml-6
                bg-violet-100 text-violet-800 text-sm font-medium
                invisible opacity-0 -translate-x-3
                transition-all duration-200 whitespace-nowrap
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                z-50
              `}
              >
                {text}
              </div>
            )}
          </div>
        </Link>
      </li>

      {dropDown === text && expanded && (
        <div className="flex flex-col ml-4 border-l-2 border-gray-300 space-y-0.2">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
