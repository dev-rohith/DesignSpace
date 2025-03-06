import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import DesingersMap from "./DesingersMap";
import TopDesingerCard from "../ui/TopDesingerCard";

const TopDesigners = ({ data = [], designerLocations }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems([...data, ...data, ...data]);
  }, [data]);

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: false,
        speed: 1,
      }),
    ]
  );

  return (
    <div className="flex flex-col md:flex-row  items-center justify-center py-24   relative ">
      <div className="w-xl ">
        <h3 className="text-2xl font-sansita font-semibold uppercase mb-4">
          Meet our Top Designers
        </h3>
        <p className="text-gray-500 mb-4 font-raleway">
          Discover the world’s finest designers, crafting stunning creations
          with passion. Their artistry and innovation redefine fashion and
          style. Experience the brilliance of talent that inspires the future of
          design.
        </p>
        <div className="w-full md:max-w-xl  overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4">
            {items.map((item, index) => (
              <TopDesingerCard
                key={`${item._id || index}-${index}`}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mt-10  md:ml-20 md:mt-0 md:w-1/2 flex flex-col justify-center items-center">
        <div className="w-xl">
          <h4 className="text-2xl font-sansita uppercase mb-2">
            🌍 Top Designers Across the Globe
          </h4>
          <p className="text-gray-500 mb-4 font-raleway ">
            Discover the locations of our most talented designers. See where
            creativity thrives and innovation begins!
          </p>
        </div>
        <DesingersMap locations={designerLocations} />
      </div>
      
    </div>
  );
};

export default TopDesigners;
