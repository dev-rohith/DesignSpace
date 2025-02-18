import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = ({ className, placeholder = "Search...", onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.length >= 2) {
        setSearchParams({ search });
      } else if (search.length === 0) {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }

      if (onSearch) onSearch(search);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder={placeholder}
      className={`border px-3  focus:ring-2 focus:ring-violet-200 ${className}`}
    />
  );
};

export default Search;
