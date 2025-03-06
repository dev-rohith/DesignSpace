import React from "react";
import { Calendar, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const TaskFeedItem = ({
  _id,
  name,
  description,
  status,
  priority,
  startDate,
  dueDate,
  address,
  associate,
  designer,
  handleView
}) => {

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col  lg:flex-row items-start lg:items-center gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 ">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize
              ${priority === "urgent" && "bg-red-50 text-red-600"}
              ${priority === "high" && "bg-orange-50 text-orange-600"}
              ${priority === "medium" && "bg-yellow-50 text-yellow-600"}
              ${priority === "low" && "bg-green-50 text-green-600"}`}
            >
              {priority}
            </span>
          </div>

          <p className="text-gray-600 text-sm">{description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {format(new Date(startDate), "MMM d, yyyy")}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {format(new Date(dueDate), "MMM d, yyyy")}
            </div>

            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span className="capitalize">{status}</span>
            </div>
          </div>
        </div>
        <div className="w-2xl">
          {address && (
            <div className="border border-gray-300 rounded-lg p-4 text-sm text-gray-700 w-fit">
              <h5 className="uppercase font-bold">Address: </h5>
              <p className="font-medium">
                {address.house_number}, {address.street}
              </p>
              <p>
                {address.city}, {address.state}
              </p>
              <p>
                {address.country} - {address.postal_code}
              </p>
            </div>
          )}
        </div>
        {associate && (
          <div className="border flex items-center gap-4 border-gray-300 rounded-lg p-4 text-sm text-gray-700 w-fit ">
            <div>
              <img
                src={associate.profilePicture}
                alt="desinger"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h5 className="uppercase font-bold">associate: </h5>
              <p className="font-medium">
                {associate.firstName} {associate.lastName}
              </p>
              <p>{associate.email}</p>
              <p>{associate.phone}</p>
            </div>
          </div>
        )}

        {designer && (
          <div className="border flex items-center gap-4 border-gray-300 rounded-lg p-4 text-sm text-gray-700 w-fit ">
            <div>
              <img
                src={designer.profilePicture}
                alt="desinger"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h5 className="uppercase font-bold">Designer: </h5>
              <p className="font-medium">
                {designer.firstName} {designer.lastName}
              </p>
              <p>{designer.email}</p>
              <p>{designer.phone}</p>
            </div>
          </div>
        )}
        <button
          onClick={()=>handleView(_id)}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2 w-full lg:w-auto justify-center cursor-pointer"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskFeedItem;
