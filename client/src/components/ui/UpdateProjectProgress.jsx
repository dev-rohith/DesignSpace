import { Edit2 } from "lucide-react";
import MultiInput from "../common/MultiInput";

const UpdateProjectProgress = ({
  isUpdatingProgress,
  errors,
  completion_percentage,
  handleInputChange,
  milestones,
  handleAddMiletstone,
  handleRemoveMiletstone,
}) => {
  return (
    <div className="mb-8">
        <div className="w-96 mb-5">
          <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-500">
            <div>Completion Percentage : {completion_percentage} % </div>
            {errors.completion_percentage && (
              <span className="text-red-500">
                {errors.completion_percentage}
              </span>
            )}
          </div>
          <input
            label="Completion Percentage"
            value={completion_percentage}
            onChange={(e) =>
              handleInputChange("completion_percentage", e.target.value)
            }
            disabled={!isUpdatingProgress}
            type="range"
            className="w-full h-2 rounded-lg cursor-pointer accent-violet-500 "
          />
        </div>
      <MultiInput
      errors={errors}
        title="Milestones"
        icon={Edit2}
        items={milestones}
        field="milestones"
        isEditing={isUpdatingProgress}
        onAddInput={handleAddMiletstone}
        onRemoveInput={handleRemoveMiletstone}
      />
    </div>
  );
};
export default UpdateProjectProgress;
