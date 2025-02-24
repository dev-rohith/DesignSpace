import { useState } from "react";
import ImagesModal from "../../common/ImagesModal";

const ProjectImages = ({ afterPictures, beforePictures }) => {
  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
    type: '', 
  });

  const renderImages = (images, type) => {
    if (!images?.length) return null;
    
    const visibleImages = images.slice(0, 2);
    const remainingCount = images.length - 2;

    return (
      <div className="grid grid-cols-3 gap-2">
        {visibleImages.map((image, index) => (
          <button
            key={index}
            onClick={() =>
              setGalleryState({
                isOpen: true,
                images: images,
                currentIndex: index,
                type,
              })
            }
            className="relative aspect-square rounded-md overflow-hidden hover:opacity-90 transition-opacity w-full"
          >
            <img
              src={image.url}
              alt={`${type} Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        {remainingCount > 0 && (
          <button
            onClick={() =>
              setGalleryState({
                isOpen: true,
                images: images,
                currentIndex: 2,
                type,
              })
            }
            className="relative aspect-square rounded-md overflow-hidden bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <span className="text-sm font-medium text-gray-600">
              +{remainingCount}
            </span>
          </button>
        )}
      </div>
    );
  };

  if (!beforePictures?.length && !afterPictures?.length) return null;

  return (
    <div className="flex gap-4">
      {beforePictures?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-3 flex-1">
          <h3 className="text-sm font-medium mb-2">Before</h3>
          {renderImages(beforePictures, 'before')}
        </div>
      )}
      
      {afterPictures?.length > 0 && (
        <div className="bg-white rounded-lg shadow p-3 flex-1">
          <h3 className="text-sm font-medium mb-2">After</h3>
          {renderImages(afterPictures, 'after')}
        </div>
      )}

      {galleryState.isOpen && (
        <ImagesModal
          selectedImages={galleryState.images}
          currentImageIndex={galleryState.currentIndex}
          nextImage={() =>
            setGalleryState((prev) => ({
              ...prev,
              currentIndex: (prev.currentIndex + 1) % prev.images.length,
            }))
          }
          prevImage={() =>
            setGalleryState((prev) => ({
              ...prev,
              currentIndex:
                prev.currentIndex === 0
                  ? prev.images.length - 1
                  : prev.currentIndex - 1,
            }))
          }
          closeGallery={() =>
            setGalleryState((prev) => ({ ...prev, isOpen: false }))
          }
        />
      )}
    </div>
  );
};

export default ProjectImages;