import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { requestRoleAssociate } from "../features/actions/applicationActions";

import LandingLayout from "../layout/LandingLayout";
import { MultiFormProvider } from "../context/MultiFormProvider";

import {
  AssociateApplicationProcess,
  AssociateAppStepOne,
  AssociateAppStepThree,
  AssociateAppStepTwo,
  FormContent,
  Stepper,
  StepperControl,
} from "../components";

const DesingerApplication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const steps = ["Process", "Cover Letter", "Self Introduction", "Complete"];
  const formComponents = [
    AssociateApplicationProcess,
    AssociateAppStepOne,
    AssociateAppStepTwo,
    AssociateAppStepThree,
  ];

  const handleFormSubmit = async (data) => {
    if (Object.keys(data).length < 3)
      return toast.error("Please fill all the fields");
    const Form = new FormData();
    Form.append("requestedRole", "associate");
    Object.keys(data).forEach((key) => {
      if (key === "resume" || key === "introduction") {
        Form.append("files", data[key]);
      } else {
        Form.append(key, data[key]);
      }
    });

    const actionResult = await dispatch(requestRoleAssociate(Form));
    if (requestRoleAssociate.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      navigate("/application-success");
    } else if (requestRoleAssociate.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  return (
    <LandingLayout>
      <div className="min-h-screen bg-slate-200 md:py-8">
        <div className="max-w-6xl mx-auto ">
          <MultiFormProvider steps={steps} formComponents={formComponents}>
            <div className="rounded-lg shadow-lg p-8 bg-white">
               <div className="hidden md:block">
               <Stepper />
                </div> 
              <div className="mt-8">
                <FormContent />
              </div>
              <StepperControl handleFormSubmit={handleFormSubmit} />
            </div>
          </MultiFormProvider>
        </div>
      </div>
    </LandingLayout>
  );
};
export default DesingerApplication;
