import React from "react";
import {
  Briefcase,
  Building,
  FileText,
  Globe,
  Hash,
  Home,
  MapPin,
} from "lucide-react";
import InputField from "../common/InputField";
import ToggleButton from "../common/ToggleButton";
import AddressSection from "../common/AddressSection";
import MultiInput from "../common/MultiInput";

const AssociateProfileBody = ({
  formData,
  handleInputChange,
  isEditing,
  handleAddSkill,
  handleRemoveSkill,
  errors = {},
}) => {
  return (
    <div className="space-y-8">
      {/* Availability Toggle */}
      <div className="flex items-center gap-3 animate-fade-up animate-delay-100">
      {errors.availability && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <span className="flex items-center gap-1 text-sm text-red-500">
            {errors.availability}
          </span>
        </div>
        )}
        <ToggleButton
          value={formData.availability}
          onChange={(value) => handleInputChange("availability", value)}
          disabled={!isEditing}
        />
        <span
          className={`text-sm font-medium ${
            formData.availability ? "text-violet-600" : "text-gray-500"
          }`}
        >
          {formData.availability
            ? "Available for work"
            : "Not available for work"}
        </span>
      </div>

      {/* Skills Section */}
      <div className="animate-fade-up animate-delay-200">
        <MultiInput
          title="Skills"
          icon={Briefcase}
          items={formData.skills || []}
          field="skills"
          isEditing={isEditing}
          onAddInput={handleAddSkill}
          onRemoveInput={handleRemoveSkill}
          errors={errors}
        />
      </div>

      {/* Bio Section */}
      <div className="animate-fade-up animate-delay-300">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-violet-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-violet-500" />
            Bio
          </h2>
          <InputField
            value={formData.bio || ""}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            disabled={!isEditing}
            error={errors?.bio}
            placeholder={isEditing ? "Enter your bio..." : "No bio provided"}
          />
        </div>
      </div>

      {/* Address Section */}

      <AddressSection
        address={formData.address}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        error={errors.address}
      />
    </div>
  );
};

export default AssociateProfileBody;
