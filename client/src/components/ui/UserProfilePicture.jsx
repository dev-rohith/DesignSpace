import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const UserProfilePicture = ({ profilePicture, handleProfileChange }) => {
  const [preview, setPreview] = useState(null);
  const changedImage = useRef(profilePicture);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const newPic =  URL.createObjectURL(file);
      setPreview(newPic);
      changedImage.current = file;
    } else {
      toast.error("Please select an image file");
    }
  };

  const handleImageSubmit = () => {
    handleProfileChange(changedImage.current);
    setPreview(null);
  };

  const imageUrl = preview || profilePicture;

  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto mb-8 gap-6">
      <h2 className="text-xl uppercase font-medium tracking-wide text-gray-800 transform hover:scale-105 transition-transform">
        Profile Picture
      </h2>
      <div className="relative group">
        <div className="absolute inset-0 bg-violet-200 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative bg-gray-100 rounded-3xl p-4 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <img
            src={imageUrl}
            alt="Profile preview"
            className="w-32 h-32 md:w-42 md:h-42 rounded-full border-2 border-gray-200 hover:border-violet-300 transition-colors object-cover"
          />
          <label className="absolute bottom-6 right-6 p-2  bg-white/80 backdrop-blur-sm rounded-full  transform hover:scale-110 transition-transform">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 "
              onChange={handleFileChange}
              accept="image/*"
            />
            <Camera className="w-5 h-5 text-gray-600" />
          </label>
          {preview && (
            <button
              onClick={handleImageSubmit}
              className=" absolute top-43 left-20 md:top-46 md:left-40 bg-violet-300 rounded-2xl px-2 py-1 text-white font-mono border-2 border-violet-500 hover:border-none cursor-pointer hover:transform hover:scale-120 hover:font-extralight"
            >
              Change
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePicture;
