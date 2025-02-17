import { useSelector } from "react-redux";

const CarouselItem = ({
  url,
  resource_type,
  public_id,
  itemHeight = "[400px]",
  handleDelete,
}) => {
  const { isCarouselUpdating } = useSelector((store) => store.landing);

  return (
    <div className="flex-[0_0_100%] min-w-0">
      {resource_type === "image" ? (
        <img
          className={`w-full h-${itemHeight} object-cover`}
          src={url}
          alt="carouselItem"
        />
      ) : (
        <video
          src={url}
          itemType="video/mp4"
          className="w-full object-cover h-[400px]"
          loop
          autoPlay
          muted
        >
          Your browser does not support the video tag.
        </video>
      )}
      {handleDelete && (
        <button
          onClick={() => {
            handleDelete(public_id);
          }}
          disabled={isCarouselUpdating}
          className=" bg-red-400 rounded-lg text-white px-2 py-1 disabled:bg-gray-500 w-full mt-2 hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      )}
    </div>
  );
};
export default CarouselItem;
