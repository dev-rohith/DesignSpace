import { CheckCheck } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteNonePendingApplication } from "../../features/actions/adminactions";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ApplicationTableRow = ({
  _id,
  requestedBy,
  requestedRole,
  requestedDate,
  status,
  actionMadeBy,
  updatedAt,
  isApproved,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Format date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleView = () => {
    navigate(`/admin/application/${_id}`);
  };

  const handleDelete = async () => {
    const actionResult = await dispatch(deleteNonePendingApplication(_id));
    if (deleteNonePendingApplication.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (deleteNonePendingApplication.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  return (
    <tr className="hover:bg-gray-50 ">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={requestedBy.profilePicture}
            alt={`${requestedBy.firstName}'s profile`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900">
                {requestedBy.firstName} {requestedBy.lastName}
              </p>
              {isApproved && <CheckCheck className="w-4 h-4 text-blue-900" />}
            </div>
            <p className="text-sm text-gray-500">
              {requestedBy.status === "active" ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  Suspended
                </span>
              )}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="font-medium text-gray-900">{requestedRole}</span>
      </td>
      <td className="p-3">
        <span className="text-gray-600">{formatDate(requestedDate)}</span>
      </td>
      {updatedAt && (
        <td className="p-3">
          <span className="text-gray-600">{formatDate(updatedAt)}</span>
        </td>
      )}
      {!actionMadeBy && (
        <td>
          {status === "pending" ? (
            <span className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {status}
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {status}
            </span>
          )}
        </td>
      )}

      {actionMadeBy && (
        <td>
          {status === "approved" ? (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {status}
            </span>
          ) : (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-red-200 text-red-800">
              {status}
            </span>
          )}
        </td>
      )}
      {!actionMadeBy && (
        <td className="p-4">
          <button
            onClick={handleView}
            className="bg-indigo-600 text-white py-1  hover:bg-violet-700 px-4 rounded-full cursor-pointer"
          >
            View
          </button>
        </td>
      )}
      {actionMadeBy && (
        <td>
          <div className="flex items-center bg-gray-100 px-1 py-2 w-max rounded-lg">
            <img
              src={actionMadeBy.profilePicture}
              alt={`${actionMadeBy.firstName}'s profile`}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-center  ml-3 tracking-tighter leading-tight">
              Name :
              <p className="font-light text-gray-900">
                {actionMadeBy.firstName} {actionMadeBy.lastName}
              </p>
            </div>
          </div>
        </td>
      )}
      {actionMadeBy && (
        <td className="p-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-1  hover:bg-red-800 px-4 rounded-full cursor-pointer"
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default ApplicationTableRow;
