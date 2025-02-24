import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorState, Spinner } from "../../../components";
import { getDesignerCompletedProjects } from "../../../features/actions/designerActions";
import toast from "react-hot-toast";
import DesignerProjectItem from "../../../components/ui/DesignerProjectItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import Sort from "../../../components/common/Sort";
import Pagination from "../../../components/common/Pagination";

const DesignerCompletedProjects = () => {
  const { projects, isLoading } = useSelector((store) => store.project);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(
        getDesignerCompletedProjects(
          `/projects/designer/completed?${searchParams.toString()}`
        )
      );
      if (getDesignerCompletedProjects.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, [searchParams]);

  const handleViewProject = (id) => {
    if (!id) {
      toast.error("Error while fetching project details");
      return;
    }
    navigate(`/project/${id}`);
  };

  if (isLoading) return <Spinner />;
  if (!projects) return <ErrorState error="Error while fetching data" />;

  return (
    <div className="min-h-screen overflow-y-auto w-screen">
      <div className="flex justify-end items-center mt-4 mr-20">
        <div className="bg-gray-400 h-1 w-full mx-10"></div>
        <div className="border-2 border-violet-400">
          <Sort
            options={[
              { name: "Relevence", value: "" },
              { name: "name(A-Z)", value: "title" },
              { name: "name(Z-A)", value: "-title" },
              { name: "newest", value: "createdAt" },
              { name: "oldest", value: "-createdAt" },
            ]}
          />
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.data.length === 0 && (
          <div className="flex items-center justify-center h-screen w-screen">
            <h5 className="text-xl font-semibold text-gray-600">
              You Not Completed any project Yet
            </h5>
          </div>
        )}
        {projects.data.map((project, index) => (
          <DesignerProjectItem
            key={project._id || index}
            {...project}
            handleViewProject={handleViewProject}
          />
        ))}
      </div>
      {!searchParams.get("search") && <Pagination data={projects} />}
    </div>
  );
};
export default DesignerCompletedProjects;
