import { Loader } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signupValidation } from "../../utils/validation";

const SignupComponent = ({ handleSignup }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [clientErrors, setClientErrors] = useState({});
  const { isLoading } = useSelector((store) => store.auth);

  function handleSubmit(e) {
    e.preventDefault();
    const Errors = signupValidation(formData);
    if (Object.keys(Errors).length !== 0) {
      setClientErrors(Errors);
    } else {
      const { firstName, lastName, email, password } = formData;
      handleSignup({ firstName, lastName, email, password });
    }
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-(--background) flex rounded-2xl shadow-lg max-w-3xl items-center overflow-hidden max-h-[600px]">
        <div className="md:block hidden w-1/2">
          <img src="https://res.cloudinary.com/dlbyxcswi/image/upload/v1738742215/kxnoiqgszkxxffture5y.jpg" />
        </div>
        <div className="md:w-1/2 px-8 md:px-15">
          <h2 className="font-bold text-2xl text-(--primary)">Signup Now</h2>
          <p className="text-xs mt-2 text-(--primary)">
            Become a new member now
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                className="p-2 mt-4 rounded-xl border w-full"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                }}
              />
              {clientErrors.firstName && (
                <p className=" ml-2 text-red-500 text-xs">
                  {clientErrors.firstName}
                </p>
              )}
            </div>
            <div>
              <input
                className="p-2 rounded-xl border w-full"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                }}
              />
              {clientErrors.lastName && (
                <p className=" ml-2 text-red-500 text-xs">
                  {clientErrors.lastName}
                </p>
              )}
            </div>
            <div>
              <input
                className="p-2 rounded-xl border w-full"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              {clientErrors.email && (
                <p className=" ml-2 text-red-500 text-xs">
                  {clientErrors.email}
                </p>
              )}
            </div>
            <div>
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              {clientErrors.password && (
                <p className="ml-2 text-red-500 text-xs">
                  {clientErrors.password}
                </p>
              )}
            </div>
            <div>
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                placeholder="Confirm Pasword"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                }}
              />
              {clientErrors.confirmPassword && (
                <p className="ml-2 text-red-500 text-xs">
                  {clientErrors.confirmPassword}
                </p>
              )}
            </div>
            <button className="bg-(--primary) rounded-xl text-white py-2 hover:scale-105 duration-300">
              {isLoading ? (
                <span className="flex items-center text-sm justify-center space-x-2">
                  <Loader className="w-4 h-6 animate-spin" />
                  <span>SignUping...</span>
                </span>
              ) : (
                "SignUp"
              )}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-(--primary) pb-3">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="py-2 px-3 md:px-3 lg:px-6 bg-white border rounded-xl hover:scale-110 duration-300 hover:cursor-pointer">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignupComponent;
