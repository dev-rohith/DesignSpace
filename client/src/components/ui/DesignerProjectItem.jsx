import { CalendarDays, CircleDollarSign, DollarSign } from "lucide-react";

const DesignerProjectItem = ({
  _id,
  title,
  client,
  description,
  minimumDays,
  isPaid,
  budget,
  handleViewProject,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg group transition-shadow duration-300 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <img
              src={client.profilePicture}
              alt={`${client.firstName}'s profile`}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 font-medium">
                Client :{" "}
              </span>
              <span className="text-sm font-semibold first-letter:uppercase">
                {client.firstName} {client.lastName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-violet-50 px-3 py-1.5 rounded-full">
            <CircleDollarSign
              className={`w-4 h-4 ${
                isPaid ? "text-green-500" : "text-orange-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isPaid ? "text-green-500" : "text-orange-500"
              }`}
            >
              {isPaid ? "Paid" : "Unpaid"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg uppercase tracking-wide">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarDays className="w-4 h-4 text-violet-500" />
              <span className="text-sm font-medium">Minimum Duration</span>
            </div>
            <p className="text-gray-900 font-semibold mt-1">
              {minimumDays} Days
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="w-4 h-4 text-violet-500" />
              <span className="text-sm font-medium">Budget</span>
            </div>
            <p className="text-gray-900 font-semibold mt-1">
              ${budget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-end group-hover:bg-violet-300">
        <button
          onClick={() => {
            handleViewProject(_id);
          }}
          className="inline-flex items-center gap-2 px-4  text-violet-600 group-hover:bg-violet-500 group-hover:border h  group-hover:text-white hover:bg-gray-100 hover:text-gray-700 font-medium transition-colors cursor-pointer"
        >
          View Details
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default DesignerProjectItem;
