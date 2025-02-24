import { Loader, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../apis/axiosIntance";
import toast from "react-hot-toast";
import { useState } from "react";
const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/forgetPassword", {
        email: e.target.email.value,
      });
      toast.success(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <div className="relative flex items-center justify-center">
            <img className="w-40 h-18 mr-2" src="/logo.svg" alt="logo" />
            <Sparkles
              className="absolute -top-3 -left-3 text-yellow-400 animate-ping"
              size={20}
            />
            <Sparkles
              className="absolute top-0 right-5 text-yellow-400 animate-pulse"
              size={18}
            />
            <Sparkles
              className="absolute bottom-2 -left-5 text-yellow-400 animate-bounce"
              size={22}
            />
            <Sparkles
              className="absolute -bottom-3 right-3 text-yellow-400 animate-spin"
              size={19}
            />
          </div>
        </Link>
        <div className="w-full p-6 bg-white shadow border md:mt-0 sm:max-w-md sm:p-8">
          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              <span className="font-medium">{error}</span>
            </div>
          )}
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-500">
            Don't fret! Just type in your email and we will send you a code to
            reset your password!
          </p>
          <form
            onSubmit={handleFormSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="#"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium text-sm px-5 py-2.5 text-center cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center text-sm justify-center space-x-2">
                  <Loader className="w-4 h-6 animate-spin" />
                  <span>Sending Reset Password Link...</span>
                </span>
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
