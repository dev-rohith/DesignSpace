import { useForm } from "../../context/MultiFormProvider";

export const FormContent = () => {
    const { currentStep, formComponents } = useForm();
    const CurrentStepComponent = formComponents[currentStep - 1];
  
    return <CurrentStepComponent />;
  };