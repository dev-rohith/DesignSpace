import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getClientPendingProjects } from "../../../features/actions/clientActions";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ClientProjectItem from "../../../components/ui/ClientProjectItem";
import Sort from "../../../components/common/Sort";
import Pagination from "../../../components/common/Pagination";
import PageLimit from "../../../components/common/PageLimit";
import NoProjectsFound from "../../../components/common/placeholders/NoProjectsFound";
import { ErrorState, Spinner } from "../../../components";

const PendingProjects = () => {
  const { projects, isLoading } = useSelector((store) => store.project);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(
        getClientPendingProjects(`projects/client/pending?${searchParams}`)
      );
      if (getClientPendingProjects.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, [searchParams]);

  console.log(projects);

  const handleViewProject = (id) => {
    if (!id) {
      toast.error("Error while naviagting to project details");
      return;
    }
    navigate(`/project/${id}`);
  };

  if (!projects) return <ErrorState error="Error while fetching data" />;
  if (isLoading) return <Spinner />;
  if (projects.data.length === 0) return  <NoProjectsFound message="No pending projects found" />
    
  return (
    <div className="flex h-screen overflow-hidden">
  <div className="flex-1 flex flex-col w-screen md:w-full overflow-y-auto">
    <div className="flex items-center justify-between mb-4 bg-violet-200 rounded-r-4xl px-4 sm:px-6 py-3">
      <h5 className="text-lg sm:text-xl font-semibold text-gray-600">
        Pending Projects
      </h5>
      <div className="flex items-center gap-6">
       
        <PageLimit size={8} step={4} />
      
      <div className="border-4 border-gray-200">
        <Sort
          options={[
            { name: "Relevance", value: "" },
            { name: "name(A-Z)", value: "title" },
            { name: "name(Z-A)", value: "-title" },
            { name: "newest", value: "createdAt" },
            { name: "oldest", value: "-createdAt" },
          ]}
        />
      </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6 pb-4 w-full">
      {projects.data.map((project, index) => (
        <ClientProjectItem
          key={project._id || index}
          {...project}
          handleViewProject={handleViewProject}
        />
      ))}
    </div>

    {!searchParams.get("search") && <Pagination data={projects} />}
  </div>
</div>

  
  
  );
};
export default PendingProjects;
