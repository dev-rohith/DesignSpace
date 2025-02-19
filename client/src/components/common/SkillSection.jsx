import { Plus, X } from "lucide-react";
import { memo, useCallback, useState } from "react";

const SkillSection = memo(
  ({
    title,
    icon: Icon,
    items = [],
    field,
    isEditing,
    onAddSkill,
    onRemoveSkill,
    errors,
  }) => {
    const [newSkill, setNewSkill] = useState("");

    const handleAdd = useCallback(() => {
      if (!newSkill.trim()) return;
      onAddSkill(field, newSkill);
      setNewSkill("");
    }, [field, newSkill, onAddSkill]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-violet-900 flex items-center">
            <Icon className="w-5 h-5 mr-2" />
            {title}
          </h3>
          {errors && (
            <div className="animate-in fade-in mx-4 slide-in-from-top-1 duration-200">
              <span className="flex items-center text-sm text-red-500">
                {errors[field]}
              </span>
            </div>
          )}
          {isEditing && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Add ${title.toLowerCase()}`}
                className="px-2 py-1 text-sm border border-violet-200 rounded-md"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button
              type="button"
                className="text-violet-600 hover:text-violet-800 cursor-pointer"
                onClick={handleAdd}
              >
                <Plus className="w-4 h-4 hover:rotate-180 hover:scale-105 duration-200 " />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full text-sm capitalize group flex items-center"
            >
              {item}
              {isEditing && (
                <button
                  className="ml-2 cursor-pointer"
                  onClick={() => onRemoveSkill(field, item)}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }
);

export default SkillSection;
