import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="container mx-auto px-4 py-8 bg-violet-200">
      {/* Designer's works */}
      {data.map((designer) => (
        <div key={designer._id} className="mb-10">
          {/* Designer Info */}
          <div className="flex items-center gap-2 mb-6 ">
            <img
              src={designer.user.profilePicture}
              alt={`${designer.user.firstName} ${designer.user.lastName}`}
              className="w-14 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg  font-bold uppercase">
                {designer.user.firstName} {designer.user.lastName}
              </h2>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designer.portfolio.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>

                {/* Thumbnail Grid */}
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

      {/* Image Gallery Modal */}
      {selectedImages && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={selectedImages[currentImageIndex].url}
            alt={`Gallery image ${currentImageIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 text-white">
            {currentImageIndex + 1} / {selectedImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;
