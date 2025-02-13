import LandingLayout from "../layout/LandingLayout";

import { FormContent } from "../components/ui/FormContent";
import { Stepper } from "../components/ui/Stepper";
import { MultiFormProvider } from "../context/MultiFormProvider";
import { StepperControl } from "../components/common/StepperControl";

import { AssociateAppStepOne, AssociateAppStepThree, AssociateAppStepTwo } from "../components";


const DesingerApplication = () => {
  const steps = ["Account", "Personal", "Complete", "successfull"];
  const formComponents = [AssociateAppStepOne, AssociateAppStepTwo, AssociateAppStepThree];

  return (
    <LandingLayout>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-3xl mx-auto">
          <MultiFormProvider steps={steps} formComponents={formComponents}>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <Stepper />
              <div className="mt-8">
                <FormContent />
              </div>
              <StepperControl />
            </div>
          </MultiFormProvider>
        </div>
      </div>
    </LandingLayout>
  );
};
export default DesingerApplication;
