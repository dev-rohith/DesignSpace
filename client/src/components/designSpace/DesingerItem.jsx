import React from "react";
import {
  BookLock,
  Briefcase,
  CalendarCheck,
  Factory,
  IndianRupee,
  Star,
} from "lucide-react";

const DesignerCard = ({
  user,
  starting_price,
  specializations,
  softwareExpertise,
  average_rating,
  position,
  languages_know,
  designStyle,
  aboutMe,
  experience,
  handleChat,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm h-80 overflow-hidden p-1 group  border hover:shadow-md hover:-translate-0.5 hover:bg-fuchsia hover:border hover:border-violet-500  border-violet-50">
      <div className="flex flex-col space-y-2">
        <div className="bg-gradient-to-r from-pink-50/90 to-fuchsia-50/8  group-hover:border group-hover:border-violet-500 group-hover:bg-white rounded-lg p-2.5">
          <div className="flex items-start gap-3">
            <div className="relative">
              <img
                src={user.profilePicture}
                alt={user.firstName}
                className="w-11 h-11 rounded-full object-cover border-2 border-violet-100"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-raleway font-semibold text-gray-900 first-letter:uppercase">
                {user.firstName} {user.lastName}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Briefcase className="w-3.5 h-3.5 mr-1 text-violet-500" />
                  <span className="truncate">{position}</span>
                </div>
                <div className="text-gray-300">•</div>
                <div className="flex items-center">
                  <CalendarCheck className="w-3.5 h-3.5 mr-1 text-violet-500" />
                  <span>{experience}y exp</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-0.5">
          <div className="flex items-center text-base font-medium text-gray-800">
            <span className="text-sm text-gray-600">Starts From :</span>
            <div className="flex items-center">
              <IndianRupee className="w-4 h-4 ml-1 text-violet-500" />
              <span>{starting_price}/hr</span>
            </div>
          </div>
          <div className="flex items-center bg-amber-50 px-2 py-0.5 rounded-full">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="ml-1 text-sm font-medium text-amber-700">
              {average_rating}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {softwareExpertise.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.3 bg-gradient-to-r from-violet-50 to-fuchsia-50 text-violet-700 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {languages_know.map((language) => (
              <span
                key={language}
                className="px-2 py-0.3 bg-blue-50 text-blue-700 rounded-full text-xs"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm">
          <div className="flex items-start gap-1.5">
            <BookLock className="w-3.5 h-3.5 mt-0.5 text-violet-500" />
            <div>
              <span className="text-gray-500 text-xs">Specializes in: </span>
              <span className="text-violet-600 text-xs">
                {specializations.join(" • ")}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <Factory className="w-3.5 h-3.5 mt-0.5 text-violet-500" />
            <div>
              <span className="text-gray-500 text-xs">Design style: </span>
              <span className="text-violet-600 text-xs">
                {designStyle.join(" • ")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start mt-1">
        <p className="text-xs text-gray-600 pl-0.5 pb-0.5  leading-tight h-15 line-clamp-4 first-letter:uppercase">
          {aboutMe}
        </p>
        <button
          onClick={() => handleChat(user._id)}
          className="italic mr-2  self-start bg-gradient-to-tl from-violet-600 to-fuchsia-600 text-white px-6 ring-2 ring-gray-400 rounded hover:scale-105 cursor-pointer"
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default DesignerCard;
