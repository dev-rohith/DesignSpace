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
              <div className="w-full h-full ml-10">
                <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/vydktky75po9kmh1saye"
                    alt="Main"
                    className="absolute w-64 h-48 md:w-80 md:h-60 rounded-lg shadow-lg z-10 animate-move-image1 brightness-110 contrast-90"
                  />
                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/dgkfkdooy6brl6ibiox0"
                    alt="Right"
                    className="absolute top-10 right-10 w-32 h-32 md:w-40 md:h-40 rounded-lg shadow-lg z-20 animate-move-image2"
                  />
                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/btthbg4dxe3dldlwlysn"
                    alt="Left"
                    className="absolute object-cover bottom-10 left-10 w-40 h-40 md:w-54 md:h-44 rounded-lg shadow-lg z-20 animate-move-image3"
                  />
                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/fqwxhrt2yevysksk0cvy"
                    alt="Top Left"
                    className="absolute top-5 left-20 w-28 h-28 md:w-36 md:h-36 rounded-lg shadow-lg z-10 animate-move-image4"
                  />
                  <img
                    src="https://res.cloudinary.com/dlbyxcswi/image/upload/f_auto,q_auto/v1/product_uploads/outckqv0etzc5cedaxfr"
                    alt="Bottom Right"
                    className="absolute bottom-5 right-20 w-28 h-28 md:w-36 md:h-36 rounded-lg shadow-lg z-10 animate-move-image5"
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
