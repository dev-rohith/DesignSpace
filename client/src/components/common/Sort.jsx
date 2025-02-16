import React from "react";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Sort = ({ options = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    if (e.target.value === "") return;
    const selectedValue = e.target.value;
    searchParams.set("sort", selectedValue);
    setSearchParams(searchParams);
  };

  return (
    <div className="relative inline-block">
      <select
        onChange={handleChange}
        defaultValue={options[0]?.value}
        className="appearance-none bg-white px-4 py-2 pr-10 text-sm border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
      >
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
};

export default Sort;
