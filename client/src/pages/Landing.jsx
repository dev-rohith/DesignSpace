import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import LandingLayout from "../layout/LandingLayout";
import { getLanding } from "../features/actions/landingActions";

import {
  About,
  Carousel,
  Faq,
  Footer,
  TopDesingers,
  UserReviews,
  WhyChooseUs,
} from "../components";

const Landing = () => {
  const {
    carousel,
    customer_reviews,
    designers,
    designers_locations,
    isLoading,
    isError,
  } = useSelector((store) => store.landing);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getLanding());
      if (getLanding.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, []);

  return (
    <LandingLayout>
      <>
        <header>
          <Carousel data={carousel} isLoading={isLoading} isError={isError} />
        </header>
        <main>
          <section>
            <About />
          </section>
          <section>
            <WhyChooseUs />
          </section>
          <section>
            <TopDesingers
              data={designers}
              isLoading={isLoading}
              isError={isError}
              designerLocations={designers_locations}
            />
          </section>
          <section className="bg-white">
            <div className="relative w-full h-1 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-green-300 to-transparent animate-flow"></div>
            </div>

            <div className="flex justify-around  items-center">
              <div className="w-full flex items-center justify-center p-6">
                <div className="grid grid-cols-3 gap-6 group relative max-w-lg">
                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/vydktky75po9kmh1saye"
                    alt="Image 1"
                    className="w-full h-28 md:h-36 rounded-lg shadow-lg transform transition-all duration-500 group-hover:rotate-0 rotate-6"
                  />

                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/dgkfkdooy6brl6ibiox0"
                    alt="Image 2"
                    className="w-full h-28 md:h-36 rounded-lg shadow-lg transform transition-all duration-500 group-hover:rotate-0 -rotate-6"
                  />

                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/btthbg4dxe3dldlwlysn"
                    alt="Image 3"
                    className="w-full h-28 md:h-36 rounded-lg shadow-lg transform transition-all duration-500 group-hover:rotate-0 rotate-3"
                  />

                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/fqwxhrt2yevysksk0cvy"
                    alt="Image 4"
                    className="w-full h-28 md:h-36 rounded-lg shadow-lg transform transition-all duration-500 group-hover:rotate-0 -rotate-3"
                  />

                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/outckqv0etzc5cedaxfr"
                    alt="Image 5"
                    className="w-full h-28 md:h-36 rounded-lg shadow-lg transform transition-all duration-500 group-hover:rotate-0 rotate-2"
                  />

                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/dgkfkdooy6brl6ibiox0"
                    alt="Image 6"
                    className="w-full h-28 md:h-36 rounded-lg shadow-lg transform transition-all duration-500 group-hover:rotate-0 -rotate-2"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="text-center my-12 font-sansita">
                  <h3 className="uppercase text-3xl font-bold text-gray-700">
                    Customer Reviews
                  </h3>
                  <p>What Our Happy customers says</p>
                </div>
                <UserReviews customerReviews={customer_reviews} />
              </div>
            </div>
            <div className="relative w-full h-1 bg-green-300 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-flow"></div>
            </div>
          </section>

          <section>
            <Faq />
            <div className="relative w-full h-1 bg-yellow-200 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-flow"></div>
            </div>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    </LandingLayout>
  );
};
export default Landing;
