import useEmblaCarousel from "embla-carousel-react";

import Autoplay from "embla-carousel-autoplay";
import CarouselItem from "./CarouselItem";

const Carousel = ({ data, isLoading }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <div>
      <h4 className=" font-(--font-display) slide-in-from-left-72 delay-500 absolute top-70 left-20 z-50 uppercase font-bold text-black border-2  bg-white opacity-70 text-3xl px-3 animate-in">
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
