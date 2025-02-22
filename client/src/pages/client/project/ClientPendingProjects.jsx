import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getClientPendingProjects } from "../../../features/actions/clientActions";
import { useEffect } from "react";
import { ErrorState, Spinner } from "../../../components";
import toast from "react-hot-toast";
import ClientProjectItem from "../../../components/ui/ClientProjectItem";

const PendingProjects = () => {
  const { projects, isLoading } = useSelector((store) => store.project);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getClientPendingProjects());
      if (getClientPendingProjects.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, []);

  console.log(projects);

  const handleViewProject = (id) => {
    if (!id) {
      toast.error("Error while fetching project details");
      return;
    }
    navigate(`/project/${id}`);
  };

  if (!projects) return <ErrorState error="Error while fetching data" />;
  if (isLoading) return <Spinner />;

  if (projects.length === 0)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <h5 className="text-xl font-semibold text-gray-600">
          No Pending Projects Found
        </h5>
      </div>
    );
  console.log(projects);
  return (
    <div>
      {projects.map((project, index) => (
        <ClientProjectItem key={project._id || index} {...project} handleViewProject={handleViewProject} />
      ))}
    </div>
  );
};
export default PendingProjects;
