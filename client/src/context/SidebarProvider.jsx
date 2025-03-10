import { ChevronLast, ChevronFirst, UserRoundCog } from "lucide-react";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [dropDown, setDropDown] = useState(null);
  const { user } = useSelector((store) => store.auth);

  const updateDropDown = (name) => {
    if (dropDown === name) setDropDown(null);
    else setDropDown(name);
  };

  return (
    <aside className={expanded ? "h-screen w-3xs" : "h-screen w-18"}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <Link to={!user ? "/" : user.role === "client" ? "/" : ""}>
            <img
              src="/logo.svg"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt="company logo"
            />
          </Link>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 hover:cursor-pointer"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, dropDown, updateDropDown }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <Link to="/my-account">
          <div className="border-t flex p-3">
            {user ? (
              <img
                src={user.profilePicture}
                alt=""
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Eo_circle_purple_letter-w.svg/768px-Eo_circle_purple_letter-w.svg.png?20200417171107"
                alt=""
                className="w-8 h-8 rounded-full"
              />
            )}
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">
                  {user ? user.firstName : "Welcome"}
                </h4>
                <span className="text-xs text-gray-600">
                  {user ? user.email : "designspace@gmail.com"}
                </span>
              </div>
              <UserRoundCog />
            </div>
          </div>
        </Link>
      </nav>
    </aside>
  );
}

export default SidebarContext;
