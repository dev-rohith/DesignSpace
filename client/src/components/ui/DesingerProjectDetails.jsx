import { useCallback, useEffect, useState } from "react";
import { Edit2, Sparkles } from "lucide-react";
import DesingerPendingProjectEdit from "./DesingerPendingProjectEdit";
import { useDispatch, useSelector } from "react-redux";
import { completeTheProject, deletePedingProject, getProjectDetails, sentProjectToReview, updateProjectDetails, updateProjectProgress} from "../../features/actions/projectActions";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NotFound from "../../pages/NotFound";
import Spinner from "../common/Spinner";
import UpdateProjectProgress from "./UpdateProjectProgress";
import DesignerProjectDetailsHeader from "./DesignerProjectDetailsHeader";
import BeforeAndAfterProject from "./BeforeAndAfterProject";
import LocationMap from "../common/LocationMap";
import { format, formatDistanceToNow } from "date-fns";
import { projectProgressUpdateValidation, validatePendigProjectUpdate } from "../../utils/validation";

const initialFormData = {title: "",description: "",status: "",minimumDays: 0,budget: 0,isPaid: false,completion_percentage: 0,address: {  street: "",  house_number: "",  city: "",  state: "",  country: "",
    postal_code: "",
  },

  location: {
    lat: "",
    lng: "",
  },

  client: {
    _id: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  },

  designer: {
    _id: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  },

  milestones: [],

  beforePictures: [],
  afterPictures: [],

  createdAt: "",
  updatedAt: "",
};

const DesignerProjectDetails = () => {
  const { isUpdating, isLoading, currentProject } = useSelector(
    (state) => state.project
  );
  const [formData, setFormData] = useState(initialFormData);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { project_id } = useParams();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getProjectDetails(project_id));
      if (getProjectDetails.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, [dispatch, project_id]);
  
  useEffect(() => {
    if (currentProject) {
      setFormData(currentProject);
    }
  }, [currentProject]);
  
  useEffect(() => {
    if (formData.location?.lat && formData.location?.lng) {
      setLocations([
        {
          latitude: formData.location?.lat,
          longitude: formData.location?.lng,
        },
      ]);
    }
  }, [formData]); 
  

  const { _id, title, client, designer, status, isPaid, completion_percentage, milestones, beforePictures, afterPictures, createdAt, updatedAt } = formData;

  const handleEdit = async () => {
    const errors = validatePendigProjectUpdate(formData);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    const actionResult = await dispatch(
      updateProjectDetails({ id: _id, formData })
    );

    if (updateProjectDetails.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (updateProjectDetails.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
    setErrors({})
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const actionResult = await dispatch(deletePedingProject(_id));
    if (deletePedingProject.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      navigate("/designer/pending-projects");
    } else if (deletePedingProject.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleUpdateProgress = async () => {
    const errors = projectProgressUpdateValidation(formData);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }
    setIsUpdatingProgress(true);
    const actionResult = await dispatch(
      updateProjectProgress({
        id: _id,
        formData: { completion_percentage, milestones },
      })
    );
    if (updateProjectProgress.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (updateProjectProgress.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
    setIsUpdatingProgress(false);
    setErrors({});
  };

  const handleSendToReview = async () => {
    const actionResult = await dispatch(sentProjectToReview(_id));
    if (sentProjectToReview.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (sentProjectToReview.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };



  const handleCompleteProject = async () => {
    setIsCompleting(true);
    const actionResult = await dispatch(completeTheProject(_id));
    if (completeTheProject.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (completeTheProject.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
    setIsCompleting(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddMiletstone = useCallback((field, Milestone) => {
    if (!Milestone.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...new Set([...(prev[field] || []), Milestone.trim()])],
    }));
  }, []);

  const handleRemoveMiletstone = useCallback((field, MilestoneToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter(
        (Milestone) => Milestone !== MilestoneToRemove
      ),
    }));
  }, []);

  if (!currentProject && isLoading) return <Spinner />;

  if (!currentProject) return <NotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          {status === "inprogress" && (
            <div className="flex justify-end mb-5">
              <button
                disabled={isUpdating}
                onClick={handleSendToReview}
                className="bg-amber-400 hover:bg-amber-700 text-white py-2 px-4 ring-2 ring-offset-1 ring-amber-600 hover:ring-offset-3 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                {isUpdating
                  ? "Sending project to review ....."
                  : "Send to Review"}
              </button>
            </div>
          )}
          <DesignerProjectDetailsHeader client={client} designer={designer} />
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-2xl font-bold text-violet-700 uppercase ">
                {title}
              </h4>
              <div className="text-gray-600">
                Status :
                <span
                  className={`${
                    status === "pending" ? "bg-red-300" : "bg-green-300"
                  } inline-block ml-2 px-3 py-0.5 text-xs text-gray-700 rounded-4xl`}
                >
                  {status}
                </span>
              </div>
              <div className=" text-gray-600">
                payment status :
                <span
                  className={`${
                    isPaid === false ? "bg-red-300" : "bg-green-300"
                  } inline-block ml-2 px-3 py-0.5 text-xs text-gray-700 rounded-4xl`}
                >
                  {isPaid ? "paid" : "not paid"}
                </span>
              </div>
              <div className=" text-gray-600">
                <p>
                  <span className="text-yellow-700">Created At:</span>{" "}
                  {createdAt ? format(new Date(createdAt), "PPpp") : "N/A"}
                </p>
                <p>
                  <span className="text-pink-700">Updated At:</span>{" "}
                  {updatedAt
                    ? `${format(
                        new Date(updatedAt),
                        "PPpp"
                      )} (${formatDistanceToNow(new Date(updatedAt))} ago)`
                    : "N/A"}
                </p>
              </div>
            </div>

            {status === "pending" && (
              <div className="flex items-center gap-4">
                <button
                  onClick={isEditing ? handleEdit : handleDelete}
                  disabled={isUpdating}
                  className={`flex items-center gap-2 px-4 py-1 text-sm disabled:bg-gray-500  text-white  rounded-lg ${
                    isEditing
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-700"
                  } ring-2 ring-offset-1 ${
                    isEditing ? "ring-green-500" : "ring-red-600"
                  } hover:ring-offset-3 cursor-pointer`}
                >
                  <Edit2 size={13} />
                  {isEditing ? "Save changes" : "Delete Project"}
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-4 py-1 text-sm disabled:bg-gray-500 bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600 text-white rounded-lg hover:bg-violet-700 ring-2 ring-offset-1 ring-violet-600  hover:ring-offset-3 cursor-pointer"
                >
                  <Edit2 size={13} />
                  {isEditing ? "Cancel Editing" : "Edit Details"}
                </button>
              </div>
            )}
          </div>

          {status === "inprogress" && (
            <div className="flex items-center justify-between">
              <UpdateProjectProgress
                {...{
                  isUpdatingProgress,
                  isUpdating,
                  errors,
                  completion_percentage,
                  handleInputChange,
                  milestones,
                  handleAddMiletstone,
                  handleRemoveMiletstone,
                }}
              />
              <button
                onClick={() =>
                  isUpdatingProgress
                    ? handleUpdateProgress()
                    : setIsUpdatingProgress(!isUpdatingProgress)
                }
                disabled={isUpdating}
                className={` flex items-center gap-2 px-4 py-1 mb-20 text-sm disabled:bg-gray-500  text-white  rounded-lg ${
                  isUpdatingProgress
                    ? "bg-green-500 hover:bg-vilet-700"
                    : "bg-violet-500 hover:bg-indigo-700"
                } ring-2 ring-offset-1 ${
                  isUpdating ? "ring-violet-500" : "ring-indigo-600"
                } hover:ring-offset-3 disabled:cursor-not-allowed disabled:bg-gray-500 cursor-pointer`}
              >
                <Edit2 size={13} />
                {isUpdatingProgress &&
                  (isUpdating ? "Updating..." : "Update Progress")}
              </button>
            </div>
          )}

          {/* Project pending updating here */}
          <DesingerPendingProjectEdit
            handleInputChange={handleInputChange}
            formData={formData}
            isEditing={isEditing}
            errors={errors}
          />

          {locations.length > 0 && (
            <div className="border-6 border-pink-300 rounded-md">
              <LocationMap
                locations={locations}
                height="300px"
                width="100%"
                zoom={15}
              />
            </div>
          )}

          {status === "review" && (
            <BeforeAndAfterProject
              {...{ _id, beforePictures, afterPictures }}
            />
          )}

          {status === "review" && (
            <div className="flex justify-end">
              <button
                onClick={handleCompleteProject}
                className="relative px-4 py-3 text-sm font-semibold text-white transition-all bg-gradient-to-r from-green-600 via-gray-500 to-purple-900  hover:bg-gradient-to-r rounded-md shadow-lg ring-green-500 ring-3 ring-offset-2 hover:ring-offset-4 hover:ring-green-700 hover:scale-105 cursor-pointer "
              >
                {isCompleting
                  ? "Completing the project..."
                  : "Complete the Project"}
                <Sparkles className="absolute w-3 h-3 text-white top-1 left-2 animate-pulse" />
                <Sparkles className="absolute w-3.5 h-3.5 text-white bottom-2 right-3 animate-pulse" />
                <Sparkles className="absolute w-2.5 h-2.5 text-white top-3 right-1 animate-pulse" />
                <Sparkles className="absolute w-2 h-2 text-white bottom-1 left-3 animate-pulse" />
                <Sparkles className="absolute w-3 h-3 text-white top-4 left-6 animate-pulse" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignerProjectDetails;
