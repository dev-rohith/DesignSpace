import React, { useEffect, useState } from "react";
import {
  MapPin,
  DollarSign,
  Clock,
  Target,
  CreditCard,
  Loader,
  BadgeIndianRupee,
  IndianRupeeIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { getProjectDetails, reviewProject } from "../../features/actions/projectActions";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorState from "../common/placeholders/ErrorState";
import ProjectImages from "./clientProjectDetails/ProjectImages";
import LocationMap from "../common/LocationMap";
import ClientRatingAndReview from "./clientProjectDetails/ClientRatingAndReview";
import {format, formatDistanceToNow } from "date-fns";

const ProjectDetailsView = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { project_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProject = async () => {
      const actionResult = await dispatch(getProjectDetails(project_id));
      if (getProjectDetails.fulfilled.match(actionResult)) {
        setProjectDetails(actionResult.payload);
        setIsLoading(false);
      } else if (getProjectDetails.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    };
    fetchProject();
  }, [dispatch, project_id]);

  useEffect(() => {
    if (projectDetails && projectDetails.location) {
      setLocation([
        {
          latitude: projectDetails.location.lat,
          longitude: projectDetails.location.lng,
        },
      ]);
    }
  }, [projectDetails]);

  const handleReviewSubmit = async (data) => {
    console.log(data)
    const actionResult = await dispatch(
       reviewProject({
         id: projectDetails._id,
         formData : data,
       })
     );
     if (reviewProject.fulfilled.match(actionResult)) {
       toast.success(actionResult.payload.message);
     } else if (reviewProject.rejected.match(actionResult)) {
       toast.error(actionResult.payload.message);
     }
 }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (!projectDetails)
    return <ErrorState error="Error while fetching project details" />;

  const {
    beforePictures,
    afterPictures,
    title,
    description,
    status,
    minimumDays,
    budget,
    completion_percentage,
    isPaid,
    updatedAt,
  } = projectDetails;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : status === "inprogress"
                  ? "bg-green-100 text-green-800"
                  : status === "completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
              <Clock className="w-5 h-5 text-violet-600" />
              <div>
                <p className="text-sm text-gray-600">Timeline</p>
                <p className="text-lg font-semibold">{minimumDays} days</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
              <BadgeIndianRupee className="w-6 h-6 text-violet-600" />
              <div>
                <p className="text-sm text-gray-600">Budget</p>
                <p className="text-lg font-semibold flex items-center">
                  <IndianRupeeIcon size={20} /> {budget}
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3">
              <Target className="w-5 h-5 text-violet-600" />
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <p className="text-lg font-semibold">
                  {completion_percentage}% Complete
                </p>
              </div>
            </div>
          </div>

          {status === "pending" && !isPaid && (
            <button className="mt-6 w-full sm:w-auto px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" /> Make Payment
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold  mb-2">Project Progress</h3>
                
                <div
                  className={`text-2xl font-bold ${
                    completion_percentage === 100
                      ? "text-green-500"
                      : "text-violet-600"
                  }`}
                >
                  {completion_percentage} %
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-violet-600 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      Math.max(completion_percentage, 0),
                      100
                    )}%`,
                  }}
                />
                <div className="text-xs ml-1 font-medium text-gray-500">Progress updated on: {updatedAt
                                    ? `${format(
                                        new Date(updatedAt),
                                        "PPpp"
                                      )} (${formatDistanceToNow(new Date(updatedAt))} ago)`
                                    : "N/A"}</div>
              </div>
            </div>
            <ProjectImages
              afterPictures={afterPictures}
              beforePictures={beforePictures}
            />
            {status === "review" && (
                <ClientRatingAndReview designerPicture={projectDetails.designer?.profilePicture} handleReviewSubmit={handleReviewSubmit} />
            )}
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Designer</h2>
              <div className="flex items-center gap-4 bg-violet-50 p-4 rounded-lg">
                <img
                  src={projectDetails.designer?.profilePicture}
                  alt={projectDetails.designer?.firstName}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <p className="font-semibold text-lg">
                    {projectDetails.designer?.firstName}{" "}
                    {projectDetails.designer?.lastName}
                  </p>
                  <p className="text-gray-600">Project Designer</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="flex items-start gap-3 bg-violet-50 p-4 rounded-lg">
                <MapPin className="w-5 h-5 text-violet-600 mt-1" />
                <div>
                  <p className="font-medium">
                    {projectDetails.address?.house_number}
                  </p>
                  <p className="font-medium">
                    {projectDetails.address?.street}
                  </p>
                  <p className="text-gray-600">
                    {projectDetails.address?.city},{" "}
                    {projectDetails.address?.state}
                  </p>
                  <p className="text-gray-600">
                    {projectDetails.address?.country} -{" "}
                    {projectDetails.address?.postal_code}
                  </p>
                </div>
              </div>
            </div>
            {location.length > 0 && (
              <div className="bg-white rounded-lg shadow p-2  ">
                <LocationMap locations={location}  />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsView;
