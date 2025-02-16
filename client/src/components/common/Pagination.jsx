import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ data = {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, perPage, total, totalPages } = data;

  const startEntry = total === 0 ? 0 : (page - 1) * perPage + 1;
  const endEntry = Math.min(page * perPage, total);

  const onPageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };
  
  const handlePrevious = () => page > 1 && onPageChange(page - 1);
  const handleNext = () => page < totalPages && onPageChange(page + 1);
  const handlePage = (newPage) => newPage !== page && onPageChange(newPage);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t bg-white">
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold">{startEntry}</span> to{" "}
        <span className="font-semibold">{endEntry}</span> of{" "}
        <span className="font-semibold">{total}</span> results
      </p>

      <nav className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="p-2 rounded-md transition hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePage(num)}
            className={`w-6 h-6 rounded-full text-sm font-semibold transition 
          ${
            page === num
              ? "bg-violet-600 text-white shadow-md"
              : "hover:bg-gray-100 text-gray-700"
          }
        `}
          >
            {num}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="p-2 rounded-md transition hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
