import { useEffect, useState } from "react";
import { About, Carousel, Faq, TopDesingers, WhyChooseUs } from "../components";
import LandingLayout from "../layout/LandingLayout";
import axiosInstance from "../apis/axiosIntance.js";
import toast from "react-hot-toast";
const hello = import.meta.env.VITE_TEST;

const Landing = () => {
  const [config, setConfig] = useState({
    carousel: [],
    customer_reviews: [],
    designers: [],
    designers_locations: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/landing");
        setConfig(response.data);
      } catch (error) {
        setIsError(true);
        toast.error(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <LandingLayout>
      <div>
        <header>
          <Carousel
            data={config.carousel}
            isLoading={isLoading}
            isError={isError}
          />
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
              data={config.designers}
              isLoading={isLoading}
              isError={isError}
            />
          </section>
          <section>
            <Faq />
          </section>
        </main>
      </div>
    </LandingLayout>
  );
};
export default Landing;
