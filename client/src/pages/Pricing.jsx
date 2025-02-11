import { TrendingDown } from "lucide-react";
import {
  MinimalPricingCard,
  PopularPricingCard,
 
} from "../components";
import LandingLayout from "../layout/LandingLayout";

const Pricing = () => {
  const handlePurchase = () => {
    
  };

  return (
    <LandingLayout>
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-manrope text-4xl text-center font-bold text-gray-800 mb-4">
              Our pricing plans
            </h2>
            <p className="text-gray-500 text-xl text-center leading-6 mb-12">
              15m free chat trial. No credit card required.
            </p>
            <div className="mb-10 flex justify-center">
              <span className="flex items-center space-x-6">
                <span className="inline-block whitespace-nowrap text-xs leading-4 font-semibold tracking-wide bg-indigo-50 text-indigo-600 rounded-full py-2 px-4">
                  Save 20%
                </span>
                <TrendingDown className="w-10 h-10 text-gray-500" />
              </span>
            </div>

            <div className="tabs">
              <div className="flex justify-center items-center bg-gray-100 rounded-full p-1.5 max-w-sm mx-auto">
                <a className="inline-block w-1/2 text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-indigo-600 tab-active:bg-indigo-600 tab-active:rounded-full tab-active:text-white tablink whitespace-nowrap active">
                  Bill Yearly
                </a>
                <a className="inline-block w-1/2 text-center transition-all duration-500 rounded-full text-gray-400 font-semibold py-3 px-3 lg:px-11 hover:text-indigo-600 tab-active:bg-indigo-600 tab-active:rounded-full tab-active:text-white tablink whitespace-nowrap">
                  Bill Monthly
                </a>
              </div>

              <div
                id="tabs-with-background-1"
                role="tabpanel"
                className="tabcontent mt-12"
              >
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0">
                  <MinimalPricingCard
                    plan="Life time"
                    heading="Free Plan"
                    pricing="0"
                  >
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                    <span className="line-through">
                      Chat with the Designers for 15m free
                    </span>
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                  </MinimalPricingCard>

                  <PopularPricingCard>
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                    <span className="line-through">
                      Chat with the Designers for 15m free
                    </span>
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                  </PopularPricingCard>

                  <MinimalPricingCard
                    plan="Yearly"
                    heading="Advanced Plan"
                    pricing="999"
                    handlePurchase={handlePurchase}
                  >
                    <span>Chat with the Designers for 15m free</span>{" "}
                    <span>Chat with the Designers for 15m free</span>
                    <span className="line-through">
                      Chat with the Designers for 15m free
                    </span>
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                  </MinimalPricingCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Pricing;
