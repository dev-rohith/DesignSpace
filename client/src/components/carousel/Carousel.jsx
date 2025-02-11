import useEmblaCarousel from "embla-carousel-react";

import Autoplay from "embla-carousel-autoplay";
import CarouselItem from "./CarouselItem";

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
    <div>
      <h4 className=" font-mono slide-in-from-left-72 delay-500 absolute top-70 left-20 z-50 uppercase font-bold text-black border-2  bg-white opacity-70 text-3xl px-3 animate-in">
        Designs Meet Reality
      </h4>
      <div className="overflow-hidden" ref={emblaRef}>
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
