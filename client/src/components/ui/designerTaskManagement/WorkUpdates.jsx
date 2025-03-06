import { format } from "date-fns";
import { useState } from "react";
import ImagesModal from "../../common/ImagesModal";

const WorkUpdates = ({ workUpdates }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

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

  return (
    <div className="bg-white max-h-[485px] rounded-lg shadow-lg p-6  w-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Work Update History</h2>

      {workUpdates.length === 0 ? (
        <p className="text-gray-500 italic text-center">No work updates available.</p>
      ) : (
        <div className="flex flex-col overflow-y-auto h-96">
          {workUpdates.map((update, index) => (
            <div
              key={update._id}
              className="border-x-4 border-y-1 border-violet-500 bg-gray-50 p-5 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold border-b text-violet-700">Update #{workUpdates.length - index}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(update.timestamp), "PPP | hh:mm a")}
                </p>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">{update.description}</p>

              {update.images && update.images.length > 0 && (
                <div className="grid grid-cols-4 mt-3">
                  {update.images.slice(0, 3).map((image, imgIndex) => (
                    <div
                      key={image._id}
                      onClick={() => openGallery(update.images, imgIndex)}
                      className="cursor-pointer rounded-lg overflow-hidden relative group h-20 w-28 border border-gray-300"
                    >
                      <img
                        src={image.url}
                        alt="Work update"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                  {update.images.length > 3 && (
                    <div
                      className="cursor-pointer rounded-lg flex items-center justify-center bg-gray-200 h-20 w-28 border border-gray-300"
                      onClick={() => openGallery(update.images, 3)}
                    >
                      <span className="text-gray-600 font-semibold text-sm">
                        +{update.images.length - 3} More
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

export default WorkUpdates;
