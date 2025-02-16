import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { KeyRound, Lock, Mail, Save, User } from "lucide-react";

import axiosInstance from "../../apis/axiosIntance";
import { logout, logoutAll } from "../../features/actions/authActions";
import { updateUser, updateUserPic } from "../../features/actions/userActions";

import Sidebar from "../layout/Sidebar";
import UserProfilePicture from "../ui/userProfilePicture";
import SavingSpinner from "../ui/SavingSpinner";
import InternalSidebar from "../layout/InternalSidebar";

const MyAccount = () => {
  const { user } = useSelector((store) => store.auth);
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();

  const handleProfileChange = async (file) => {
    if (!file) {
      toast.error("image not selected");
      return;
    }
    const Form = new FormData();
    Form.append("image", file);
    setIsSaving(true);
    const actionResult = await dispatch(updateUserPic(Form));
    if (updateUserPic.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (updateUserPic.rejected.match(actionResult)) {
      toast.error(actionResult);
    }
    setIsSaving(false);
  };

  const handleNameChange = async () => {
    setIsSaving(true);
    const actionResult = await dispatch(
      updateUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
      })
    );
    if (updateUser.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (updateUser.rejected.match(actionResult)) {
      toast.error(actionResult.payload);
    }
    setIsSaving(false);
  };

  const handlePasswordChange = async () => {
    try {
      if (userData.newPassword !== userData.confirmNewPassword) {
        toast.error("new password and confirm new password are not same");
        return;
      }
      setIsSaving(true);
      const response = await axiosInstance.put("user/updatePassword", {
        currentPassword: userData.currentPassword,
        newPassword: userData.newPassword,
      });
      toast.success(response.data.message);
      setIsSaving(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    const actionResult = await dispatch(logout());

    if (logout.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload);
    } else if (logout.rejected.match(actionResult)) {
      toast.error(actionResult.payload);
    }
  };

  const handleLogoutFromAllDevices = async () => {
    const actionResult = await dispatch(logoutAll());
    if (logoutAll.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload);
    } else if (logoutAll.rejected.match(actionResult)) {
      toast.error(actionResult.payload);
    }
  };

  if (isSaving) return <SavingSpinner />;

  return (
    <div className="flex h-screen bg-gray-50">
      {user.role === "client" ? <Sidebar /> : <InternalSidebar />}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 py-6 md:py-10 h-full">
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
            <h5 className="text-xl uppercase">My profile</h5>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-700 border border-red-600 hover:bg-red-500 hover:text-white hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
          {/* Profile Picture Section */}
          <UserProfilePicture
            profilePicture={user.profilePicture}
            handleProfileChange={handleProfileChange}
          />
          {/* Update Profile Section */}
          <div className="flex flex-col md:flex-row items-start justify-between max-w-3xl mx-auto mb-8 gap-6">
            <h2 className="text-xl uppercase md:ml-2 font-medium tracking-wide text-gray-800 transform hover:scale-105 transition-transform">
              Update Profile Details :
            </h2>
            <div className="w-full md:w-100  bg-white  shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-violet-600 transition-colors">
                    FirstName *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userData.firstName}
                      className="w-full p-2.5 border border-gray-200  outline-none focus:border-violet-400 transition-colors pl-9"
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-violet-600 transition-colors">
                    LastName *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userData.lastName}
                      className="w-full p-2.5 border border-gray-200  outline-none focus:border-violet-400 transition-colors pl-9"
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                    />
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={user.email}
                      disabled
                      className="w-full p-2.5 border border-gray-200  outline-none bg-gray-50 text-gray-500 pl-9"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <button
                  onClick={handleNameChange}
                  className="w-full bg-violet-400 hover:bg-violet-500 text-white px-4 py-2.5  transition-all duration-300 hover:shadow-md  flex items-center justify-center gap-2 mt-2 hover:cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="flex flex-col md:flex-row items-start justify-between max-w-3xl mx-auto pb-8 gap-6">
            <h2 className="text-xl uppercase font-medium tracking-wide text-gray-800 transform hover:scale-105 transition-transform">
              Update Password :
            </h2>
            <div className="w-full md:w-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-violet-600 transition-colors">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="xxxxxxxxxxx"
                      value={userData.currentPassword}
                      className="w-full p-2.5 border border-gray-200  outline-none focus:border-violet-400 transition-colors pl-9"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                    <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-violet-600 transition-colors">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={userData.newPassword}
                      className="w-full p-2.5 border border-gray-200 r outline-none focus:border-violet-400 transition-colors pl-9"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-violet-600 transition-colors">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={userData.confirmNewPassword}
                      className="w-full p-2.5 border border-gray-200 outline-none focus:border-violet-400 transition-colors pl-9"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          confirmNewPassword: e.target.value,
                        })
                      }
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <button
                  onClick={handlePasswordChange}
                  className="w-full bg-violet-400 hover:bg-violet-500  text-white px-4 py-2.5  transition-all duration-300 hover:shadow-md  flex items-center justify-center gap-2 hover:cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-around gap-6 my-6 pb-6">
            <h6 className="uppercase text-xl md:ml-18 font-semibold text-gray-700">
              Logout from all the devices:
            </h6>
            <button
              onClick={handleLogoutFromAllDevices}
              className="py-4 px-10 bg-red-600 hover:bg-red-400 text-white hover:cursor-pointer"
            >
              Logout From all the devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
