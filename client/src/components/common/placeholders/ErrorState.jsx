import { AlertCircle } from "lucide-react";

const ErrorState = ({ error = "Failed to Load Data" }) => {
  return (
    <div className="w-screen mx-auto text-center">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-gray-500">
        <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
        <h3 className="text-lg font-semibold mb-2">{error}</h3>
        <p className="text-sm">Please try refreshing the page</p>
      </div>
    </div>
  );
};
export default ErrorState;
