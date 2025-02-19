import { Plus, SearchCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Search from "../common/Search";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../apis/axiosIntance";
import toast from "react-hot-toast";
import { addTopDesingerItem } from "../../features/actions/adminactions";
import { useDispatch } from "react-redux";

const AddTopDesignerItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designers, setDesingers] = useState([]);
  const [selectedDesinger, setSelectedDesinger] = useState(null);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(
        `user/designers?${searchParams.toString()}`
      );
      setDesingers(response.data);
    })();
  }, [searchParams]);

  const handleAddTopDesigner = async () => {
    if (selectedDesinger) {
      const actionResult = await dispatch(addTopDesingerItem(selectedDesinger));
      if (addTopDesingerItem.fulfilled.match(actionResult)) {
        toast.success(actionResult.payload.message);
        setSelectedDesinger(null);
      } else if (addTopDesingerItem.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
        setSelectedDesinger(null);
      }
    }
  };

  const getDesingerAbout = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/designer/profile/${id}?select=aboutMe`
      );
      setSelectedDesinger({
        name: response.data.user.firstName + " " + response.data.user.lastName,
        profilePicture: response.data.user.profilePicture,
        aboutMe: response.data.aboutMe,
      });
    } catch (error) {
      toast(
        error.response.data.message || "Error while fetching designer details"
      );
    }
  };

  return (
    <>
      {!selectedDesinger && (
        <div
          onClick={() => setIsModalOpen(true)}
          className="border-2 h-48 mt-5 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors group bg-gray-50 overflow-hidden"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-600">
            <Plus className="w-8 h-8" />
            <span className="text-sm font-medium">Add New Designer</span>
          </div>
        </div>
      )}

      {selectedDesinger && (
        <div className="w-70 h-45 mt-6 p-4 flex items-center bg-gray-100 rounded-2xl border border-gray-400 shadow-lg hover:shadow-2xl transition-shadow">
          <img
            src={selectedDesinger.profilePicture}
            alt={selectedDesinger.name}
            className="w-20 h-20 rounded-full border-4 border-gray-500 shadow-lg object-cover"
          />
          <div className="ml-4 flex-1">
            <h4 className="text-lg font-bold text-gray-900 truncate">
              {selectedDesinger.name}
            </h4>
            <p className="text-gray-700 text-sm leading-snug line-clamp-2">
              {selectedDesinger.aboutMe}
            </p>
            <button
              onClick={handleAddTopDesigner}
              className="mt-2 px-4 py-1 bg-violet-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-600 transition cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <div className="flex items-center gap-3 p- rounded-xl ">
            <SearchCheck className="text-violet-700" />
            <Search className="h-8 text-sm " placeholder="Search designers" />
          </div>
        }
      >
        <div>
          {designers.map((designer) => (
            <div
              key={designer._id}
              className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={designer.profilePicture}
                alt={designer.firstName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {designer.firstName} {designer.lastName}
                </span>
                <span className="text-xs text-gray-500">{designer.status}</span>
              </div>
              <button
                onClick={() => {
                  getDesingerAbout(designer._id);
                  setIsModalOpen(false);
                }}
                className="ml-auto text-sm font-medium text-violet-700 cursor-pointer"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default AddTopDesignerItem;
