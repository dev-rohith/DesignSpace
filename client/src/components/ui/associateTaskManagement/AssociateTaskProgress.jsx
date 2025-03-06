import { format } from "date-fns";
import { useState } from "react";
import ImagesModal from "../../common/ImagesModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskProgress } from "../../../features/actions/taskActions";
import toast from "react-hot-toast";

const AssociateTaskProgress = ({ workUpdates, task_id:taskId, status }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const {isUpdating} = useSelector(store=>store.task)
  const dispatch = useDispatch()

  const openGallery = (images, startIndex = 0) => {
    setSelectedImages(images);
    setCurrentImageIndex(startIndex);
    setShowGallery(true);
  };

  const handleDeleteTaskUpdate = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this work update?"
    );
    if (confirmDelete) {
     const actionResult = await dispatch(deleteTaskProgress({ id: taskId, itemId }))
     if(deleteTaskProgress.fulfilled.match(actionResult)){
      toast.success(actionResult.payload.message)
    }else if(deleteTaskProgress.rejected.match(actionResult)){
      toast.error(actionResult.payload.message)
    }
    }
  };

  

  const closeGallery = () => {
    setShowGallery(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + selectedImages.length) % selectedImages.length
    );
  };

  return (
    <div className="bg-white w-xl rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 text-violet-800 border-b pb-2">
        Task Progress Updates
      </h2>

      {workUpdates.length === 0 ? (
        <p className="text-gray-500 italic">No work updates yet</p>
      ) : (
        <div className="space-y-8">
          {workUpdates.map((update, index) => (
            <div
              key={update._id}
              className="border-l-4 border-violet-400 pl-4 pb-5 relative border-y"
            >
              {status === 'inprogress' && <button
                onClick={() => handleDeleteTaskUpdate(update._id)}
                disabled={isUpdating}
              className="bg-red-500 text-white  px-2 rounded-xl text-sm italic absolute bottom-1 right-0 hover:bg-red-600 hover:scale-110 transition-all cursor-pointer  hover:ring-2 hover:ring-red-500 hover:ring-offset-2 disabled:bg-gray-500 disabled:cursor-not-allowed">
                Delete
              </button>}
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-violet-700">
                  Task #{workUpdates.length - index} Completed
                </p>
                <p className="text-sm text-gray-500">
                  {format(
                    new Date(update.timestamp),
                    "EEEE, MMM dd, yyyy | hh:mm a"
                  )}
                </p>
              </div>
              <p className="mb-4">{update.description}</p>
                        {/* images */}
              {update.images && update.images.length > 0 && (
                <div className="grid grid-cols-4 my-3">
                  {update.images.slice(0, 3).map((image, imgIndex) => (
                    <div
                      key={image._id}
                      onClick={() => openGallery(update.images, imgIndex)}
                      className="h-24 w-30 cursor-pointer rounded-lg overflow-hidden relative group"
                    >
                      <img
                        src={image.url}
                        alt={`Update ${imgIndex + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                  {update.images.length > 2 && (
                    <div
                      className="cursor-pointer rounded-lg overflow-hidden relative flex items-center justify-center bg-violet-100 h-24 w-30"
                      onClick={() => openGallery(update.images, 2)}
                    >
                      <span className="text-violet-700 font-bold text-lg">
                        +{update.images.length - 2}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showGallery && (
        <ImagesModal
          selectedImages={selectedImages}
          currentImageIndex={currentImageIndex}
          closeGallery={closeGallery}
          prevImage={prevImage}
          nextImage={nextImage}
        />
      )}
    </div>
  );
};

export default AssociateTaskProgress;
