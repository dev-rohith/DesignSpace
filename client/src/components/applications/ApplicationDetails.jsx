import { useEffect, useState, useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../apis/axiosIntance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changeApplicationStatus } from "../../features/actions/adminactions";

const ApplicationDetails = () => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { application_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const response = await axiosInstance.get(
          `/application/${application_id}`
        );
        setDetails(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred");
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleApprove = async (id) => {
    const actionResult = await dispatch(
      changeApplicationStatus({ applicationId: id, action: "approved" })
    );
    if (changeApplicationStatus.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      navigate(-1);
    } else if (changeApplicationStatus.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleReject = async (id) => {
    const actionResult = await dispatch(
      changeApplicationStatus({ applicationId: id, action: "rejected" })
    );
    if (changeApplicationStatus.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      navigate(-1);
    } else if (changeApplicationStatus.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  if (error) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-red-600">
          {error.response?.data?.message || "Error loading application"}
        </h2>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!details) {
    return <div className="p-4 text-center">No application found</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-indigo-300">
        <div className="flex justify-between pb-4">
          <h2 className="text-xl uppercase mt-4 ml-4 font-semibold text-gray-700">
            Application Details
          </h2>
          <div className="flex gap-3 items-center pt-4 mr-8">
            <button
              onClick={() => handleApprove(details._id)}
              className="bg-green-400 text-white px-4 py-1 rounded-xl hover:bg-green-600 cursor-pointer"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(details._id)}
              className="bg-red-400 text-white px-4 py-1 rounded-xl hover:bg-red-500 cursor-pointer"
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 bg-indigo-200">
        <div className="flex gap-4 bg-violet-300  hover:-translate-x-0.5 hover:shadow-sm  p-4 mx-3 mt-3 rounded-xl">
          <img
            src={details.requestedBy.profilePicture}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3>
              {details.requestedBy.firstName} {details.requestedBy.lastName}
            </h3>
            <p className="text-blue-600">{details.requestedRole}</p>
            <p>{new Date(details.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="bg-violet-300  hover:-translate-x-0.5 hover:shadow-sm  p-4 mx-3 mt-3 rounded-xl">
          <h3 className="text-lg font-semibold ">Description</h3>
          <p>{details.description}</p>
        </div>

        <div className="bg-violet-300  hover:-translate-x-0.5 hover:shadow-sm  p-4 mx-3 rounded-xl">
          <h3 className="text-lg font-semibold ">Resume</h3>
          <a
            href=""
            className="underline  text-blue-600 upp underline-offset-2 "
          >
            view resume in full screen
          </a>
          <iframe
            src={details.resume.url}
            width="100%"
            height="500px"
            className="mt-3 h-screen"
          ></iframe>
        </div>

        <div className="bg-violet-300  hover:-translate-x-0.5 hover:shadow-sm  p-4 mx-3 rounded-xl">
          <h3 className="text-lg font-semibold mb-8">Introduction Video</h3>
          <video
            controls
            className="w-full h-screen object-cover"
            poster={details.introduction_video.thumbnail || ""}
          >
            <source src={details.introduction_video.url} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
