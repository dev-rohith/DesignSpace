import React from "react";
import {
  CalendarDays,
  IndianRupee,
  Clock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { format, parseISO, differenceInDays, addDays } from "date-fns";
  
const ClientProjectItem = ({
  _id,
  title,
  designer,
  description,
  minimumDays,
  budget,
  isPaid,
  createdAt,
  updatedAt,
  handleViewProject,
}) => {
  const startDate = parseISO(createdAt);
  const deadlineDate = addDays(startDate, minimumDays);
  const today = new Date();
  const daysRemaining = differenceInDays(deadlineDate, today);
  const isOverdue = daysRemaining < 0;

  const lastUpdated = parseISO(updatedAt);
  const daysSinceUpdate = Math.abs(differenceInDays(lastUpdated, today));

  return (
    <article className="group relative border bg-white overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl h-auto hover:shadow-lg transition-shadow duration-200 flex flex-col p-3 sm:p-4 md:p-5">
      <div
        className={`absolute top-0 inset-x-0 h-1.5 ${
          isOverdue
            ? "bg-red-500"
            : daysRemaining < 7
            ? "bg-amber-500"
            : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
        }`}
      />

      <div className="flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3 md:mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-1 truncate">
              {title}
            </h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <time dateTime={createdAt}>
                {format(parseISO(createdAt), "MMM d, yyyy")}
              </time>
              <span>•</span>
              <time dateTime={updatedAt}>
                {daysSinceUpdate === 0 ? "today" : `${daysSinceUpdate}d ago`}
              </time>
            </div>
          </div>
          <div className="flex items-center">
          <span className="text-xs mr-1 font-medium text-gray-500" >Payment:</span>
          <div
            className={`mt-2 sm:mt-0 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
              isPaid
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
              }`}
              >
             {isPaid ? "Paid" : "Pending"}
          </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2 sm:mb-3 md:mb-4 lg:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <img
                src={designer.profilePicture}
                alt={designer.firstName}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-violet-100"
                loading="lazy"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-violet-100 rounded-full flex items-center justify-center">
                <Clock className="w-2 h-2 text-violet-600" />
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-900">
                {designer.firstName} {designer.lastName}
              </p>
              <p className="text-xs text-gray-500">Designer</p>
            </div>
          </div>

          <div
            className={`mt-2 lg:mt-0 p-2 sm:p-3 rounded-lg flex items-center gap-2 ${
              isOverdue
                ? "bg-red-50 text-red-700"
                : daysRemaining < 7
                ? "bg-amber-50 text-amber-700"
                : "bg-violet-50 text-violet-700"
            }`}
          >
            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <div className="text-xs sm:text-sm font-medium">
              {isOverdue
                ? `Overdue by ${Math.abs(daysRemaining)}d`
                : `${daysRemaining}d remaining`}
              <span className="block text-xs opacity-75">
                Due: {format(deadlineDate, "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2">
          {description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
          <div className="bg-violet-50 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1 mb-1">
              <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-violet-600" />
              <span className="text-xs font-medium text-violet-600">
                Timeline
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900">
              {minimumDays} <span className="text-xs text-gray-600">days</span>
            </p>
          </div>

          <div className="bg-violet-50 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-1 mb-1">
              <IndianRupee className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-violet-600" />
              <span className="text-xs font-medium text-violet-600">
                Budget
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900">
              {budget.toLocaleString("en-IN")}{" "}
              <span className="text-xs text-gray-600">INR</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => handleViewProject(_id)}
          className={`w-full font-medium py-2 sm:py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm group/btn cursor-pointer ${
            isOverdue
              ? "bg-red-50 hover:bg-red-100 text-red-600"
              : "bg-violet-50 hover:bg-violet-100 text-violet-600"
          }`}
        >
          View Project Details
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
};

export default ClientProjectItem;
