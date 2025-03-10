import React, { useState } from "react";
import ImagesModal from "../common/ImagesModal";
import { ChevronRight, Camera, ExternalLink, Eye } from "lucide-react";

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

  if(!data.length > 0) return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4  pt-6">
        <h5 className="text-2xl md:text-3xl font-bold ml-2 underline underline-offset-3  decoration-pink-400 mb-5 text-gray-800">
          <span className="bg-clip-text font-raleway text-transparent bg-gradient-to-r from-violet-500 to-indigo-400">
            Featured Designers :
          </span>
        </h5>
        <p className="text-gray-500">No designers found.</p>
      </div>
    </div>
  )

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4  pt-6">
        <h5 className="text-2xl md:text-3xl font-bold ml-2 underline underline-offset-3  decoration-pink-400 mb-5 text-gray-800">
          <span className="bg-clip-text font-raleway text-transparent bg-gradient-to-r from-violet-500 to-indigo-400">
            Featured Designers :
          </span>
        </h5>

        <div className="space-y-16">
          {data.map((designer) => (
            <div key={designer._id} className="border-b border-gray-200 pb-12">
              {/* designer */}
              <div className="flex items-center gap-3 md:gap-6 ml-2 ">
                <div className="relative">
                  <img
                    src={designer.user.profilePicture}
                    alt={`${designer.user.firstName} ${designer.user.lastName}`}
                    className="w-10 h-10 md:w-15 md:h-15 rounded-full md:rounded-lg p-1 md:p-0 object-cover  shadow-fuchsia-500/50 shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
                <div >
                  <h2 className="font-bold md:text-lg  text-gray-800 border-b font-sansita first-letter:uppercase">
                    {designer.user.firstName} {designer.user.lastName}
                  </h2>
                  <p className="text-gray-600 font-medium text-xs mt-2 font-raleway md:text-sm">
                    Top <b>{designer.portfolio.length}</b> Projects
                  </p>
                </div>
              </div>

              {/*portfolio */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {designer.portfolio.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    {item.images.length > 0 && (
                      <div className="relative h-48 overflow-hidden group ">
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={() => {
                                openGallery(item.images);
                              }}
                              className="flex items-center gap-2  text-white border border-gray-200  px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                              View Gallery ({item.images.length})
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 px-4">
                      <h3 className="text-lg font-raleway font-bold text-gray-800 mb-2 first-letter:uppercase">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm -mt-2 h-14 line-clamp-3">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 ">
                        {item.tags &&
                          item.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>

                      {item.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {item.images.slice(1, 5).map((image, index) => (
                            <div
                              key={image._id}
                              className="flex-shrink-0 cursor-pointer"
                              onClick={() => {
                                openGallery(item.images);
                                setCurrentImageIndex(index + 1);
                              }}
                            >
                              <img
                                src={image.url}
                                alt={`Preview ${index + 1}`}
                                className="w-16 h-16 object-cover rounded-md border border-gray-200"
                              />
                            </div>
                          ))}
                          {item.images.length > 5 && (
                            <div
                              className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 cursor-pointer"
                              onClick={() => {
                                openGallery(item.images);
                              }}
                            >
                              +{item.images.length - 5}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
       {/* image modal */}
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
