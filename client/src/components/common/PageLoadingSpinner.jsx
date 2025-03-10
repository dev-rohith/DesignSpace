import { Loader } from "lucide-react";

const PageLoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gray-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        <Loader className="w-16 h-16 animate-spin text-violet-700 "/>
        <div className="absolute inset-0">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};
export default PageLoadingSpinner;
