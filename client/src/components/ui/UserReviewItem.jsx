const UserReviewItem = ({ name, review, video }) => {
  return (
    <div className="w-90 h-full bg-white rounded-xl shadow-lg overflow-hidden text-center ml-6 border border-gray-200 transition-transform transform hover:scale-105">
      <div className="w-full h-56 overflow-hidden">
        {video.url ? (
          <video className="w-full h-full object-cover" controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-gray-500 flex items-center justify-center h-full">Video not available</div>
        )}
      </div>
      <div className="text-xl font-bold text-gray-900 my-2">{name}</div>
      <p className="text-gray-700 text-sm leading-relaxed px-4 italic">{review}</p>
    </div>
  );
};

export default UserReviewItem;