import { useState } from "react";
import { Calendar, AlertCircle, Flag } from "lucide-react";
import InputField from "../../../components/common/InputField";
import { AddressSection } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { TaskFormValidation } from "../../../utils/taskValidataions";
import { createTask } from "../../../features/actions/taskActions";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  description: "",
  priority: "low",
  isVisibleToClient: true,
  startDate: "",
  dueDate: "",
  address: {
    street: "",
    house_number: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  },
};

const CreateTask = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { isUpdating } = useSelector((store) => store.task);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = TaskFormValidation(formData);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }
    const actionResult = await dispatch(createTask(formData));
    if (createTask.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      setFormData(initialState);
    } else if (createTask.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen overflow-y-auto w-screen">
      <div className="max-w-7xl md:mt-8 mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-4 md:p-6">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-6"
          >
            <div className="flex flex-col md:gap-24 w-full lg:w-1/2 lg:pr-6 lg:border-r-2 border-gray-100">
              <div className="flex items-center py-1 rounded-4xl justify-center bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600">
                <AlertCircle className="w-4 h-4 mr-1 text-white" />
                <h2 className="text-lg font-semibold text-gray-50">
                  Task Details
                </h2>
              </div>

              <div className="space-y-6">
                <InputField
                  label="Task Name"
                  icon={<Flag className="w-5 h-5 text-violet-600 mr-2" />}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  error={errors.name}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField
                    label="Start Date"
                    icon={<Calendar className="w-5 h-5 text-violet-600 mr-2" />}
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    error={errors.startDate}
                  />

                  <InputField
                    label="Due Date"
                    icon={<Calendar className="w-5 h-5 text-violet-600 mr-2" />}
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      handleInputChange("dueDate", e.target.value)
                    }
                    error={errors.dueDate}
                  />
                </div>

                <div className="space-y-4">
                  <textarea
                    placeholder="Task Description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="w-full px-4 py-2 border-2 border-violet-200 rounded-md focus:border-violet-500 outline-none transition-colors resize-none"
                    rows={4}
                  />

                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      handleInputChange("priority", e.target.value)
                    }
                    className="w-full px-4 py-2 border-2 border-violet-200 rounded-md focus:border-violet-500 outline-none transition-colors bg-white"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium/Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Priority</option>
                  </select>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isVisibleToClient}
                      onChange={(e) =>
                        handleInputChange("isVisibleToClient", e.target.checked)
                      }
                      className="w-4 h-4 text-violet-600 rounded border-2 border-violet-200 focus:ring-violet-500 focus:ring-2 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">
                      Visible to Client
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 w-full lg:w-1/2">
              <div className="flex-1 overflow-y-auto">
                <AddressSection
                  formData={formData}
                  handleInputChange={handleInputChange}
                  error={errors}
                />
              </div>
              <div className="mt-auto pt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full py-2 px-4 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Creating..." : "Create Task"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
