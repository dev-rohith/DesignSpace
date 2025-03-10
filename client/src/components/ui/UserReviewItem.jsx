import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";

const UserReviewItem = ({ name, review, video, deleteUserReview }) => {
  const { isReviewsUpdating } = useSelector((store) => store.landing);
  return (
    <div className="w-90 h-full bg-white rounded-xl shadow-lg overflow-hidden text-center ml-6 border border-gray-200 transition-transform transform hover:scale-105">
      <div className="w-full max-h-60 overflow-hidden">
        {deleteUserReview && (
          <button
            onClick={() => {
              deleteUserReview(video.public_id);
            }}
            disabled={isReviewsUpdating}
            className="absolute z-80 top-0 left-0 w-11 h-14 p-2 rounded-tl-lg  text-red-500 cursor-pointer bg-white  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-full h-full" />
          </button>
        )}
        {video.url ? (
          <video className="w-full h-50 object-cover" controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-gray-500 flex items-center justify-center h-full">
            Video not available
          </div>
        )}
      </div>
      <div className="text-xl font-bold font-sansita text-gray-900 mb-2 mt-1  first-letter:uppercase">{name}</div>
      <p className="text-gray-700 text-sm  px-4 italic leading-tight">
        {review}
      </p>
    </div>
  );
};

export default UserReviewItem;
