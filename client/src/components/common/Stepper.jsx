import React from "react";
import { useForm } from "../../context/MultiFormProvider";

const Stepper = () => {
  const { steps, currentStep } = useForm();

  return (
    <div className="w-full py-6 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex ${
              index !== steps.length - 1
                ? "w-full md:w-full flex-row md:flex-row items-center"
                : "items-center"
            }`}
          >
            <div className="relative flex flex-col items-center">
              <div
                className={`rounded-full shadow-lg transition-all duration-500 ease-in-out h-12 w-12 flex items-center justify-center ${
                  index + 1 <= currentStep
                    ? "bg-gradient-to-r from-teal-400 to-emerald-500 border-none"
                    : "bg-white border-2 border-gray-200"
                }`}
              >
                {index + 1 < currentStep ? (
                  <span className="text-white font-bold text-lg">&#10003;</span>
                ) : (
                  <span
                    className={`font-semibold text-lg ${
                      index + 1 <= currentStep ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                )}

                {index + 1 === currentStep && (
                  <span className="absolute inset-0 rounded-full bg-teal-400 opacity-30 animate-ping"></span>
                )}
              </div>

              <div
                className={`absolute top-0 mt-16 w-32 text-center text-xs font-medium uppercase transition-all duration-500 ${
                  index + 1 === currentStep
                    ? "text-teal-700 font-semibold"
                    : index + 1 < currentStep
                    ? "text-emerald-600"
                    : "text-gray-400"
                }`}
              >
                {step}
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="hidden md:flex flex-auto mx-2">
                <div
                  className={`h-1 transition-all duration-500 ease-in-out rounded-full w-full ${
                    index + 1 < currentStep
                      ? "bg-gradient-to-r from-teal-400 to-emerald-500"
                      : index + 1 === currentStep
                      ? "bg-gradient-to-r from-teal-400 via-emerald-500 to-gray-200"
                      : "bg-gray-200"
                  }`}
                />
              </div>
            )}

            {index !== steps.length - 1 && (
              <div className="md:hidden h-10 w-1 mx-auto my-2">
                <div
                  className={`h-full transition-all duration-500 ease-in-out rounded-full ${
                    index + 1 < currentStep
                      ? "bg-gradient-to-b from-teal-400 to-emerald-500"
                      : index + 1 === currentStep
                      ? "bg-gradient-to-b from-teal-400 via-emerald-500 to-gray-200"
                      : "bg-gray-200"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
