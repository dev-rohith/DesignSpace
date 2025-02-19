import React, { useState, useEffect } from "react";
import { Edit2, ImageIcon, SplineIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const DesignerPortfolioItem = ({
  _id,
  images = [],
  date,
  description,
  title,
  editItem,
  deleteItem,
}) => {
  const { isPortfolioUpdating } = useSelector((store) => store.designer);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const formattedDate = date ? format(new Date(date), "MMM dd, yyyy") : "N/A";

  return (
    <div className="bg-white rounded-xl  shadow-md overflow-hidden group mx-2 my-4">
      <div className="relative h-48 bg-gray-100">
        {images.length > 0 ? (
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`${title} - ${index + 1}`}
                className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                  currentImageIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}

        <div className="absolute inset-0 group-hover:bg-black/20 transition-all">
          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              disabled={isPortfolioUpdating}
              onClick={() => editItem(_id)}
              className="p-2 bg-white rounded-full hover:text-violet-600 cursor-pointer disabled:bg-gray-400 disabled:text-gray-700"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              disabled={isPortfolioUpdating}
              onClick={() => deleteItem(_id)}
              className="p-2 bg-white rounded-full hover:text-red-600 cursor-pointer disabled:bg-gray-400 disabled:text-gray-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <SplineIcon className="text-white" />
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {images.length > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 rounded-full text-xs">
            {images.length} images
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium capitalize text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>
    </div>
  );
};

export default DesignerPortfolioItem;
