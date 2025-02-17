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
        <main className="bg-gradient-to-b bg-(--background)">
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
          <section>
            <div className="text-center mb-8">
              <h3 className="uppercase text-3xl font-bold text-gray-700">
                Customer Reviews
              </h3>
              <p>What Our Happy customers says</p>
            </div>
            <UserReviews customerReviews={customer_reviews} />
          </section>
          <section>
            <Faq />
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
