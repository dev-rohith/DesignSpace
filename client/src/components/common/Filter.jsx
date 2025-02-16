import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import usePopUp from "../../hooks/usePopUp";

const Filter = ({ filters = [] }) => {
  const [searchPrams, setSearchPrams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const {
    isPopupOpen: isFilterPopUp,
    setIsPopupOpen: setIsFilterPopUp,
    dropdownRef: FilterDrop,
  } = usePopUp();

  const toggleSelection = (title, option) => {
    setSelectedOptions((prev) => {
      const newSelection = { ...prev };
      prev[title] === option
        ? delete newSelection[title]
        : (newSelection[title] = option);
      return newSelection;
    });
  };

  const handleApplyFilter = () => {
    const newParams = new URLSearchParams();   // clear the search params need ----------------------
    for (const key in selectedOptions) {
      newParams.set(key, selectedOptions[key]);
    }
    setSearchPrams(newParams);
    setIsFilterPopUp(!isFilterPopUp);
  };

  return (
    <div className="ml-2 my-2 relative">
      <button
        disabled={isFilterPopUp}
        className="bg-gray-50 px-6 py-2 tracking-wider disabled:bg-gray-400 text-sm text-gray-600 hover:bg-gray-200"
        onClick={() => setIsFilterPopUp(!isFilterPopUp)}
      >
        Apply Filters
      </button>

      {isFilterPopUp && (
        <div
          ref={FilterDrop}
          className="w-52 absolute top-10 bg-white  p-2 shadow-sm"
        >
          {filters.map(({ title, options }) => (
            <div key={title} className="mb-1">
              <button
                onClick={() => setOpenFilter(openFilter === title ? "" : title)}
                className="w-full flex items-center justify-between p-1 text-sm"
              >
                {title}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openFilter === title ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFilter === title && (
                <div className="pl-2 py-1">
                  {options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-sm py-0.5"
                    >
                      <input
                        type="checkbox"
                        className="w-3.5 h-3.5"
                        checked={selectedOptions[title] === option}
                        onChange={() => toggleSelection(title, option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={handleApplyFilter}
            className="w-full py-1 text-sm bg-violet-500 text-white cursor-pointer"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
