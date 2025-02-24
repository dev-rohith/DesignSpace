import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ImagesModal from "../common/ImagesModal";

const PortfolioGallery = ({ data }) => {
  const [selectedImages, setSelectedImages] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (images) => {
    setSelectedImages(images);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedImages(null);
  };

  const nextImage = () => {
    if (selectedImages) {
      setCurrentImageIndex((prev) =>
        prev === selectedImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="container mx-auto px-4 pt-7 bg-gray-50 border-b">
      {data.map((designer) => (
        <div key={designer._id} className="mb-10 ">
          <div className="flex items-center gap-4 mb-6 p-2 bg-opacity-60 bg-gray-100 backdrop-blur-md border-2 border-gray-400 rounded-xl w-fit shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={designer.user.profilePicture}
              alt={`${designer.user.firstName} ${designer.user.lastName}`}
              className="w-16 h-16 rounded-full border-4 border-violet-400 object-cover shadow-md"
            />
            <div className="pr-4 text-gray-800">
              <h2 className="text-lg font-semibold uppercase text-violet-900">
                {designer.user.firstName} {designer.user.lastName}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designer.portfolio.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-4">
                  {item.images.slice(0, 4).map((image, index) => (
                    <div
                      key={image._id}
                      className="relative cursor-pointer group"
                      onClick={() => openGallery(item.images)}
                    >
                      <img
                        src={image.url}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      {index === 3 && item.images.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                          <span className="text-white text-lg">
                            +{item.images.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedImages && (
        <ImagesModal
          prevImage={prevImage}
          nextImage={nextImage}
          closeGallery={closeGallery}
          currentImageIndex={currentImageIndex}
          selectedImages={selectedImages}
        />
      )}
    </div>
  );
};

export default PortfolioGallery;
