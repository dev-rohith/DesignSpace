import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newSearchParams = new URLSearchParams();
      if (search.length >= 2) {
        newSearchParams.set("search", search);
        setSearchParams(newSearchParams);
      } else if (search.length === 0) {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);
  return (
    <div>
      <label htmlFor="search">
        <SearchIcon className="inline h-4 w-4 mr-2" />
        Search :{" "}
      </label>
      <input
        id="search"
        name="search"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="outline bg-white placeholder:text-gray-400 px-2 py-1 focus:outline-indigo-950 focus:outline-2"
      />
    </div>
  );
};
export default Search;
