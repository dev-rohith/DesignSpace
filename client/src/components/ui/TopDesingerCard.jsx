const TopDesingerCard = ({ profilePicture, name, aboutMe, className = "" }) => {
  return (
    <div
      className={`w-80 text-center flex-col h-60 bg-gray-50 rounded-xl overflow-hidden border hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <img
        src={profilePicture}
        alt={`Designer ${name}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h4 className="uppercase font-bold text-gray-600 truncate">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-2">{aboutMe}</p>
      </div>
    </div>
  );
};
export default TopDesingerCard;
