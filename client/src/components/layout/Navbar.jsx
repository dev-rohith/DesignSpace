import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/authApi";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isLoggedIn } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setIsMorePopUp = () => {};

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

  return (
    <nav className=" flex items-center justify-between font-bold text-white">
      <Link to="/">
        <img className="bg-balck w-30 ml-3" src="/logo.svg" alt="" />{" "}
      </Link>
      <ul className="flex space-x-2 md:flex items-center md:space-x-5 mr-6 uppercase text-sm font-medium text-(--dark)">
        <Link>
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
            setIsMorePopUp;
          }}
          className="group hover:cursor-pointer"
        >
          more
          <div className="mx-2 group-hover:border-b group-hover:border-black-100"></div>
        </li>

        {isLoggedIn ? (
          <div
            onClick={() => {
              setIsPopupOpen(!isPopupOpen);
            }}
            className="flex items-center hover:cursor-pointer relative"
          >
            <img
              className="h-9 w-9 rounded-full"
              src={user.profilePicture}
              alt="profile picture"
            />
            <span>
              <ChevronDown className="w-6 h-5" />
            </span>
            {isPopupOpen && (
              <div
                ref={dropdownRef}
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
                  onClick={handleLogout}
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
