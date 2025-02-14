import { useForm } from "../../context/MultiFormProvider";

 const FormContent = () => {
    const { currentStep, formComponents } = useForm();
    const CurrentStepComponent = formComponents[currentStep - 1];
  
    return <CurrentStepComponent />;
  };

export default FormContent