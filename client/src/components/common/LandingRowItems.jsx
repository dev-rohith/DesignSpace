// LandingRowItems.jsx
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LandingRowItems = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 3,
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-6xl px-12 mb-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {children}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-opacity cursor-pointer ${
          !prevBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-opacity cursor-pointer ${
          !nextBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LandingRowItems;