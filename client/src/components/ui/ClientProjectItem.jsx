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
    <article className="group relative border bg-white rounded-xl overflow-hidden">
      <div
        className={`absolute top-0 inset-x-0 h-1.5 ${
          isOverdue
            ? "bg-red-500"
            : daysRemaining < 7
            ? "bg-amber-500"
            : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
        }`}
      ></div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <div className="flex items-center gap-2">
              <time className="text-sm text-gray-500" dateTime={createdAt}>
                Created {format(parseISO(createdAt), "MMM d, yyyy")}
              </time>
              <span className="text-gray-300">•</span>
              <time className="text-sm text-gray-500" dateTime={updatedAt}>
                Updated{" "}
                {daysSinceUpdate === 0
                  ? "today"
                  : `${daysSinceUpdate} days ago`}
              </time>
            </div>
          </div>
          <div
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              isPaid
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {isPaid ? "Paid" : "Pending"}
          </div>
        </div>

        <div
          className={`mb-6 p-3 rounded-lg flex items-center gap-3 ${
            isOverdue
              ? "bg-red-50 text-red-700"
              : daysRemaining < 7
              ? "bg-amber-50 text-amber-700"
              : "bg-violet-50 text-violet-700"
          }`}
        >
          <AlertCircle className="w-5 h-5" />
          <div className="text-sm font-medium">
            {isOverdue
              ? `Overdue by ${Math.abs(daysRemaining)} days`
              : `${daysRemaining} days remaining`}
            <span className="block text-xs opacity-75">
              Deadline: {format(deadlineDate, "MMM d, yyyy")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={designer.profilePicture}
              alt={`${designer.firstName} ${designer.lastName}`}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-100"
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-violet-600" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {designer.firstName} {designer.lastName}
            </p>
            <p className="text-sm text-gray-500">Designer</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-violet-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-600">
                Timeline
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {minimumDays} <span className="text-sm text-gray-600">days</span>
            </p>
          </div>

          <div className="bg-violet-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-600">
                Budget
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {budget.toLocaleString("en-IN")}{" "}
              <span className="text-sm text-gray-600">INR</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => handleViewProject(_id)}
          className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer ${
            isOverdue
              ? "bg-red-50 hover:bg-red-100 text-red-600"
              : "bg-violet-50 hover:bg-violet-100 text-violet-600"
          }`}
        >
          View Project Details
          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </article>
  );
};

export default ClientProjectItem;
