import { useState } from "react";
import { Link } from "react-router-dom";

const SignupComponent = ({ handleSignup }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [clientErrors, setClientErrors] = useState({});

  function runValidations() {
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      errors.firstName = "First name must contain only letters";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      errors.lastName = "Last name must contain only letters";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const Errors = runValidations();
    if (Object.keys(Errors).length !== 0) {
      setClientErrors(Errors);
    } else {
      const { firstName, lastName, email, password } = formData;
      handleSignup({ firstName, lastName, email, password });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      {/* <!-- login container --> */}
      <div className="bg-(--background) flex rounded-2xl shadow-lg max-w-3xl items-center overflow-hidden max-h-[600px]">
        {/* <!-- image --> */}
        <div className="md:block hidden w-1/2">
          <img src="https://res.cloudinary.com/dlbyxcswi/image/upload/v1738742215/kxnoiqgszkxxffture5y.jpg" />
        </div>
        {/* <!-- form --> */}
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
              Register
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
