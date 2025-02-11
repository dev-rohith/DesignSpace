import { IndianRupee } from "lucide-react";

const MinimalPricingCard = ({ children, plan, heading, pricing, handlePurchase }) => {
  return (
    <div className="group relative flex flex-col mx-auto w-full max-w-sm text-gray-900 rounded-2xl border border-solid border-gray-300 text-center transition-all duration-300 p-6 xl:p-10 hover:border-indigo-600">
      <h3 className="font-manrope text-2xl font-bold mb-6">{heading}</h3>
      <div className="mb-10 flex flex-col">
        <span className="font-manrope text-5xl font-semibold mb-2 ">
          <IndianRupee className="w-12 mb-2  h-12 inline " />
          {pricing}
        </span>
        <span className="text-xl text-gray-400">{plan}</span>
        <div className="mt-4 flex flex-col text-sm space-y-2 uppercase">
          {children}
        </div>
      </div>
      <button onClick={()=>handlePurchase(plan)} disabled={pricing == 0}  className="py-2.5 px-5 bg-indigo-50 shadow-sm rounded-full transition-all duration-500 text-base text-indigo-600 font-semibold text-center w-fit mx-auto group-hover:bg-indigo-600 group-hover:text-white hover:cursor-pointer hover:bg-indigo-400 hover:-translate-0.5 disabled:hidden">
        Purchase Plan
      </button>
    </div>
  );
};
export default MinimalPricingCard;
