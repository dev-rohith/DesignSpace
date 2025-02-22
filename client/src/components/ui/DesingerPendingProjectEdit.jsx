import { BookOpenText, Calendar, DollarSign, FileText } from "lucide-react";
import InputField from "../common/InputField";
import AddressSection from "../common/AddressSection";

const DesingerPendingProjectEdit = ({
  handleInputChange,
  isEditing,
  formData,
  errors,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <InputField
            label="Project Title"
            icon={<FileText className="text-violet-500" />}
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            disabled={!isEditing}
            error={errors.title}
          />
          <InputField
            label="Minimum Days"
            icon={<Calendar className="text-violet-500" />}
            value={formData.minimumDays}
            onChange={(e) => handleInputChange("minimumDays", e.target.value)}
            disabled={!isEditing}
            type="number"
            error={errors.minimumDays}
          />
          <InputField
            label="Budget"
            icon={<DollarSign className="text-violet-500" />}
            value={formData.budget}
            onChange={(e) => handleInputChange("budget", e.target.value)}
            disabled={!isEditing}
            type="number"
            error={errors.budget}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center mb-2">
            <BookOpenText className="text-violet-500" />
            <label htmlFor="description" className="text-gray-600">
              Description
            </label>
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            disabled={!isEditing}
            type="textarea"
            className="outline-2 h-full outline-gray-300 rounded p-2 resize-none focus:outline-violet-500"
          ></textarea>
        </div>
      </div>

      {/* Address Section */}
      <div className="pb-4">
        <AddressSection
          formData={formData}
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          error={errors?.address}
        />
      </div>
    </>
  );
};
export default DesingerPendingProjectEdit;
