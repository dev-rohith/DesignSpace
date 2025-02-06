import { useState } from "react";
import { Link } from "react-router-dom";

const SignupComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
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
          <p className="text-xs mt-2 text-(--primary)">Become a new member now</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-4 rounded-xl border"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
            />
            <input
              className="p-2 rounded-xl border"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
            />
            <input
              className="p-2 rounded-xl border"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              placeholder="Confirm Pasword"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
            />
            <button className="bg-(--primary) rounded-xl text-white py-2 hover:scale-105 duration-300">
              Register
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-(--primary)">
            <svg
              width="25px"
              className="mr-3"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m43.611 20.083h-1.611v-0.083h-18v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657c-3.572-3.329-8.35-5.382-13.618-5.382-11.045 0-20 8.955-20 20s8.955 20 20 20 20-8.955 20-20c0-1.341-0.138-2.65-0.389-3.917z"
                fill="#FFC107"
              />
              <path
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                fill="#FF3D00"
              />
              <path
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                fill="#4CAF50"
              />
              <path
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                fill="#1976D2"
              />
            </svg>
            Continue with Google
          </button>

          <div className="mt-5 border-b border-(--primary) py-4]"></div>

          <div className="mt-3 text-xs flex justify-between items-center text-(--primary)">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 hover:cursor-pointer">
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
