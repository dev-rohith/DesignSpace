import { format } from "date-fns";
import LocationMap from "../../common/LocationMap";
import { useSelector } from "react-redux";

const TaskAndDesignerDetails = ({
  designer,
  address,
  startDate,
  dueDate,
  location,
  status,
  handleCompleteTask,
}) => {
  const { isCompletingTask } = useSelector((store) => store.task);
  const formatedLocation = [
    { latitude: location.coordinates[0], longitude: location.coordinates[1] },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 ">
        <h2 className="text-xl font-semibold mb-4 text-violet-800 border-b pb-2">
          Task Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">
              {startDate
                ? format(new Date(startDate), "MMM dd, yyyy")
                : "Not set"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">
              {dueDate ? format(new Date(dueDate), "MMM dd, yyyy") : "Not set"}
            </p>
          </div>
          <div className=" flex flex-col items-center w-50">
            <h5 className="uppercase font-semibold border-b w-full  text-center">
              Designer
            </h5>
            <div className="flex items-center w-full">
              <img
                src={designer?.profilePicture}
                alt={`${designer?.firstName} ${designer?.lastName}`}
                className="w-14 h-14 m-2 object-cover border-2 rounded-full border-gray-400"
              />
              <div className="pl-4 mr-4 border-l ">
                <h6 className="font-semibold border-b">Name :</h6>
                <p className=" tracking-tighter ">
                  {designer?.firstName} {designer?.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Location :</p>
          <p className="font-medium">
            {address?.street}, {address?.city}, {address?.state},{" "}
            {address?.country} {address?.postal_code}
          </p>
        </div>
        {status === "inprogress" && (
          <div className="italic mt-4">
            <p className="text-sm">
              <span className="font-semibold">Cation:</span> before completing
              the task, you need to make sure you succesfully completed all the
              work.
            </p>
            <button
              onClick={handleCompleteTask}
              disabled={isCompletingTask}
              className="bg-green-600  text-white px-4 py-1  mt-4"
            >
              Complete the Task
            </button>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-md p-2  ">
        <h2 className="text-xl font-semibold mb-4 text-violet-800 border-b pb-2">
          Task Location
        </h2>
        <LocationMap
          locations={formatedLocation}
          height="320px"
          className="border rounded-lg"
        />
      </div>
    </div>
  );
};
export default TaskAndDesignerDetails;
