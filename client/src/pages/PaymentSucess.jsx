import { useLocation, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  Smile,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 p-6">
      <div className="relative w-full max-w-lg bg-white shadow-2xl border border-gray-300 p-8 rounded-2xl text-center animate-fade-in">
        
        <div className="flex items-center justify-center bg-violet-100 w-24 h-24 rounded-full mx-auto mb-6 shadow-lg">
          <BadgeCheck className="text-violet-500 w-16 h-16" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
        <p className="text-gray-600 text-lg">
          Your subscription to{" "}
          <span className="font-semibold text-violet-500">Design Space</span> is now active.
        </p>

        <div className="mt-6 p-6 bg-violet-50 border border-violet-200 rounded-lg space-y-4 text-left">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-violet-500" />
            <p className="text-gray-800">
              <span className="font-medium">Plan:</span>{" "}
              <span className="text-violet-600">{data?.data?.plan.toUpperCase()}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-violet-500" />
            <p className="text-gray-800">
              <span className="font-medium">Payment ID:</span>{" "}
              <span className="text-gray-700">{data?.data?.paymentId}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CalendarCheck className="w-6 h-6 text-violet-500" />
            <p className="text-gray-800">
              <span className="font-medium">Expiry Date:</span>{" "}
              <span className="text-gray-700">
                {new Date(data?.data?.expiryDate).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-left space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">What’s Next?</h2>
          <div className="flex items-center gap-3">
            <Smile className="w-6 h-6 text-violet-500" />
            <p className="text-gray-700">
              Start creating amazing designs with{" "}
              <span className="font-semibold text-violet-500">Design Space</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-violet-500" />
            <p className="text-gray-700">
              Unlock premium tools and templates to bring your ideas to life.
            </p>
          </div>
        </div>

        <button
          className="mt-8 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-3 px-6 flex items-center justify-center gap-2 rounded-lg transition-all transform hover:scale-105 shadow-md"
          onClick={() => navigate("/design-space")}
        >
          Go to Design Space <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
