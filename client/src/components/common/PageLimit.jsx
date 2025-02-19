import { useSearchParams } from "react-router-dom";

const PageLimit = ({ size = 5, step = 5 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleChange = (e) => {
    searchParams.set("limit", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Limit</label>
      <select
        value={searchParams.get("limit") || "default"}
        className="border rounded-md px-3 py-1 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
        onChange={handleChange}
      >
        {Array.from({ length: size }, (_, i) => i * step).map((num) => (
          <option key={num} value={num} className="text-gray-800">
            {num || "Default"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageLimit;
