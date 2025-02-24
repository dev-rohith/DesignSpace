import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssociateTask } from "../../features/actions/taskActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { format } from "date-fns";
import ImagesModal from "../../components/common/ImagesModal";

const MyTaskDetails = () => {
  const { currentTask, isUpdating, isLoading } = useSelector((store) => store.task);
  const { task_id } = useParams();
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getAssociateTask(task_id));
      if (getAssociateTask.rejected.match(actionResult)) {
        toast.error(actionResult.payload);
      }
    })();
  }, [dispatch, task_id]);

  // Destructure task data after loading
  const {
    name,
    description,
    designer,
    status,
    address,
    priority,
    startDate,
    dueDate,
    workUpdates = [],
  } = currentTask || {};

  const openGallery = (images, startIndex = 0) => {
    setSelectedImages(images);
    setCurrentImageIndex(startIndex);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-500 border-solid"></div>
      </div>
    );
  }

  if (!currentTask) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-gray-700">Task not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto w-screen mx-auto px-4 py-8">
      {/* Task Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            <p className="mt-2 opacity-90">{description}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === "completed" ? "bg-green-500" : 
              status === "inprogress" ? "bg-yellow-500" : 
              "bg-blue-500"
            }`}>
              {status?.toUpperCase()}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              priority === "high" ? "bg-red-500" : 
              priority === "medium" ? "bg-orange-500" : 
              "bg-blue-400"
            }`}>
              Priority: {priority?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Task Details and Designer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Task Details */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-violet-800 border-b pb-2">Task Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{startDate ? format(new Date(startDate), 'MMM dd, yyyy') : 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-medium">{dueDate ? format(new Date(dueDate), 'MMM dd, yyyy') : 'Not set'}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">
              {address?.street}, {address?.city}, {address?.state}, {address?.country} {address?.postal_code}
            </p>
          </div>
        </div>

        {/* Right Column - Designer Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-violet-800 border-b pb-2">Designer</h2>
          <div className="flex items-center gap-4">
            <img 
              src={designer?.profilePicture} 
              alt={`${designer?.firstName} ${designer?.lastName}`} 
              className="w-16 h-16 rounded-full object-cover border-2 border-violet-300"
            />
            <div>
              <p className="font-bold text-lg">{designer?.firstName} {designer?.lastName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Updates */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-violet-800 border-b pb-2">Work Updates</h2>
        
        {workUpdates.length === 0 ? (
          <p className="text-gray-500 italic">No work updates yet</p>
        ) : (
          <div className="space-y-8">
            {workUpdates.map((update, index) => (
              <div key={update._id} className="border-l-4 border-violet-400 pl-4 pb-2">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold text-violet-700">Update #{workUpdates.length - index}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(update.timestamp), 'MMM dd, yyyy - h:mm a')}
                  </p>
                </div>
                <p className="mb-4">{update.description}</p>
                
                {/* Images Grid */}
                {update.images && update.images.length > 0 && (
                  <div className="grid grid-cols-6 my-3">
                    {update.images.slice(0, 3).map((image, imgIndex) => (
                      <div 
                        key={image._id}
                        onClick={() => openGallery(update.images, imgIndex)}
                        className=" h-50 w-50 cursor-pointer rounded-lg overflow-hidden relative group"
                      >
                        <img 
                          src={image.url} 
                          alt={`Update ${imgIndex + 1}`}
                          className=" h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-violet-700 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                      </div>
                    ))}
                    {update.images.length > 3 && (
                      <div 
                        className="cursor-pointer rounded-lg overflow-hidden relative flex items-center justify-center bg-violet-100 h-24"
                        onClick={() => openGallery(update.images, 3)}
                      >
                        <span className="text-violet-700 font-bold text-lg">+{update.images.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <ImagesModal
          selectedImages={selectedImages}
          currentImageIndex={currentImageIndex}
          nextImage={nextImage}
          prevImage={prevImage}
          closeGallery={closeGallery}
        />
      )}
    </div>
  );
};

export default MyTaskDetails;