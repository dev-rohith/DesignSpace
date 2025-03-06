import { useState } from "react";
import axiosInstance from "../../../apis/axiosIntance";
import toast from "react-hot-toast";
import { Loader, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assignAssociateToTheTask } from "../../../features/actions/taskActions";

const AssignAssociate = ({ coordinates, taskId }) => {
  const [distance, setDistance] = useState(1);
  const [associates, setAssociates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFindNearestAssociates = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/associate/nearest", {
        coordinates,
        distance,
      });
      setAssociates(response.data);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.message);
      setError(error.response.message || true);
    } finally {
      setIsLoading(false);
    }
  };

  const assignAssociate = async (associateId) => {
      console.log(associateId)
      if(!associateId) {
        toast.error("Associate id not found to assign");
        return
      }
      const actionResult = await dispatch(assignAssociateToTheTask({taskId, associateId: associateId}));
      if(assignAssociateToTheTask.fulfilled.match(actionResult)) {
        toast.success(actionResult.payload.message);
        navigate(-1);
      }else if(assignAssociateToTheTask.rejected.match(actionResult)){
        toast.error(actionResult.payload.message);
      }
  };

  return (
    <div className="bg-white w-xl shadow-xl h-[485px]  rounded-xl shadow-violet-400">
      <div className="p-4 border-b">
        <h5 className="font-medium text-md underline underline-offset-2">
          * Find Nearest Assoicates within the project Radius :{" "}
        </h5>
        <div className="mt-4 flex items-center">
          <label
            htmlFor="distance"
            className="italic underline underline-offset-2"
          >
            Distance(km) :
          </label>
          <input
            id="distance"
            type="number"
            value={distance}
            onChange={(e) => {
              setDistance(e.target.value);
            }}
            className="border text-black px-4 py-2 ml-2 w-50 tracking-tighter text-xs"
            placeholder="distance in km(default 1km)"
          />
          <button
            onClick={handleFindNearestAssociates}
            className="ml-4 font-semibold bg-violet-500 text-white px-4 hover:border-4 hover:border-violet-500 hover:ring-0 active:translate-0.5 ring-black ring ring-offset-4 cursor-pointer "
          >
            Find Out
          </button>
        </div>
      </div>
      <div className="h-full ">
        {isLoading && (
          <div className="flex items-center justify-center h-full ">
            <Loader className="h-10 w-10 text-violet-600 animate-spin mb-30" />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center mb-30">
              <WifiOff className=" w-10 h-10 text-red-600" />
              <p className="text-red-600 italic font-semibold">
                Something went wrong
              </p>
            </div>
          </div>
        )}
        {!isLoading && !error && associates.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center mb-30">
              <p className="text-violet-600 italic font-semibold">
                No Associates Found
              </p>
              <p className="text-indigo-600 italic ">
                (Please increase the distance)
              </p>
            </div>
          </div>
        )}
        {associates.map((assocaite, index) => {
          return (
            <div key={assocaite._id || index} className=" flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                <img
                  src={assocaite.user.profilePicture}
                  alt={`${assocaite.firstName}'s profile`}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div className="flex flex-col ml-4">
                  <span
                    className={`text-xs px-4 w-max rounded-full text-center text-gray-600 ${
                      assocaite.user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {assocaite.user.status}
                  </span>
                  <span className="text-sm text-gray-600 font-medium">
                    Associate :{" "}
                  </span>
                  <span className="text-sm font-semibold first-letter:uppercase">
                    {assocaite.user.firstName} {assocaite.user.lastName}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 font-medium">
                  Specialization :{" "}
                </div>
                <span className="text-xs font-semibold italic text-gray-700">
                  {assocaite.skills.map((skill) => skill).join(", ")}
                </span>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 font-medium first-letter:uppercase">
                  availabilidy :{" "}
                </div>
                <span
                  className={`text-xs font-semibold italic text-gray-700 ${
                    assocaite.availability
                      ? "text-green-600 underline"
                      : "text-red-600"
                  }`}
                >
                  *{assocaite.availability ? "Available" : "Not Available"}
                </span>
              </div>
              <div>
                <button 
                onClick={() => assignAssociate(assocaite.user._id)}
                className="text-sm italic text-white bg-pink-500 px-4 ring-2 ring-pink-500 ring-offset-2 rounded-full  hover:bg-pink-600 hover:border-pink-500 active:translate-0.5  cursor-pointer">
                  Assign
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AssignAssociate;
