const UserReviewItem = ({ name, review, video}) => {
  return (
    <div className="text-center w-90 bg-gray-100 pb-6 ml-4">
     <video className="w-full h-50 object-cover" controls>
      <source src={video.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      <div className="font-semibold text-xl">{name}</div>
      <p className="p-2 font-light">{review}</p>
    </div>
  )
}
export default UserReviewItem