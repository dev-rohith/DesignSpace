import { useSearchParams } from "react-router-dom";

const PageLimit = ({ size = 5, step = 5 }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    searchParams.set("limit", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      value={searchParams.get("limit") || "default"}
      className=" px-3 py-1 text-gray-800   cursor-pointer"
      onChange={handleChange}
    >
      {Array.from({ length: size }, (_, i) => i * step).map((num) => (
        <option key={num} value={num} className="text-gray-800">
          {num || "Default"}
        </option>
      ))}
    </select>
  );
};

export default PageLimit;
