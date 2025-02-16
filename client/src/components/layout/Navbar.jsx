import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronsRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { logout, logoutAll } from "../../features/actions/authActions";
import usePopUp from "../../hooks/usePopUp";

const Navbar = () => {
  const naviagate = useNavigate();
  const {
    isPopupOpen: isProfilePopUp,
    setIsPopupOpen: setIsProfilePopUp,
    dropdownRef: ProfileDrop,
  } = usePopUp();
  const {
    isPopupOpen: isMorePopUp,
    setIsPopupOpen: setIsMorePopUp,
    dropdownRef: MoreDrop,
  } = usePopUp();

  const { user, isLoggedIn } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const actionResult = await dispatch(logout());
    if (actionResult.type === logout.fulfilled.type) {
      toast.success(actionResult.payload);
      localStorage.removeItem("accessToken");
    } else if (actionResult.type === logout.rejected.type) {
      toast.error(actionResult.payload);
      localStorage.removeItem("accessToken");
    }
  };
  const handleLogoutFromAllDevices = async () => {
    const actionResult = await dispatch(logoutAll());
    if (logoutAll.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload);
      naviagate("/login");
      navi;
    } else if (logoutAll.rejected.match(actionResult)) {
      toast.error(actionResult.payload);
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between font-bold text-white bg-gradient-to-b from-white/70 to-white/60 backdrop-blur-md backdrop-saturate-150 border-b border-white/10 shadow-sm">
      <Link to="/">
        <img className="bg-balck w-30 ml-3" src="/logo.svg" alt="" />{" "}
      </Link>
      <ul className="flex space-x-2 md:flex items-center md:space-x-5 mr-6 uppercase text-sm font-medium text-(--dark)">
        <Link to="/our-work">
          <li className="group">
            our work
            <div className=" mx-2 group-hover:border-b group-hover:border-black-100"></div>
          </li>
        </Link>
        <Link to="/design-space">
          <li className="group">
            <div className=" px-2  rounded-xl border bg-gray-400 group-hover:-translate-0.5">
              design space
            </div>
          </li>
        </Link>
        <Link to="/pricing">
          <li className="group">
            pricing
            <div className="mx-2 group-hover:border-b group-hover:border-black-100"></div>
          </li>
        </Link>

        <li
          onClick={() => {
            setIsMorePopUp(!isMorePopUp);
          }}
          className="group hover:cursor-pointer relative flex"
        >
          more
          <ChevronDown className="w-6 h-5 group-hover:translate-y-0.5" />
          <div className="mx-2 group-hover:border-b group-hover:border-black-100"></div>
          {isMorePopUp && (
            <div
              ref={MoreDrop}
              className="absolute top-8 right-[-1rem] text-center w-50 bg-white shadow-lg border border-gray-200 overflow-hidden z-50"
            >
              <Link
                to="/application-designer"
                className="block pr-5 py-2 tracking-tight text-gray-700 text-xs border-b hover:bg-violet-600 hover:text-white"
              >
                <ChevronsRight className="inline h-5 w-4 pb-1 " /> Become a
                design partner
              </Link>
              <Link
                to="/application-associate"
                className="block px-1 py-2 tracking-tight text-gray-700 text-xs border-b hover:bg-violet-600 hover:text-white"
              >
                <ChevronsRight className="inline h-5 w-4 pb-1" /> Become a
                Assoicate partner
              </Link>
            </div>
          )}
        </li>

        {isLoggedIn ? (
          <div
            onClick={() => {
              setIsProfilePopUp(!isProfilePopUp);
            }}
            className="flex items-center hover:cursor-pointer group relative"
          >
            <img
              className="h-9 w-9 rounded-full"
              src={user.profilePicture}
              alt="profile picture"
            />
            <span>
              <ChevronDown className="w-6 h-5 group-hover:translate-y-0.5" />
            </span>
            {isProfilePopUp && (
              <div
                ref={ProfileDrop}
                className="absolute top-12 text-center right-0 w-35 bg-white shadow-lg  border border-gray-200 overflow-hidden z-50"
              >
                <Link
                  to="/my-account"
                  className="block px-4 py-2 text-gray-700 border-b hover:bg-violet-600 hover:text-white"
                >
                  My Account
                </Link>
                <button
                  className="w-full hover:text-gray-100  pb-2  pt-1 hover:bg-orange-600 hover:cursor-pointer "
                  onClick={handleLogoutFromAllDevices}
                >
                  Logout from all
                </button>
                <button
                  className="w-full bg-red-500 text-gray-100  pb-2  pt-1 hover:bg-red-600 hover:cursor-pointer "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <li className="group">
              <Link to="/login">login</Link>
              <div className="mx-2 group-hover:border-b group-hover:border-black-100"></div>
            </li>
            <li className="group">
              <Link to="/signup">signup</Link>
              <div className="mx-2 group-hover:border-b group-hover:border-black-100"></div>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
