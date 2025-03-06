import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import LandingLayout from "../../layout/LandingLayout";


const ApplicationSucess = () => {
  return (
    <LandingLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className=" bg-white text-gray-800 shadow-lg rounded-2xl p-6 sm:p-10 text-center max-w-md animate-fade-in">
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto animate-bounce" />
          <h1 className="text-2xl font-bold mt-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-gray-600 mt-2">
            Thank you for your submission. Please wait for some time while we
            process your application. You will receive an email update soon.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </LandingLayout>
  );
};

export default ApplicationSucess;
