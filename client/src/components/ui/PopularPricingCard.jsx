import { IndianRupee } from "lucide-react";

const PopularPricingCard = ({ children }) => {
  return (
    <div className="group relative flex flex-col mx-auto w-full max-w-sm text-gray-900 rounded-2xl border border-solid border-gray-300 text-center transition-all duration-500 p-6 xl:p-12 bg-gradient-to-r from-indigo-500 to-violet-600">
      <h3 className="relative flex items-center justify-center font-manrope text-2xl font-bold mb-6 text-white">
        Recomended
        <span className="h-6 px-3 relative rounded-full border border-solid border-gray-100 text-sm ml-4">
          Popular
        </span>
      </h3>
      <div className=" flex flex-col relative">
        <span className="font-manrope text-6xl font-semibold mb-2 text-white">
          <IndianRupee className="inline h-14 w-14 mb-2" />
          499
        </span>
        <span className="text-xl text-gray-300 mb-2">Per Month</span>
        <div className="mt-4 flex flex-col text-sm space-y-2 uppercase text-white">
          {children}
        </div>
      </div>
      <button
        onClick={() => handlePurchase("monthly")}
        className="relative py-2.5 px-5 mt-6 bg-white shadow-sm rounded-full transition-all duration-500 text-base text-indigo-600 font-semibold text-center w-fit mx-auto"
      >
        Purchase Plan
      </button>
    </div>
  );
};
export default PopularPricingCard;
