import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptTaskAssociate,
  getTaskDetailsAssocaite,
} from "../../../features/actions/taskActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../../common/Spinner";
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  User,
  Flag,
  CheckCircle,
  Building,
  RefreshCw,
  TrainTrack,
  Loader,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import LocationMap from "../../common/LocationMap";

const AssociateTaskDetails = () => {
  const [location, setLocation] = useState([]);
  const { currentTask, isUpdatingTask, isLoading } = useSelector(
    (store) => store.task
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlLocation = useLocation()
  const { task_id } = useParams();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getTaskDetailsAssocaite(task_id));
      if (getTaskDetailsAssocaite.rejected.match(actionResult)) {
        toast.error(actionResult.payload);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentTask) {
      setLocation([
        {
          latitude: currentTask.location.coordinates[0],
          longitude: currentTask.location.coordinates[1],
        },
      ]);
    }
  }, [currentTask]);

  const previousPage = urlLocation;
  console.log(previousPage);

  const handleAcceptTask = async () => {
    const actionResult = await dispatch(acceptTaskAssociate(task_id));
    if (acceptTaskAssociate.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      navigate("/associate/running-tasks");
    } else if (acceptTaskAssociate.rejected.match(actionResult)) {
      toast.error(actionResult.payload);
    }
  };

  if (isLoading) return <Spinner />;
  if (!currentTask) return <ErrorState error="Error while fetching tasks" />;

  const {
    name,
    description,
    designer,
    status,
    address,
    priority,
    startDate,
    dueDate,
    isVisibleToClient,
    createdAt,
    updatedAt,
  } = currentTask;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h5 className="text-2xl sm:text-3xl font-bold text-gray-800 uppercase">
              {name}
            </h5>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize
              ${priority === "urgent" && "bg-red-100 text-red-700"}
              ${priority === "high" && "bg-orange-100 text-orange-700"}
              ${priority === "medium" && "bg-yellow-100 text-yellow-700"}
              ${priority === "low" && "bg-green-100 text-green-700"}`}
            >
              {priority}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize
              ${status === "pending" && "bg-violet-100 text-violet-700"}
              ${status === "completed" && "bg-green-100 text-green-700"}
              ${status === "in-progress" && "bg-blue-100 text-blue-700"}
              ${status === "cancelled" && "bg-gray-100 text-gray-700"}`}
            >
              <div
                className={`h-2 w-2 rounded-full mr-1.5 
                ${status === "pending" ? "bg-violet-500" : ""}
                ${status === "completed" ? "bg-green-500" : ""}
                ${status === "in-progress" ? "bg-blue-500" : ""}
                ${status === "cancelled" ? "bg-gray-500" : ""}`}
              ></div>
              {status}
            </span>
            {isVisibleToClient && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-violet-700 bg-violet-100">
                <CheckCircle className="h-3 w-3 mr-1" />
                Visible to client
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-violet-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Task Description
              </h2>
              <p className="text-gray-700">{description}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-violet-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Timeline
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-violet-50 p-4 rounded-lg">
                  <Calendar className="h-8 w-8 text-violet-500" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {format(new Date(startDate), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-violet-50 p-4 rounded-lg">
                  <Clock className="h-8 w-8 text-violet-500" />
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="font-medium text-gray-900">
                      {format(new Date(dueDate), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4 text-violet-500" />
                  <span>
                    Created{" "}
                    {formatDistanceToNow(new Date(createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <RefreshCw className="h-4 w-4 text-violet-500" />
                  <span>
                    Updated{" "}
                    {formatDistanceToNow(new Date(updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-violet-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-violet-500" />
                  Task Location
                </div>
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="font-medium">
                  {address.house_number}, {address.street}
                </p>
                <p>
                  {address.city}, {address.state} {address.postal_code}
                </p>
                <p className="capitalize">{address.country}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-violet-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                <div className="flex items-center gap-2">
                  <TrainTrack className="h-10 w-10 text-green-500" />
                  Read Guidlines before accepting the task
                </div>
              </h2>
              <div className="space-y-3 text-gray-700 text-sm tracking-tighter">
                <p className="font-medium text-red-400">
                  Once task is accepted You fully tracked under the designer.
                  Make sure you are able to complete the task on time and
                  quality. Or else you will be penalized.
                </p>
                <p className="font-medium text-amber-500">
                  You can also contact the designer for any queries regarding
                  the task. And You can Accept the task be Clicking the below
                  button.
                </p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  disabled={isUpdatingTask}
                  onClick={handleAcceptTask}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded ring-2 ring-green-700 ring-offset-2 cursor-pointer"
                >
                  {isUpdatingTask ? (
                    <span className="flex items-center gap-2">
                      <Loader className="h-5 w-5  animate-spin" /> Accepting...
                    </span>
                  ) : (
                    "Accept the task"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Designer Info Card */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Designer
              </h2>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-white flex-shrink-0">
                  <img
                    src={designer.profilePicture}
                    alt={`${designer.firstName} ${designer.lastName}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium">
                    {designer.firstName} {designer.lastName}
                  </h3>
                  <p className="text-violet-200 mt-1">Task Assignment</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-violet-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Flag className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {priority}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <Building className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Task ID</p>
                    <p className="font-medium text-gray-900">
                      {currentTask._id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-2 shadow rounded-xl">
              <LocationMap locations={location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociateTaskDetails;
