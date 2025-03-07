import { useForm } from "../../../context/MultiFormProvider";

const AssocaiteAppStepThree = () => {
  const { formData, updateFormData } = useForm();

  const handleChange = (e) => {
    updateFormData({ description: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="flex flex-col space-y-2">
        <label className="uppercase font-bold text-xl text-gray-700">
          Why you interested to become associate in Design Space ?
        </label>
        <p className="text-sm text-gray-500">
          Tell me about your interest in this role and what makes you a great
          fit.Minimum 100 words.Fill the form Carfully before submiting it.
        </p>
      </div>

      <textarea
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Share your motivation and relevant experience..."
        className="w-full min-h-[200px] p-4 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none resize-y text-gray-700"
      />
    </div>
  );
};

export default AssocaiteAppStepThree;
