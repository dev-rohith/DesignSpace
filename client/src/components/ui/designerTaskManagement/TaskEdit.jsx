import React, { useState, useEffect } from "react";
import { X, Save, Info, Calendar, Clock, Flag, User } from "lucide-react";
import InputField from "../../common/InputField";
import AddressSection from "../../common/AddressSection";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../features/actions/taskActions";
import toast from "react-hot-toast";
import ToggleButton from "../../common/ToggleButton";
import { format } from "date-fns";
import { TaskFormValidation } from "../../../utils/validation";

const TaskEdit = ({ initialFormData = {}, handleEditChange }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { isUpdating } = useSelector((store) => store.task);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = async () => {
    const errors = TaskFormValidation(formData);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }
    const actionResult = await dispatch(updateTask(formData));
    if (updateTask.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      handleEditChange();
    } else if (updateTask.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-end">
          <div className="flex gap-3">
            <button
              onClick={handleEditChange}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="font-medium">Cancel</span>
            </button>
            <button
              onClick={handleEdit}
              disabled={isUpdating}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="font-medium">Save Changes</span>
            </button>
          </div>
        </div>

        <h2 className="text-lg font-medium mb-4 text-gray-700 border-b pb-2">
          <span className="italic">Task</span> Details
        </h2>

        <div className="w-full">
          <div className="space-y-4">
            <InputField
              label="Task Name"
              icon={<Info className="w-5 h-5 text-violet-600 mr-2" />}
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={errors.name}
            />
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-violet-600 mr-2" />
                <span>Description</span>
              </label>
              <textarea
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className={`w-full px-4 py-2 border-2 rounded-md outline-none transition-colors ${
                  errors.description
                    ? "border-red-400 focus:border-red-500"
                    : "border-violet-200 focus:border-violet-500"
                }`}
                rows="3"
                placeholder="Enter task description..."
              ></textarea>
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Task Meta Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {/* Start Date */}
          <div className="flex items-start flex-col">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-gray-500 mr-3" />
              <p className="text-sm text-gray-500 italic">Start Date</p>
            </div>
            <div className="w-full">
              <input
                type="date"
                value={
                  formData.startDate
                    ? format(new Date(formData.startDate), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className={`w-full px-4 py-2 border-2 rounded-md outline-none transition-colors ${
                  errors.startDate
                    ? "border-red-400 focus:border-red-500"
                    : "border-violet-200 focus:border-violet-500"
                }`}
              />
              {errors.startDate && (
                <span className="text-sm text-red-500">{errors.startDate}</span>
              )}
            </div>
          </div>

          {/* Due Date */}
          <div className="flex items-start flex-col">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-gray-500 mr-3" />
              <p className="text-sm text-gray-500 italic">Due Date</p>
            </div>
            <div className="w-full">
              <input
                type="date"
                value={
                  formData.dueDate
                    ? format(new Date(formData.dueDate), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                className={`w-full px-4 py-2 border-2 rounded-md outline-none transition-colors ${
                  errors.dueDate
                    ? "border-red-400 focus:border-red-500"
                    : "border-violet-200 focus:border-violet-500"
                }`}
              />
              {errors.dueDate && (
                <span className="text-sm text-red-500">{errors.dueDate}</span>
              )}
            </div>
          </div>

          {/* Priority */}
          <div className="flex items-start flex-col">
            <div className="flex items-center mb-2">
              <Flag className="w-5 h-5 text-gray-500 mr-3" />
              <p className="text-sm text-gray-500 italic">Priority</p>
            </div>
            <select
              value={formData.priority || "medium"}
              onChange={(e) => handleInputChange("priority", e.target.value)}
              className="w-full px-4 py-2 border-2 border-violet-200 focus:border-violet-500 rounded-md outline-none transition-colors"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-start flex-col">
            <div className="flex items-center mb-2">
              <User className="w-5 h-5 text-gray-500 mr-3" />
              <p className="text-sm text-gray-500 italic">Visibility</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <ToggleButton
                value={formData.isVisibleToClient}
                onChange={(newValue) =>
                  handleInputChange("isVisibleToClient", newValue)
                }
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {formData.isVisibleToClient
                  ? "Visible to client"
                  : "Internal only"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-medium mb-4 text-gray-700 border-b pb-2">
          <span className="italic">Location</span> Information
        </h2>

        <AddressSection
          address={formData.address}
          handleInputChange={handleInputChange}
          isEditing={true}
          error={errors.address}
        />
      </div>
    </div>
  );
};

export default TaskEdit;
