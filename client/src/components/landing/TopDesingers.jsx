import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

const TopDesigners = ({ data = [] }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false })
  ]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mb-12">
      <div className="w-full md:w-1/2 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {data.map((item, index) => (
            <Card 
              key={item._id || index} 
              {...item} 
              className="flex-shrink-0"
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 text-center">
        <h3 className="text-2xl font-semibold uppercase mb-4">
          Meet our Top Designers
        </h3>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          quisquam.
        </p>
      </div>
    </div>
  );
};

const Card = ({ profilePicture, name, aboutMe, className = '' }) => {
  return (
    <div className={`w-80 text-center flex-col h-60 bg-gray-50 rounded-xl overflow-hidden border ${className}`}>
      <img
        src={profilePicture}
        alt="top-designer"
        className="w-full h-40 object-cover"
      />
      <div>
        <h4 className="uppercase font-bold text-gray-600">{name}</h4>
        <p className="text-gray-500">{aboutMe}</p>
      </div>
    </div>
  );
};

export default TopDesigners;