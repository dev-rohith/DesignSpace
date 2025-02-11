import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { createContext, useState } from "react";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={expanded ? "h-screen w-3xs" : "h-screen w-18"}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link to="/">
            <img
              src="/logo.svg"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
          </Link>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 hover:cursor-pointer"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <Link to="/my-account">
          <div className="border-t flex p-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Eo_circle_purple_letter-w.svg/768px-Eo_circle_purple_letter-w.svg.png?20200417171107"
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Welcome</h4>
                {/* <span className="text-xs text-gray-600">johndoe@gmail.com</span> */}
              </div>
              <MoreVertical size={20} />
            </div>
          </div>
        </Link>
      </nav>
    </aside>
  );
}

export default SidebarContext;
