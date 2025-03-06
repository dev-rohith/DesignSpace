import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const OtpVerification = ({ length = 4, handleOtpSubmit, handleResendOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef({});
  const { isLoading } = useSelector((store) => store.auth);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100 ">
      <div className="p-8 bg-white  shadow-lg w-full  max-w-xl ">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Enter OTP to Continue
        </h1>

        <div className="flex justify-center gap-3">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-400 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-900 transition-all duration-200 ease-in-out"
              maxLength={1}
            />
          ))}
        </div>

        <button
          disabled={isLoading}
          className="block mt-3 text-sm font-medium italic text-gray-700 hover:text-gray-900 transition-all duration-200 hover:bg-gray-200 px-2 py-1  cursor-pointer"
          onClick={handleResendOtp}
        >
          Resend OTP
        </button>

        <button
          disabled={isLoading}
          onClick={() => handleOtpSubmit(otp.join(""))}
          className="w-full mt-4 px-6 py-2 border-1 text-lg font-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all duration-200 ease-in-out disabled:bg-gray-400 cursor-pointer relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gray-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
          <span className="relative z-10">
            {isLoading ? "Verifying..." : "Submit"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
