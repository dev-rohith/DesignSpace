import { Trash2 } from "lucide-react";

const TopDesignerCard = ({
  profilePicture,
  _id,
  name,
  aboutMe,
  deleteTopDesigner,
}) => {
  return (
    <div className="min-w-100 h-46 mr-2  px-8 flex items-center group relative bg-white border-2 border-gray-600  shadow-md hover:shadow-xl transition-shadow duration-300 ">
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
          className="w-full h-full rounded-full border-4 border-gray-400 group-hover:border-violet-400 shadow-lg object-cover"
        />
      </div>
      <div className="ml-6 flex-1 min-w-0">
        <h4 className="uppercase font-extrabold font-montserrat text-gray-900 text-lg mb-1 truncate">
          {name}
        </h4>
        <div className="h-[60px] overflow-hidden">
          <p className="text-gray-700 text-sm leading-snug line-clamp-3 italic">
            {aboutMe}
          </p>
        </div>
        <div className="mt-3 text-xs font-semibold px-3 py-1  inline-block shadow-md border shadow-amber-200 hover:bg-orange-300 transition">
          Top Designer
        </div>
      </div>
      
    </div>
  );
};

export default TopDesignerCard;
