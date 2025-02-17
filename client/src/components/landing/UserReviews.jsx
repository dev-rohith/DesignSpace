import { useCallback, useEffect, useState } from "react";
import UserReviewItem from "../ui/UserReviewItem";
import useEmblaCarousel from "embla-carousel-react";

const UserReviews = ({ customerReviews }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: true,
    dragFree: true,
    slidesToScroll: 1,
  });

  useEffect(() => {
    if (customerReviews?.length > 0) {
      setIsLoaded(true);
    }
  }, [customerReviews]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="relative px-20 mb-10">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {customerReviews?.map((review) => (
            <div key={review?._id} className="flex">
              <UserReviewItem {...review} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        onClick={scrollPrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        onClick={scrollNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default UserReviews;
