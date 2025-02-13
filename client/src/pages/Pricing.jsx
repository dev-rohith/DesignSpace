import { Key, TrendingDown } from "lucide-react";
import { PricingCard } from "../components";
import LandingLayout from "../layout/LandingLayout";
import { useEffect } from "react";
import { getSubscriptionsDetails } from "../features/landingApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { onPayment } from "../features/paymentAPI";
import axios from "axios";
import { use } from "react";
import axiosInstance from "../apis/axiosIntance";

const Pricing = () => {
  const { subscriptions_prices } = useSelector((store) => store.landing);

  const dispatch = useDispatch();

  useEffect(() => {
    (async (params) => {
      const actionResult = await dispatch(getSubscriptionsDetails(params));
      if (getSubscriptionsDetails.rejected.match(actionResult)) {
        toast.error(actionResult.payload);
      }
    })();
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handlePurchase = async (plan) => {
    console.log(plan);

    const actionResult = await dispatch(onPayment(plan));
    if (onPayment.fulfilled.match(actionResult)) {
      console.log(actionResult.payload);
      const data = actionResult.payload;
      console.log(data.key);
      const options = {
        key: data.key, // Enter the Key ID generated from the Dashboard
        amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp", //customer name from db
        description: "Test Transaction", //decription of the order
        image: "https://example.com/your_logo", //Customer profile pic
        order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          axiosInstance
            .post("payment/verify-payment", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else if (onPayment.rejected.match(actionResult)) {
      toast.error(actionResult.payload);
    }
  };

  if (!subscriptions_prices) return null;

  const {
    monthly_price,
    discounted_monthly_price,
    yearly_price,
    discounted_yearly_price,
  } = subscriptions_prices;

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
                  <PricingCard plan="Life time" heading="Free Plan" pricing="0">
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                    <span className="line-through">
                      Chat with the Designers for 15m free
                    </span>
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                  </PricingCard>

                  <PricingCard
                    special
                    plan="Monthly"
                    heading="Advanced Plan"
                    handlePurchase={handlePurchase}
                    normalPrice={monthly_price}
                    discountedPrice={discounted_monthly_price}
                  >
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                    <span className="line-through">
                      Chat with the Designers for 15m free
                    </span>
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                  </PricingCard>

                  <PricingCard
                    plan="Yearly"
                    heading="Advanced Plan"
                    handlePurchase={handlePurchase}
                    normalPrice={yearly_price}
                    discountedPrice={discounted_yearly_price}
                  >
                    <span>Chat with the Designers for 15m free</span>{" "}
                    <span>Chat with the Designers for 15m free</span>
                    <span className="line-through">
                      Chat with the Designers for 15m free
                    </span>
                    <span>Chat with the Designers for 15m free</span>
                    <span>Chat with the Designers for 15m free</span>
                  </PricingCard>
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
