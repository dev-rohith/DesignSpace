import { useSelector } from "react-redux";
import { useForm } from "../../context/MultiFormProvider";
import { Loader } from "lucide-react";

 const StepperControl = ({ handleFormSubmit }) => {
  const { isLoading } = useSelector((store) => store.application);
  const { currentStep, steps, next, back, formData } = useForm();

  return (
    <div className="container flex justify-around  mt-4 mb-8">
      <button
        onClick={back}
        disabled={isLoading}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 transition duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>
      {currentStep === steps.length ? (
        <button
          onClick={() => {
            handleFormSubmit(formData);
          }}
          disabled={isLoading}
          className="bg-violet-500 disabled:bg-green-300 text-white uppercase py-2 px-4 ml-16 rounded-xl font-normal cursor-pointer border-slate-300 hover:bg-green-700 transition duration-200 ease-in-out"
        >
          {isLoading ? (
            <span className="flex gap-2 items-center ">
              <Loader className="h-4 w-4 animate-spin" />
              Submitting....
            </span>
          ) : (
            "Submit"
          )}
        </button>
      ) : (
        <button
          onClick={next}
          className="bg-violet-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-slate-300 hover:bg-slate-700 transition duration-200 ease-in-out"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default StepperControl;