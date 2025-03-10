import { Plus, X } from "lucide-react";
import { memo, useCallback, useState } from "react";

const MultiInput = memo(
  ({
    title,
    icon: Icon,
    items = [],
    field,
    isEditing,
    onAddInput,
    onRemoveInput,
    errors = {},
    className = "",
    titleClass = "", 
    iconClass = "",
    errorClass = "",
    inputContainerClass = "", 
    inputClass = "", 
    buttonClass = "", 
    listContainerClass = "", 
    itemClass = "", 
    removeButtonClass = "", 
  }) => {
    const [newInput, setNewInput] = useState("");

    const handleAdd = useCallback(() => {
      if (!newInput.trim()) return;
      onAddInput(field, newInput);
      setNewInput("");
    }, [field, newInput, onAddInput]);

    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-medium flex items-center ${titleClass}`}>
            <Icon className={`w-5 h-5 mr-2 ${iconClass}`} />
            {title}
          </h3>
          {errors[field] && (
            <div className={`animate-in fade-in mx-4 slide-in-from-top-1 duration-200 ${errorClass}`}>
              <span className="flex items-center text-sm text-red-500">
                {errors[field]}
              </span>
            </div>
          )}
          {isEditing && (
            <div className={`flex items-center gap-2 ${inputContainerClass}`}>
              <input
                type="text"
                placeholder={`Add ${title.toLowerCase()}`}
                className={`px-2 py-1 text-sm border border-violet-200 rounded-md ${inputClass}`}
                value={newInput}
                onChange={(e) => setNewInput(e.target.value)}
              />
              <button
                type="button"
                className={`text-violet-600 hover:text-violet-800 cursor-pointer ${buttonClass}`}
                onClick={handleAdd}
              >
                <Plus className="w-4 h-4 hover:rotate-180 hover:scale-105 duration-200" />
              </button>
            </div>
          )}
        </div>
        <div className={`flex flex-wrap gap-2 ${listContainerClass}`}>
          {items.map((item) => (
            <span
              key={item}
              className={`px-3 py-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full text-sm capitalize group flex items-center ${itemClass}`}
            >
              {item}
              {isEditing && (
                <button
                  className={`ml-2 cursor-pointer ${removeButtonClass}`}
                  onClick={() => onRemoveInput(field, item)}
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

export default MultiInput;
