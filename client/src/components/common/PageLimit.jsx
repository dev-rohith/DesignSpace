import { useSearchParams } from "react-router-dom";

const PageLimit = ({ size = 5, step = 5 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    searchParams.set("limit", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-700">Limit</label>
      <select
        value={
          searchParams.get("limit") ? searchParams.get("limit") : "default"
        }
        className="bg-white border border-gray-300 text-sm px-3 py-1 
              focus:outline-none focus:ring-2 focus:ring-violet-400 
              hover:border-gray-400 transition cursor-pointer"
        onChange={handleChange}
      >
        {Array.from({ length: size }, (_, i) => i * step).map((num) => (
          <option key={num} value={num}>
            {num || "Default"}
          </option>
        ))}
      </select>
    </div>
  );
};
export default PageLimit;
