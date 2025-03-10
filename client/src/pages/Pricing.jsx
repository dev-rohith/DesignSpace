import { Key, TrendingDown } from "lucide-react";
import { PricingCard, Spinner } from "../components";
import LandingLayout from "../layout/LandingLayout";
import { useEffect } from "react";
import { getSubscriptionsDetails } from "../features/actions/landingActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { onPayment } from "../features/actions/paymentActions";
import axiosInstance from "../apis/axiosIntance";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { subscriptions_prices, isLoading } = useSelector(
    (store) => store.landing
  );
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (!user) {
      navigate("/login");
      return;
    }

    const actionResult = await dispatch(onPayment(plan));
    if (onPayment.fulfilled.match(actionResult)) {
      console.log(actionResult.payload);
      const data = actionResult.payload;
      console.log(data.key);
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.order.id,
        handler: function (response) {
          axiosInstance
            .post("payment/verify/subcription", {
              plan: plan,
              userId: user._id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            })
            .then((res) => {
              toast.success(res.data.message);

              navigate("/design-space/payment-sucess", { state: res.data });
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
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

  if (isLoading) return <Spinner />;

  if (!subscriptions_prices)
    return (
      <LandingLayout>
        <div className="flex justify-center items-center h-screen">
          <h6 className="text-2xl font-semibold">
            No subscriptions found At this moment
          </h6>
        </div>
      </LandingLayout>
    );

  return (
    <LandingLayout>
      <section className="mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-montserrat text-3xl text-center font-bold text-gray-800 mb-1">
              Our pricing plans
            </h2>
            <p className="text-gray-500  text-lg text-center font-raleway  mb-2">
              20 free messages as trial. You can always upgrade 100% secure
              payments with Razorpay.
            </p>

            <div className="tabs mt-6">
              <div
                id="tabs-with-background-1"
                role="tabpanel"
                className="tabcontent mt-6"
              >
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-8 lg:space-y-0">
                  <PricingCard plan="Life time" heading="Free Plan" pricing="0">
                    <ul className="text-left list-disc list-outside pl-5">
                      <li>Chat with the Designers Upto 20 messages</li>
                      <li>Get Your personalized Interior Designs</li>
                      <li className="line-through">
                        Ask personalized Questions to the Designers
                      </li>
                      <li className="line-through">
                        Dedicated Team Support from Design Space
                      </li>
                      <li className="line-through">
                        Personalized project Support
                      </li>
                      <li className="line-through">
                        Extra discount and cash coupons Upon purchase
                      </li>
                      <li className="line-through">
                        End to End Interior crafting by design space associate
                        team
                      </li>
                      <li className="line-through">
                        Dedicated Personal assistant from design space up to
                        project completion
                      </li>
                    </ul>
                  </PricingCard>

                  <PricingCard
                    special
                    plan="Monthly"
                    heading="Premium Plan"
                    handlePurchase={handlePurchase}
                    normalPrice={monthly_price}
                    discountedPrice={discounted_monthly_price}
                  >
                    <ul className="text-left list-disc list-outside pl-5">
                      <li>Unlimited chat for 1 Month</li>
                      <li className="line-through">
                        Dedicated Team Support from Design Space
                      </li>
                      <li>Personalized project Support</li>
                      <li>Extra discount and cash coupons Upon purchase</li>
                      <li className="line-through">
                        End to End Interior crafting by design space associate
                        team
                      </li>
                      <li className="line-through">
                        Dedicated Personal assistant from design space up to
                        project completion
                      </li>
                    </ul>
                  </PricingCard>

                  <PricingCard
                    plan="Yearly"
                    heading="Advanced Plan"
                    handlePurchase={handlePurchase}
                    normalPrice={yearly_price}
                    discountedPrice={discounted_yearly_price}
                  >
                    <ul className="text-left list-disc list-outside pl-5">
                      <li>Unlimited chat for 1 Year</li>
                      <li>Dedicated Team Support from Design Space</li>
                      <li>Personalized project Support</li>
                      <li>Extra discount and cash coupons Upon purchase</li>
                      <li>
                        End to End Interior crafting by design space associate
                        team
                      </li>
                      <li>
                        Dedicated Personal assistant from design space up to
                        project completion
                      </li>
                    </ul>
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
