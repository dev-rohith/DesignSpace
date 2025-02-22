import {
  Briefcase,
  Building,
  Clock,
  Code,
  DollarSign,
  Languages,
  Layout,
  Palette,
  User,
} from "lucide-react";
import InputField from "../common/InputField";
import AddressSection from "../common/AddressSection";
import MultiInput from "../common/MultiInput";



const DesignerProfileBody = ({
  errors,
  isEditing,
  formData,
  handleInputChange,
  handleAddSkill,
  handleRemoveSkill,
}) => {
  const skillSections = [
    { title: "Languages", icon: Languages, field: "languages_know" },
    { title: "Specializations", icon: Code, field: "specializations" },
    { title: "Software Expertise", icon: Layout, field: "softwareExpertise" },
    { title: "Design Styles", icon: Palette, field: "designStyle" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputField
          label="Position"
          icon={<Briefcase className="w-4 h-4 mr-2" />}
          value={formData?.position}
          onChange={(e) => handleInputChange("position", e.target.value)}
          disabled={!isEditing}
          error={errors.position}
        />
        <InputField
          label="Company"
          icon={<Building className="w-4 h-4 mr-2" />}
          value={formData?.company}
          onChange={(e) => handleInputChange("company", e.target.value)}
          disabled={!isEditing}
          error={errors.company}
        />
        <InputField
          label="Experience (years)"
          icon={<Clock className="w-4 h-4 mr-2" />}
          type="number"
          value={formData?.experience}
          onChange={(e) => handleInputChange("experience", e.target.value)}
          disabled={!isEditing}
          error={errors.experience}
        />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-500 flex items-center">
          <User className="w-4 h-4 mr-2" />
          About Me
        </label>
        {errors.aboutMe && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <span className="flex items-center gap-1 text-sm text-red-500">
            {errors.aboutMe}
          </span>
        </div>
        )}
        <textarea
          value={formData?.aboutMe || ""}
          onChange={(e) => handleInputChange("aboutMe", e.target.value)}
          disabled={!isEditing}
          className="w-full px-4 py-3 bg-transparent border border-violet-200 rounded-lg focus:border-violet-500 outline-none transition-colors resize-none h-32 disabled:opacity-70"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillSections.map((section) => (
          <MultiInput
            key={section.field}
            {...section}
            items={formData?.[section.field] || []}
            isEditing={isEditing}
            onAddInput={handleAddSkill}
            onRemoveInput={handleRemoveSkill}
            errors={errors.skills}
          />
        ))}
      </div>

      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-500 flex items-center mr-4">
          <DollarSign className="w-4 h-4 mr-2" />
          Starting Price
        </label>
        {errors.starting_price && (
           <div className="animate-in fade-in slide-in-from-top-1 duration-200">
           <span className="flex items-center gap-1 text-sm text-red-500">
             {errors.starting_price}
           </span>
         </div>
        )}
        <input
          type="number"
          value={formData?.starting_price || ""}
          onChange={(e) => handleInputChange("starting_price", e.target.value)}
          disabled={!isEditing}
          className="px-4 py-2 bg-transparent border-b border-violet-200 focus:border-violet-500 outline-none transition-colors disabled:opacity-70"
        />
      </div>

      <AddressSection
        formData={formData}
        handleInputChange={handleInputChange}
        isEditing={isEditing}
        error={errors.address}
      />
    </div>
  );
};
export default DesignerProfileBody;
