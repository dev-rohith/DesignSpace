import { IndianRupee } from "lucide-react";

const PricingCard = ({
  children,
  plan,
  heading,
  handlePurchase,
  normalPrice,
  discountedPrice,
  special = false,
}) => {
  const discount =
    normalPrice && discountedPrice
      ? Math.round(((normalPrice - discountedPrice) / normalPrice) * 100)
      : 0;

  const displayPrice = discountedPrice || normalPrice || 0;

  const baseStyles =
    "flex flex-col mx-auto w-full max-w-sm text-gray-900 border border-solid p-6 xl:p-10 transition-all duration-300";
  const specialStyles = special
    ? "bg-gradient-to-r from-indigo-500 to-violet-600 border-transparent"
    : "border-gray-300 hover:border-indigo-600";

  return (
    <div className={`group relative ${baseStyles} ${specialStyles}`}>
      <h3
        className={`font-manrope text-2xl font-bold mb-6 ${
          special ? "text-white flex items-center justify-center gap-4" : ""
        }`}
      >
        {heading}
        {special && (
          <span className="h-6 px-3 rounded-full border border-solid border-gray-100 text-sm">
            Popular
          </span>
        )}
      </h3>

      <div className="mb-10 flex flex-col">
        <span
          className={`font-manrope text-5xl font-semibold mb-2 ${
            special ? "text-white" : ""
          }`}
        >
          <IndianRupee
            className={`inline mb-2 ${special ? "w-14 h-14" : "w-12 h-12"}`}
          />
          {displayPrice}
        </span>

        {discount > 0 && (
          <span
            className={`text-sm line-through mb-1 ${
              special ? "text-gray-300" : "text-gray-500"
            }`}
          >
            ₹{normalPrice}
          </span>
        )}

        <span
          className={`text-xl ${special ? "text-gray-300" : "text-gray-400"}`}
        >
          {plan}
        </span>

        <div
          className={`mt-4 flex flex-col text-sm space-y-2 uppercase ${
            special ? "text-white" : ""
          }`}
        >
          {children}
        </div>
      </div>

      <button
        onClick={() => handlePurchase(plan)}
        disabled={displayPrice === 0}
        className={`py-2.5 px-5 font-semibold text-base text-center w-fit mx-auto transition-all duration-500 cursor-pointer
          ${
            special
              ? "bg-white text-indigo-600 hover:bg-gray-100"
              : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white hover:bg-indigo-400"
          }
          disabled:hidden hover:-translate-y-0.5`}
      >
        Purchase Plan
      </button>
    </div>
  );
};

export default PricingCard;
