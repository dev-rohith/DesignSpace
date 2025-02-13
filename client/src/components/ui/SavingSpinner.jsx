import React from "react";

const SavingSpinner = () => {
  return (
    <div className="w-full h-screen bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center gap-4 animate-in zoom-in duration-300 max-w-md w-full mx-4">
        <div className="flex items-center gap-3">
          {/* Spinner */}
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-violet-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
          </div>
          {/* Text */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 animate-in fade-in-up duration-500">
              Saving Changes
            </h3>
            <p className="text-sm text-gray-500 animate-in fade-in-up duration-500 delay-200">
              Please wait a moment...
            </p>
          </div>
        </div>
        {/* Progress bar animation */}
        <div className="w-full h-1.5 bg-violet-100 rounded-full overflow-hidden">
          <div className="h-full bg-violet-500 rounded-full w-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default SavingSpinner;
