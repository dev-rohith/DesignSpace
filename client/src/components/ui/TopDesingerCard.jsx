const TopDesignerCard = ({ profilePicture, name, aboutMe, className = "" }) => {
  return (
    <div
      className={`w-96 h-46 my-2 p-6 flex items-center bg-gradient-to-r from-gray-300 to-gray-100 rounded-2xl overflow-hidden border border-gray-400 shadow-lg hover:shadow-2xl transition-shadow duration-300 ${className}`}
    >
      <div className="w-28 h-28 flex-shrink-0">
        <img
          src={profilePicture}
          alt={`Designer ${name}`}
          className="w-full h-full rounded-full border-4 border-gray-500 shadow-lg object-cover"
        />
      </div>
      <div className="ml-6 flex-1">
        <h4 className="uppercase font-extrabold text-gray-900 text-xl mb-2 truncate">
          {name}
        </h4>
        <p className="text-gray-700 text-sm leading-snug line-clamp-3 italic">
          {aboutMe}
        </p>
        <div className="mt-3 text-xs font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded-full inline-block shadow-sm">
          Top Designer
        </div>
      </div>
    </div>
  );
};

export default TopDesignerCard;
