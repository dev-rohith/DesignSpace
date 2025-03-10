import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Star, X } from "lucide-react";
import { Globe, Briefcase, Palette, Code, Layers } from "lucide-react";
import MultiInput from "../common/MultiInput";

const AdvancedFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    starting_price: [0, 50000],
    specializations: [],
    softwareExpertise: [],
    average_rating: 0,
    position: [],
    languages_know: [],
    designStyle: [],
  });

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const rangeRef = useRef(null);

  const filterOptions = {
    specializations: [
      "Residential Interior Design",
      "Commercial Interior Design",
      "Hospitality Design",
      "Retail Design",
      "Healthcare Design",
      "Sustainable Interior Design",
    ],
    softwareExpertise: [
      "AutoCAD",
      "SketchUp",
      "3ds Max",
      "Revit",
      "V-Ray",
      "Adobe Photoshop",
    ],
    position: [
      "Junior Interior Designer",
      "Mid-level Interior Designer",
      "Senior Interior Designer",
      "Lead Designer",
      "Interior Architect",
      "Design Consultant",
    ],
    languages_know: [
      "English",
      "Spanish",
      "Hindi",
      "German",
      "French",
      "Japanese",
    ],
    designStyle: [
      "Modern",
      "Contemporary",
      "Minimalist",
      "Industrial",
      "Traditional",
      "Bohemian",
    ],
  };

  const categoryIcons = {
    specializations: Layers,
    softwareExpertise: Code,
    position: Briefcase,
    languages_know: Globe,
    designStyle: Palette,
  };

  useEffect(() => {
    const newFilters = { ...filters };
  
    if (searchParams.has("min_price") && searchParams.has("max_price")) {
      newFilters.starting_price = [
        Number(searchParams.get("min_price")) || 0,
        Number(searchParams.get("max_price")) || 50000,
      ];
    }
  
    if (searchParams.has("average_rating")) {
      newFilters.average_rating = Number(searchParams.get("average_rating")) || 0;
    }
  
    Object.keys(filterOptions).forEach((key) => {
      if (searchParams.has(key)) {
        const value = searchParams.get(key);
        newFilters[key] = value ? value.split(",") : [];
      }
    });
  
    setFilters(newFilters);
  }, [searchParams]);

  useEffect(() => {
    if (minPriceRef.current && maxPriceRef.current && rangeRef.current) {
      const minPercent = (filters.starting_price[0] / 50000) * 100;
      const maxPercent = (filters.starting_price[1] / 50000) * 100;

      minPriceRef.current.value = filters.starting_price[0];
      maxPriceRef.current.value = filters.starting_price[1];

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [filters.starting_price]);

  const handleMinPriceChange = (e) => {
    const value = Math.min(
      parseInt(e.target.value),
      filters.starting_price[1] - 50
    );
    setFilters({
      ...filters,
      starting_price: [value, filters.starting_price[1]],
    });
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(
      parseInt(e.target.value),
      filters.starting_price[0] + 50
    );
    setFilters({
      ...filters,
      starting_price: [filters.starting_price[0], value],
    });
  };

  const handleRatingChange = (value) => {
    setFilters({ ...filters, average_rating: value });
  };

  const toggleOption = (category, option) => {
    setFilters((prevFilters) => {
      const newValues = [...prevFilters[category]];

      if (newValues.includes(option)) {
        return {
          ...prevFilters,
          [category]: newValues.filter((item) => item !== option),
        };
      } else {
        return {
          ...prevFilters,
          [category]: [...newValues, option],
        };
      }
    });
  };

  const handleAddInput = (category, value) => {
    setFilters((prevFilters) => {
      if (prevFilters[category].includes(value)) {
        return prevFilters;
      }
      return {
        ...prevFilters,
        [category]: [...prevFilters[category], value],
      };
    });
  };

  const handleRemoveInput = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].filter((item) => item !== value),
    }));
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();
  
    if (filters.starting_price[0] !== 0 || filters.starting_price[1] !== 50000) {
      newParams.set(`starting_price[gte]`, filters.starting_price[0]);
      newParams.set(`starting_price[lte]`, filters.starting_price[1]);
    }
  
    if (filters.average_rating > 0) {
      newParams.set("average_rating[gte]", filters.average_rating);
    }
  
    Object.keys(filterOptions).forEach((key) => {
      if (filters[key].length > 0) {
        newParams.set(key, filters[key].join(","));
      }
    });
  
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({
      starting_price: [0, 5000],
      specializations: [],
      softwareExpertise: [],
      average_rating: 0,
      position: [],
      languages_know: [],
      designStyle: [],
    });
    setSearchParams(new URLSearchParams());
  };

  const renderRatingStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 cursor-pointer ${
            index < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleRatingChange(index + 1)}
        />
      ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white overflow-y-scroll h-[calc(100vh-60px)] max-w-80 border-r shadow-md p-6 w-full mx-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-violet-400 scrollbar-thumb-rounded">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-montserrat font-semibold text-pink-500">
          Advanced Filters
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-600 flex items-center gap-1 group hover:text-red-500 cursor-pointer"
        >
          <X className="w-4 h-4 group-hover:rotate-180 duration-300" />
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-sansita font-medium mb-3">Price Range</h3>
        <div className="relative h-1.5 bg-gray-200 rounded-md mb-6">
          <div
            ref={rangeRef}
            className="absolute h-full bg-violet-400 rounded-md"
          ></div>
        </div>
        <div className="relative ">
          <input
            type="range"
            min="0"
            max="50000"
            step="50"
            ref={minPriceRef}
            value={filters.starting_price[0]}
            onChange={handleMinPriceChange}
            className="absolute w-full h-0 -top-7 appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-700 [&::-webkit-slider-thumb]:border-2 cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="50000"
            step="50"
            ref={maxPriceRef}
            value={filters.starting_price[1]}
            onChange={handleMaxPriceChange}
            className="absolute w-full h-0 -top-7 appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-700 [&::-webkit-slider-thumb]:border-2 cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{formatPrice(filters.starting_price[0])}</span>
          <span>{formatPrice(filters.starting_price[1])}</span>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <h3 className="text-md font-sansita font-medium">Average Rating :</h3>
        <div className="flex items-center gap-1">
          {renderRatingStars(filters.average_rating)}
          {filters.average_rating > 0 && (
            <span className="ml-2 text-sm text-gray-600">
              {filters.average_rating} & Above
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category} className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-md font-sansita mb-2 capitalize">
                {category.replace("_", " ")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleOption(category, option)}
                    className={`px-3 py-0.5 leading-tight text-sm rounded-full border ${
                      filters[category].includes(option)
                        ? "bg-violet-100 border-violet-300 text-violet-700"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <MultiInput
              title={`Custom ${category}`}
              icon={categoryIcons[category] || Star}
              items={filters[category].filter(
                (item) => !options.includes(item)
              )}
              field={category}
              isEditing={true}
              onAddInput={handleAddInput}
              onRemoveInput={handleRemoveInput}
              className="w-[60%] max-w-xs space-y-2"
              titleClass="text-xs font-semibold text-violet-700"
              iconClass="w-3 h-3"
              errorClass="text-[10px]"
              inputContainerClass="gap-0.5"
              inputClass="text-[10px] px-0.5 py-0.5 w-30 border border-violet-300 rounded-sm"
              buttonClass="w-4 h-4"
              listContainerClass="gap-0.5"
              itemClass="px-1 py-0.5 text-[10px]"
              removeButtonClass="w-2.5 h-2.5"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex">
        <button
          onClick={applyFilters}
          className="px-6 py-1.5 w-full bg-violet-500 hover:bg-violet-700 text-white rounded-lg font-raleway text-sm font-medium transition-colors hover:shadow-md hover:shadow-violet-400 cursor-pointer"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
