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

  return (
    <div
      className={`group relative flex flex-col mx-auto w-full max-w-xs lg:max-w-sm text-gray-900 border-2 border-solid p-4 md:p-6 lg:p-8 hover:-translate-1 transition-all duration-300 ${
        special
          ? "bg-gradient-to-r from-indigo-400 via-purple-500 to-violet-600 border-transparent  hover:shadow-lg shadow-violet-400 "
          : "border-gray-300 hover:border-indigo-600"
      }`}
    >
      <h3
        className={`font-manrope text-lg md:text-xl lg:text-2xl font-sansita font-bold mb-4 ${
          special ? "text-white flex items-center justify-center gap-3" : ""
        }`}
      >
        {heading}
        {special && (
          <span className="h-5 px-2 lg:px-3  rounded-full border font-montserrat border-solid border-gray-100 text-xs ">
            Popular
          </span>
        )}
      </h3>

      <div className="mb-6 flex flex-col">
        <span
          className={`font-manrope text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 ${
            special ? "text-white" : ""
          }`}
        >
          <IndianRupee
            className={`inline mb-1 ${
              special
                ? "w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
                : "w-8 h-8 md:w-10 md:h-10"
            }`}
          />
          {displayPrice}
        </span>

        {discount > 0 && (
          <span
            className={`text-xs md:text-sm line-through mb-1 ${
              special ? "text-gray-300" : "text-gray-500"
            }`}
          >
            ₹{normalPrice}
          </span>
        )}

        <span
          className={`text-sm md:text-base lg:text-lg ${
            special ? "text-gray-300" : "text-gray-400"
          }`}
        >
          {plan}
        </span>

        <div
          className={`mt-3 flex flex-col font-semibold text-[10px] md:text-xs lg:text-sm space-y-1 font-raleway uppercase ${
            special ? "text-white" : ""
          }`}
        >
          {children}
        </div>
      </div>

      <button
        onClick={() => handlePurchase(plan)}
        disabled={displayPrice === 0}
        className={`py-2 px-4 md:py-3 md:px-6 font-semibold text-sm md:text-base text-center w-fit mx-auto transition-all duration-500 cursor-pointer
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
