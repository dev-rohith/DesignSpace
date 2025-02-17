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
    <div className="flex flex-col md:flex-row justify-center bg-gray-300 py-24  items-center mb-12">
      <div>
      <h3 className="text-2xl font-semibold uppercase mb-4">
          Meet our Top Designers
        </h3>
        <p className="text-gray-500 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          quisquam.
        </p>
        <div className="w-full md:max-w-xl  overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4">
            {items.map((item, index) => (
              <TopDesingerCard
                key={`${item._id || index}-${index}`}
                {...item}
                className="flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full mt-10 md:mt-0 md:w-1/2 flex flex-col  justify-center items-center">
        <DesingersMap locations={designerLocations} />
      </div>
    </div>
  );
};

export default TopDesigners;
