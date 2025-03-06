import React from "react";

const SavingSpinner = () => {
  return (
    <div className="w-full h-screen bg-black/40 backdrop-blur-md z-50 flex items-center justify-center animate-in fade-in duration-300">
    <div className="bg-white p-6 shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in duration-300 max-w-sm w-full mx-4">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[5px] border-violet-300/40 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-[5px] border-violet-600 border-t-transparent animate-spin"></div>
        </div>
  
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 animate-in fade-in-up duration-500">
            Saving Changes
          </h3>
          <p className="text-sm text-gray-500 animate-in fade-in-up duration-500 delay-200">
            Please wait a moment...
          </p>
        </div>
      </div>
  
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
        <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full w-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  </div>
  
  );
};

export default SavingSpinner;
