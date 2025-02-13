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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Enter OTP to Continue
        </h1>
        <div className="flex gap-4 justify-center">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out transform focus:scale-105"
              maxLength={1}
            />
          ))}
        </div>
        <button
          disabled={isLoading}
          className="disabled:text-gray-600 block text-start pl-3 mt-2 lowercase font-semibold text-red-500 hover:cursor-pointer"
          onClick={handleResendOtp}
        >
          Resend Otp
        </button>
        <button
          disabled={isLoading}
          onClick={() => handleOtpSubmit(otp.join(""))}
          className=" mt-2 px-6 py-2 ml-40 bg-purple-600 text-white rounded-lg border border-violet-800 disabled:bg-gray-400 disabled:border-none  hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 ftransition-all duration-200 ease-in-out hover:cursor-pointer "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
