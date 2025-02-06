import { useEffect, useState } from "react";
import { About, Carousel, Faq, WhyChooseUs } from "../components";
import LandingLayout from "../layout/LandingLayout";
import axiosInstance from "../apis/axiosIntance.js";
const hello = import.meta.env.VITE_TEST;
console.log(hello);
const Landing = () => {
  const [config, setConfig] = useState({
    carousel: [],
    customer_reviews: [],
    designers: [],
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/landing");
        setConfig(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <LandingLayout>
      <div>
        <header>
          <Carousel data={config.carousel} isLoading={isLoading} />
        </header>
        <main className="bg-gradient-to-b bg-(--background)">
          <section>
            <About />
          </section>
          <section>
              <WhyChooseUs />
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
