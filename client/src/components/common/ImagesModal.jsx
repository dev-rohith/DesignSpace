import { ChevronLeft, ChevronRight, X } from "lucide-react"

const ImagesModal = ({selectedImages, children , currentImageIndex, nextImage, prevImage, closeGallery}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
    <button
      onClick={closeGallery}
      className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
    >
      <X size={24} />
    </button>

    <button
      onClick={prevImage}
      className="absolute left-4 text-white hover:text-gray-300 cursor-pointer "
    >
      <ChevronLeft size={24} />
    </button>
   <div>

    <img
      src={selectedImages[currentImageIndex].url}
      alt={`Gallery image ${currentImageIndex + 1}`}
      className="max-h-[90vh] max-w-[90vw] object-contain"
      />
      {children}
      </div>

    <button
      onClick={nextImage}
      className="absolute right-4 text-white hover:text-gray-300 cursor-pointer "
    >
      <ChevronRight size={24} />
    </button>

    <div className="absolute bottom-4 text-white">
      {currentImageIndex + 1} / {selectedImages.length}
    </div>
  </div>
  )
}
export default ImagesModal