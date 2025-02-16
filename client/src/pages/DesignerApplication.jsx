import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { requestRoleDesigner } from "../features/actions/applicationActions.js";

import { MultiFormProvider } from "../context/MultiFormProvider.jsx";
import LandingLayout from "../layout/LandingLayout.jsx";

import {
  DesignerApplicationProcess,
  DesignerAppStepOne,
  DesignerAppStepTwo,
  DesingerAppStepThree,
  FormContent,
  Stepper,
  StepperControl,
} from "../components/index.js";

const DesignerApplication = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const steps = ["Process","Resume", "INtruduction", "Complete"];
  const formComponents = [
    DesignerApplicationProcess,
    DesignerAppStepOne,
    DesignerAppStepTwo,
    DesingerAppStepThree,
  ];

  const handleFormSubmit = async (data) => {
    if (Object.keys(data).length < 3)
      return toast.error("Please fill all the fields");
    const Form = new FormData();
    Form.append("requestedRole", "designer");
    Object.keys(data).forEach((key) => {
      if (key === "resume" || key === "introduction") {
        Form.append("files", data[key]);
      } else {
        Form.append(key, data[key]);
      }
    });

    const actionResult = await dispatch(requestRoleDesigner(Form));
    if (requestRoleDesigner.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      navigate("/application-success");
    } else if (requestRoleDesigner.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  return (
    <LandingLayout>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto">
          <MultiFormProvider steps={steps} formComponents={formComponents}>
            <div className="rounded-lg shadow-lg p-8 bg-gradient-to-br from-violet-100 via-white to-green-50">
              <Stepper />
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
export default DesignerApplication;
