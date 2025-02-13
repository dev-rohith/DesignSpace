import { useForm } from "../../context/MultiFormProvider";

export const StepperControl = () => {
  const { currentStep, steps, next, back } = useForm();

  return (
    <div className="container flex justify-around mt-4 mb-8">
      <button
        onClick={back}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 transition duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>
      <button
        onClick={next}
        className="bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-slate-300 hover:bg-slate-700 transition duration-200 ease-in-out"
      >
        {currentStep === steps.length ? "Confirm" : "Next"}
      </button>
    </div>
  );
};
