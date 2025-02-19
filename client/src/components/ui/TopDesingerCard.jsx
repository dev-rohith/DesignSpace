import { Trash2 } from "lucide-react";

const TopDesignerCard = ({
  profilePicture,
  _id,
  name,
  aboutMe,
  deleteTopDesigner,
}) => {
  return (
    <div className="min-w-100 h-46 mr-2  px-8 flex items-center group relative bg-gradient-to-r from-orange-200 via-yellow-100 to-rose-100 rounded-2xl border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300 hover:from-orange-300 hover:to-rose-200">
      {deleteTopDesigner && (
        <button
          onClick={() => deleteTopDesigner(_id)}
          className="absolute top-2 left-2 w-9 h-9 p-2 rounded-lg bg-white shadow-md text-red-500 hover:bg-red-100 cursor-pointer transition-all"
        >
          <Trash2 className="w-full h-full" />
        </button>
      )}

      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={profilePicture}
          alt={`Designer ${name}`}
          className="w-full h-full rounded-full border-4 border-gray-400 group-hover:border-orange-500 shadow-lg object-cover"
        />
      </div>
      <div className="ml-6 flex-1 min-w-0">
        <h4 className="uppercase font-extrabold text-gray-900 text-lg mb-1 truncate">
          {name}
        </h4>
        <div className="h-[60px] overflow-hidden">
          <p className="text-gray-700 text-sm leading-snug line-clamp-3 italic">
            {aboutMe}
          </p>
        </div>
        <div className="mt-3 text-xs font-semibold text-gray-700 bg-orange-200 px-3 py-1 rounded-full inline-block shadow-sm hover:bg-orange-300 transition">
          Top Designer
        </div>
      </div>
    </div>
  );
};

export default TopDesignerCard;
