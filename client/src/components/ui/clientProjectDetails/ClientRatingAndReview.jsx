import React, { useState } from "react";
import { Star } from "lucide-react";
import { reviewProject } from "../../../features/actions/projectActions";

const ClientRatingAndReview = ({ designerPicture, handleReviewSubmit }) => {
  const [formData, setFormData] = useState({
    projectReview: "",
    designerRating: 0,
    designerReview: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.projectReview.length < 10) {
      newErrors.projectReview = "Project review must be at least 10 characters";
    }
    if (formData.designerRating === 0) {
      newErrors.designerRating = "Please select a rating";
    }
    if (formData.designerReview.length < 10) {
      newErrors.designerReview =
        "Designer review must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (!errors) return;
    handleReviewSubmit(formData)
  };

  return (
    <div className=" p-6  shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-violet-800">
        Project Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold text-violet-700 mb-2">
            Overall Project Review
          </label>
          <textarea
            className={`w-full p-3 border  focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none min-h-[100px] ${
              errors.projectReview ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Share your thoughts about the project..."
            value={formData.projectReview}
            onChange={(e) =>
              setFormData({ ...formData, projectReview: e.target.value })
            }
          />
          {errors.projectReview && (
            <p className="mt-1 text-sm text-red-500">{errors.projectReview}</p>
          )}
        </div>

        <div className="flex gap-4 items-center ">
          <div>
            <img
              src={designerPicture}
              alt="designer"
              className="w-12 h-14 object-cover"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-violet-700 mb-2">
              Rate the Designer
            </label>
            <div className="flex space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                    formData.designerRating >= star
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "stroke-gray-400 hover:stroke-yellow-400"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, designerRating: star })
                  }
                />
              ))}
            </div>
          </div>
          {errors.designerRating && (
            <p className="mt-1 text-sm text-red-500">{errors.designerRating}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-semibold text-violet-700 mb-2">
            Designer Review
          </label>
          <textarea
            className={`w-full p-3 border  focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none min-h-[100px] ${
              errors.designerReview ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Share your experience working with the designer..."
            value={formData.designerReview}
            onChange={(e) =>
              setFormData({ ...formData, designerReview: e.target.value })
            }
          />
          {errors.designerReview && (
            <p className="mt-1 text-sm text-red-500">{errors.designerReview}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r  from-violet-600 to-purple-600 text-white  hover:from-violet-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ClientRatingAndReview;
