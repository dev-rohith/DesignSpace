import { CalendarDays, CircleDollarSign, IndianRupee } from "lucide-react";

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
    <div className="border p-4 rounded-lg shadow-sm bg-white group hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-1">
      <span className="font-medium font-mono text-gray-800">Project name:</span>
        <h5 className="text-md font-raleway font-semibold text-violet-700  first-letter:uppercase">
          {title}
        </h5>
      </div>
      <div className="flex gap-3 items-center">
        <span className="font-medium font-mono text-gray-800">Client:</span>
        <div className="flex items-center gap-2 ">
          <img
            src={client.profilePicture}
            alt={client.firstName}
            className="w-6 h-6 rounded-full"
          />
          <p className="text-sm text-gray-600 capitalize">
            {client.firstName} {client.lastName}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-2">{description}</p>

      <div className="flex justify-between items-center mt-3 text-sm">
        <div className="flex items-center gap-1 text-gray-700">
          <CalendarDays size={16} />
          <span>{minimumDays} Days</span>
        </div>

        <div className="flex items-center gap-1 text-gray-700">
          <IndianRupee size={16} />
          <span>₹{budget.toLocaleString("en-IN")}</span>
        </div>

        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isPaid ? "Paid" : "Unpaid"}
        </span>
      </div>

      <button
        onClick={() => handleViewProject(_id)}
        className="mt-4 w-full text-center py-1 rounded-md border cursor-pointer hover:bg-gray-600 border-violet-600 text-violet-600 font-medium group-hover:bg-violet-600 group-hover:text-white transition"
      >
        View Details →
      </button>
    </div>
  );
};

export default DesignerProjectItem;
