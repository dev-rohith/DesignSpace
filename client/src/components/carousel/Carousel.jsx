import useEmblaCarousel from "embla-carousel-react";

import Autoplay from "embla-carousel-autoplay";
import CarouselItem from "./CarouselItem";
import { Link } from "react-router-dom";

const Carousel = ({ data, isLoading, isError }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  if (isLoading)
    return (
      <div>
        <div className="flex">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-72 h-72 bg-gray-200 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );

  if (isError || data.length === 0)
    return (
      <div className="relative">
        <h4 className=" font-mono slide-in-from-left-30 delay-500 absolute top-40 left-20 z-50 uppercase font-bold text-black border-2  bg-white opacity-70 text-3xl px-3 animate-in">
          Designs Meet Reality
        </h4>
        <img
          className="h-90 w-full"
          src="https://res.cloudinary.com/dlbyxcswi/image/upload/v1738900941/product_uploads/mqha4nehole0irkps5he.jpg"
          alt=""
        />
      </div>
    );

  return (
    <div className="flex bg-gray-50 pb-10 ">
      <div className="relative md:w-full invisible md:visible ">
        <div className=" absolute  md:top-6 left-25 md:z-40 ">
          <div className="relative w-xl">
            <div className="relative">
              <h4
                className="font-vibes font-bold text-5xl z-20 tracking-wide py-4 absolute top-14 left-20 
  bg-gradient-to-r from-violet-500 via-purple-400 to-pink-500 text-transparent bg-clip-text 
  drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]"
              >
                Designs Meet Reality
              </h4>

              <p
                className="font-montserrat font-semibold w-sm text-md absolute top-30 left-22 
  bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text 
  drop-shadow-[1px_1px_1px_rgba(0,0,0,0.2)]"
              >
                Elevating creativity with seamless collaboration, bringing
                designs to life.
              </p>

              <img
                src="/svgs/violet-flower.svg"
                alt="flower"
                className="w-10 h-10 absolute top-7 left-24 animate-spin duration-[4s]"
              />
              <img
                src="/svgs/violet-flower.svg"
                alt="flower"
                className="w-12 h-12 absolute top-20 left-9 animate-spin duration-[6s] "
              />
              <img
                src="/svgs/flower2.svg"
                alt="flower"
                className="w-9 h-9 absolute top-10 left-12 animate-spin-reverse"
              />

              <img
                src="/svgs/flower1.svg"
                alt="flower"
                className="w-4 h-4 absolute top-30 right-22 animate-ping duration-[5s]"
              />
              <img
                src="/svgs/leaf3.svg"
                alt="flower"
                className="w-4 h-4 absolute top-18 right-38 animate-ping duration-[6s]"
              />

              <img
                src="/svgs/leaf1.svg"
                alt="flower"
                className="w-4 h-4 absolute top-17 left-52 animate-ping duration-[5s]"
              />
              <img
                src="/svgs/leaf3.svg"
                alt="flower"
                className="w-4 h-4 absolute top-17 right-60  animate-ping duration-[4s]"
              />

              <img
                src="/svgs/leaf2.svg"
                alt="flower"
                className="w-10 h-10 absolute top-16 right-16 "
              />
            </div>
            <div className="absolute top-48 left-21 ">
              <p className=" font-raleway">Enter into the Design Space now</p>
              <Link
                to="/design-space"
                className="block mt-2 w-max font-semibold uppercase text-gray-700 border-2 border-gray-500 px-8 py-2 hover:bg-gray-700 hover:text-white cursor-pointer"
              >
                Design Space
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="overflow-hidden lg:w-7xl mt-2 ml-auto mr-4 rounded-xl"
        ref={emblaRef}
      >
        <div className="flex">
          {data.map((item) => (
            <CarouselItem key={item?.public_id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
