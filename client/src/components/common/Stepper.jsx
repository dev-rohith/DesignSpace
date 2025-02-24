import { useForm } from "../../context/MultiFormProvider";

 const Stepper = () => {
  const { steps, currentStep } = useForm();

  return (
    <div className="mx-4 px-4 flex justify-between items-center">
      {steps.map((step, index) => (
        <div
          key={index}
          className={
            index !== steps.length - 1
              ? "w-full flex items-center"
              : "flex items-center"
          }
        >
          <div className="relative flex flex-col items-center text-teal-600">
            <div
              className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
                index + 1 <= currentStep ? "bg-green-500" : ""
              }`}
            >
              {index + 1 < currentStep ? (
                <span className="text-white font-bold text-xl">&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div
              className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
                index + 1 === currentStep ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {step}
            </div>
          </div>
          {index !== steps.length - 1 && (
            <div
              className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                index + 1 < currentStep ? "border-green-600" : "border-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper