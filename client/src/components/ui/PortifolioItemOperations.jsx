import React, { useState } from "react";
import { Loader, Upload, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPortfolioItem,
  editPortfolioItem,
} from "../../features/actions/designerActions";
import toast from "react-hot-toast";

const PortfolioItemOperations = ({ editId, handleCloseModal }) => {
  const { portfolio, isPortfolioUpdating } = useSelector(
    (store) => store.designer
  );
  const currentItem = portfolio.find((item) => item._id === editId);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(
    currentItem
      ? { ...currentItem, files: [] }
      : { title: "", description: "", files: [] }
  );

  const handleAddPortfolioItem = async (e) => {
    e.preventDefault();
    const Form = new FormData();
    Form.append("title", formData.title);
    Form.append("description", formData.description);
    formData.files.forEach((file) => {
      Form.append("files", file);
    });

    const actionResult = await dispatch(addPortfolioItem(Form));
    if (addPortfolioItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      handleCloseModal();
    } else if (addPortfolioItem.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleEditPortfolioItem = async (e) => {
    e.preventDefault();
    const Form = new FormData();
    Form.append("title", formData.title);
    Form.append("description", formData.description);
    formData.files.forEach((file) => {
      Form.append("files", file);
    });

    const actionResult = await dispatch(
      editPortfolioItem({ id: editId, formData: Form })
    );
    if (editPortfolioItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      handleCloseModal();
    } else if (editPortfolioItem.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">
        {editId ? "Edit Portfolio Item" : "Add Portfolio Item"}
      </h2>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter description"
          />
        </div>

        {editId && currentItem?.images?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Current Images:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItem.images.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt="Portfolio item"
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Images
          </label>
          {editId && (
            <span className="text-sm  tracking-tight leading-tight text-red-700 font-serif">
              uploading new images are completly independent from the current
              images so you will lose the current images :{" "}
            </span>
          )}

          <label className="flex mt-2 flex-col items-center px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Click to upload new images
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  files: [...formData.files, ...Array.from(e.target.files)],
                })
              }
              className="hidden"
            />
          </label>
        </div>

        {formData.files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-600">
              Selected Files:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.files.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        files: formData.files.filter((_, i) => i !== index),
                      })
                    }
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          disabled={isPortfolioUpdating}
          type="submit"
          onClick={editId ? handleEditPortfolioItem : handleAddPortfolioItem}
          className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-600"
        >
          {isPortfolioUpdating && <Loader className="h-5 w-5 animate-spin" />}
          {editId ? "Update Portfolio Item" : "Add Portfolio Item"}
        </button>
      </form>
    </div>
  );
};

export default PortfolioItemOperations;
