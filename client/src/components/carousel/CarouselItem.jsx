const CarouselItem = ({ url, resource_type }) => {
  return (
    <div className="flex-[0_0_100%] min-w-0">
      {resource_type === "image" ? (
        <img
          className="w-full h-[400px] object-cover"
          src={url}
          alt="carouselItem"
        />
      ) : (
        <video src={url} itemType="video/mp4" className="w-full object-cover h-[400px]" loop autoPlay muted>
        Your browser does not support the video tag.
      </video>
      )}
    </div>
  );
};
export default CarouselItem;
