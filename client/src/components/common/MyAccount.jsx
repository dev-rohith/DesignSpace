import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../layout/Sidebar";
import { useState } from "react";
import axiosInstance from "../../apis/axiosIntance";
import toast from "react-hot-toast";
import { Camera, KeyRound, Lock, Mail, Save, User } from "lucide-react";
import { createPortal } from "react-dom";
import { updateUser } from "../../features/userApi";

const MyAccount = () => {
  const { user } = useSelector((store) => store.auth);
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [file, setFile] = useState(null)
  const [isSaving, setIsSaving] = useState(false);
  const [onPicModal, setOnPickModal] = useState(false);

  const dispatch = useDispatch();

  const handleProfileChange = async () => {
    if(!file) return
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
  };

  const handleNameChange = async () => {
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      {onPicModal && <PhotopicModal />}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-8 py-6 md:py-10 h-full">
          {/* Profile Picture Section */}
          <div className="flex  items-center justify-between max-w-3xl mx-auto mb-8 gap-6">
            <h2 className="text-xl uppercase font-medium tracking-wide text-gray-800 transform hover:scale-105 transition-transform">
              Profile Picture
            </h2>
            <div className="relative group">
              <div className="absolute inset-0 bg-violet-200 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-gray-100 rounded-3xl p-4 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                <img
                  src={user.profilePicture}
                  alt="my-profile"
                  className="w-32 h-32 md:w-42 md:h-42 rounded-full border-2 border-gray-200 hover:border-violet-300 transition-colors"
                />
                <div className="absolute bottom-6 right-6 p-2 bg-white/80 backdrop-blur-sm rounded-full transform hover:scale-110 transition-transform cursor-pointer">
                  <Camera
                    className="w-5 h-5 text-gray-600"
                    onClick={() => {
                      setOnPickModal(!onPicModal);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Update Profile Section */}
          <div className="flex flex-col md:flex-row items-start justify-between max-w-3xl mx-auto mb-8 gap-6">
            <h2 className="text-xl uppercase font-medium tracking-wide text-gray-800 transform hover:scale-105 transition-transform">
              Update Profile Details
            </h2>
            <div className="w-full md:w-100  bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-violet-600 transition-colors">
                    FirstName *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={userData.firstName}
                      className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-violet-400 transition-colors pl-9"
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
                      className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-violet-400 transition-colors pl-9"
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
                      className="w-full p-2.5 border border-gray-200 rounded-lg outline-none bg-gray-50 text-gray-500 pl-9"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                </div>

                <button
                  onClick={handleNameChange}
                  disabled={isSaving}
                  className="w-full bg-violet-400 hover:bg-violet-500 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-md disabled:hover:shadow-none flex items-center justify-center gap-2 mt-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="flex flex-col md:flex-row items-start justify-between max-w-3xl mx-auto pb-8 gap-6">
            <h2 className="text-xl uppercase font-medium tracking-wide text-gray-800 transform hover:scale-105 transition-transform">
              Update Password
            </h2>
            <div className="w-full md:w-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-violet-600 transition-colors">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={userData.currentPassword}
                      className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-violet-400 transition-colors pl-9"
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
                      className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-violet-400 transition-colors pl-9"
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
                      className="w-full p-2.5 border border-gray-200 rounded-lg outline-none focus:border-violet-400 transition-colors pl-9"
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
                  disabled={isSaving}
                  className="w-full bg-violet-400 hover:bg-violet-500 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-md disabled:hover:shadow-none flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Update Password"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default MyAccount;
