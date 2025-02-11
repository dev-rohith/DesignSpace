import {
  BookLock,
  Briefcase,
  CalendarCheck,
  Factory,
  IndianRupee,
  Star,
} from "lucide-react";

const DesingerItem = ({
  user,
  starting_price,
  specializations,
  softwareExpertise,
  ratings,
  position,
  languages_know,
  designStyle,
  aboutMe,
  experience,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="p-6 space-y-4">
        {/* Header Section */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-50 group-hover:border-blue-100 transition-colors"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors cursor-pointer truncate">
              {user.firstName} {user.lastName}
            </h3>

            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center text-sm text-gray-600">
                <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{position}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CalendarCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{experience} years of experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price and Rating Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-lg font-semibold text-gray-800">
            <span>Starting at</span>
            <IndianRupee className="w-5 h-5 mx-1" />
            <span>{starting_price}/hr</span>
          </div>
          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-700">4.9</span>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="flex flex-wrap gap-2">
          {softwareExpertise.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Languages Section */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600">
          <span className="font-medium">Languages:</span>
          {languages_know.map((language, index) => (
            <div key={language}>
              <span className="text-gray-700">{language}</span>
              {index < languages_know.length - 1 && (
                <span className="text-gray-400">•</span>
              )}
            </div>
          ))}
        </div>

        {/* Specializations Section */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <BookLock className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-medium">Specializations:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {specializations.map((item, index) => (
                <span key={item} className="text-gray-700">
                  {item}
                  {index < specializations.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Design Style Section */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <Factory className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-medium">Design Style:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {designStyle.map((item, index) => (
                <span key={item} className="text-gray-700">
                  {item}
                  {index < designStyle.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="text-sm text-gray-600 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
          {aboutMe}
        </div>
      </div>
    </div>
  );
};
export default DesingerItem;
