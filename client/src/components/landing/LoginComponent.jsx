import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { loginValidation } from "../../utils/validation";

const LoginComponent = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [clientErrors, setClientErrors] = useState({});
  const { isLoading } = useSelector((store) => store.auth);

  function handleSubmit(e) {
    e.preventDefault();
    const Errors = loginValidation(formData);
    if (Object.keys(Errors).length !== 0) {
      setClientErrors(Errors);
    } else {
      handleLogin(formData);
    }
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-(--background) flex rounded-2xl shadow-lg max-w-3xl overflow-hidden items-center max-h-[600px]">
        <div className="md:block hidden  w-1/2 ">
          <img src="https://res.cloudinary.com/dlbyxcswi/image/upload/v1738742215/ch16juqp73u68mb0nwyw.jpg" />
        </div>

        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-(--primary)">Login</h2>
          <p className="text-xs mt-4 text-(--primary)">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                className="p-2 mt-6 rounded-xl border w-full"
                type="email"
                value={formData.email}
                placeholder="Email"
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
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  placeholder="Password"
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 hover:cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </span>
              </div>
              {clientErrors.password && (
                <p className="ml-2 text-red-500 text-xs">
                  {clientErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-(--primary) rounded-xl text-white py-2 hover:scale-105 duration-300 cursor-pointer"
            >
              {isLoading ? (
                <span className="flex items-center text-sm justify-center space-x-2">
                  <Loader className="w-4 h-6 animate-spin" />
                  <span>Login...</span>
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <div className="mt-5 text-xs border-b border-(--primary) py-4 text-(--primary)">
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-(--primary)">
            <p>Don&apos;t have an account?</p>
            <Link to="/signup">
              <button className="py-2 mb-3 px-5 bg-white border rounded-xl hover:scale-110 duration-300 hover:cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginComponent;
