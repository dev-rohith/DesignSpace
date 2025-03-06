import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../context/MultiFormProvider";
import { Loader, ChevronLeft, ChevronRight, Send } from "lucide-react";

const StepperControl = ({ handleFormSubmit }) => {
  const { isLoading } = useSelector((store) => store.application);
  const { currentStep, steps, next, back, formData } = useForm();

  return (
    <div className="w-full max-w-full mx-auto px-4 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-center ">
        {/* Back  */}
        <button
          onClick={back}
          disabled={isLoading || currentStep === 1}
          className={`group relative overflow-hidden w-full sm:w-auto bg-white text-slate-600 py-1 px-7 rounded-lg font-medium border border-slate-200 shadow-sm
            hover:shadow-md hover:bg-slate-50 transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-opacity-50
            ${
              currentStep === 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
          `}
        >
          <span className="flex items-center justify-center gap-2">
            <ChevronLeft className="w-9 h-9 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back</span>
          </span>
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>

        {/* progress bar */}
        <div className="w-full md:max-w-lvw md:mx-6 sm:max-w-md bg-slate-100 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-violet-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* next/submit */}
        {currentStep === steps.length ? (
          <button
            onClick={() => handleFormSubmit(formData)}
            disabled={isLoading}
            className={`group relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-1 px-7 rounded-lg font-medium shadow-md
              hover:shadow-lg transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50
              ${isLoading ? "cursor-wait" : "cursor-pointer"}
              disabled:from-violet-400 disabled:to-indigo-400 disabled:cursor-not-allowed
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="h-9 w-9 animate-spin" />
                <span>Submitting...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Submit</span>
                <Send className="w-10 h-9 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            )}
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        ) : (
          <button
            onClick={next}
            disabled={isLoading}
            className="group relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-1 px-7 rounded-lg font-medium shadow-md
              cursor-pointer
              hover:shadow-lg transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Next</span>
              <ChevronRight className="w-9 h-9 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default StepperControl;
