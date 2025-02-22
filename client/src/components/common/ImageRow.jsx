import { Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const ImageRow = ({ title, images, onImageClick, onUpload, name }) => {
  const { isUpdating } = useSelector((store) => store.project);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleUpload = async () => {
    const result = await onUpload(fileInputRef.current.files[0]);
    if (result) {
      setPreviewImage(null);
    }
  };

  return (
    <div className="mb-8">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-red-500 animate-bounce delay-600 text-sm mb-2 tracking-tight">You can upload as many images as you want but if you want to delete uploaded image click on the image and you will find out delete button there</p>
      <div className="flex flex-nowrap gap-2 pb-2 overflow-x-auto md:overflow-x-hidden md:flex-wrap">
        {images.slice(0, 3).map((image, index) => (
          <div
            key={image._id}
            className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => onImageClick(images, index, name)}
          >
            <img
              src={image.url}
              alt={`${title} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {images.length > 3 && (
          <div
            className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative rounded-lg cursor-pointer overflow-hidden"
            onClick={() => onImageClick(images, 3)}
          >
            <img
              src={images[2].url}
              alt="More images"
              className="w-full h-full object-cover blur-sm"
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl font-semibold text-white drop-shadow-lg">
              +{images.length - 2}
            </span>
          </div>
        )}
        <div className="text-center relative">
          <div
            onClick={() => fileInputRef.current.click()}
            className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 bg-gray-50"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <>
                <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500" />
                <span className="mt-2 text-xs sm:text-sm text-gray-500">
                  Add New
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {previewImage && (
            <button
              onClick={handleUpload}
              className="bg-green-500 w-45 rounded-lg mt-2 py-0.5 text-white ring-2 ring-green-500 ring-offset-2 cursor-pointer hover:bg-green-700"
            >
              {isUpdating ? "Adding..." : " Add Image Item"}
            </button>
          )}
          {previewImage && (
            <X
              onClick={() => setPreviewImage(null)}
              className="absolute z-50 top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7  text-white hover:rotate-180 duration-200 hover:bg-red-500 hover:rounded-full cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageRow;
