import { useSelector } from "react-redux";
import { useForm } from "../../../context/MultiFormProvider";

const DesingerAppStepThree = () => {
  const { formData, updateFormData } = useForm();
  const { isLoading } = useSelector((store) => store.application);

  const handleChange = (e) => {
    updateFormData({ description: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="flex flex-col space-y-2">
        <label className="uppercase font-bold text-xl text-gray-700">
          Why Are You Interested?
        </label>
        <p className="text-sm text-gray-500">
          Tell us about your interest in this role and what makes you a great
          fit.
        </p>
      </div>

      {!isLoading && (
        <textarea
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Share your motivation and relevant experience..."
          className="w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none resize-y text-gray-700"
        />
      )}
    </div>
  );
};

export default DesingerAppStepThree;
