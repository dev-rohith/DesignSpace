import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Loader, Sparkles } from "lucide-react";
import axiosInstance from "../apis/axiosIntance";
import toast from "react-hot-toast";
import { passwordResetValidation } from "../utils/validation";

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = passwordResetValidation(formData);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      console.log(errors);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(`/auth/resetPassword/${token}`, {
        password: formData.password,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
        <div className="w-full p-6 bg-white  shadow border mt-6 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            <div>
              {errors?.password && (
                <p className="text-red-500 text-xs ">{errors.password}</p>
              )}
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              {errors?.confirmPassword && (
                <p className="text-red-500 text-xs ">
                  {errors.confirmPassword}
                </p>
              )}

              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5"
                required
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium  text-sm px-5 py-2.5 text-center"
            >
              {isLoading ? (
                <span className="flex items-center text-sm justify-center space-x-2">
                  <Loader className="w-4 h-6 animate-spin" />
                  <span>Reseting Your Password...</span>
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
export default ResetPassword;
