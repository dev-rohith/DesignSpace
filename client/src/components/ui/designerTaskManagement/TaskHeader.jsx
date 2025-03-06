import React from "react";
import { Info } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

const TaskHeader = ({
  name,
  description,
  status,
  dueDate,
  isVisibleToClient,
  startDate,
  createdAt,
  updatedAt,
  priority,
  _id: taskId,
  handleEditChange
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "inprogress":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
            In Progress
          </span>
        );
      case "completed":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col relative sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <div className="self-start ">
          <div className="flex items-center  gap-3 mb-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            {getStatusBadge(status)}
          </div>
          <p className="text-gray-600">{description}</p>
          {status === "pending" && <button 
          onClick={handleEditChange}
          className="absolute top-0 left-85 text-sm bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 cursor-pointer active:translate-0.5">Edit</button>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-500">
              {isVisibleToClient
                ? "Visible to Client"
                : "Not Visible to Client"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-500">Priority :</span>
            <span className="text-xs px-2 py-1  rounded-full bg-violet-200 ">{priority}</span>
          </div>
        </div>

        <div className="flex flex-col border-l pl-4 gap-1">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Task ID:</span>
            <span className="bg-indigo-100 px-2  rounded text-sm font-mono">
              {taskId}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Start Date:</span>
            <span className="bg-amber-100 px-2  rounded text-sm font-mono">
              {format(new Date(startDate), "MM/dd/yyyy")}{" "}
              {formatDistanceToNow(new Date(startDate), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Due Date:</span>
            <span className="bg-red-100 px-2  rounded text-sm font-mono">
              {format(new Date(dueDate), "MM/dd/yyyy")}{" "}
              {formatDistanceToNow(new Date(dueDate), {
                addSuffix: true,
              })}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Task Created On:</span>
            <span className="bg-green-100 px-2  rounded text-sm font-mono">
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Task Was Updated On:</span>
            <span className="bg-violet-100 px-2  rounded text-sm font-mono">
              {formatDistanceToNow(new Date(updatedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
