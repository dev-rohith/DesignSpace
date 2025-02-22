import InternalSidebar from "../components/layout/InternalSidebar";
import { useSelector } from "react-redux";
import { Sidebar } from "../components";
import ClientProjectDetails from "../components/ui/ClientProjectDetails";
import DesingerProjectDetails from "../components/ui/DesingerProjectDetails";

const ProjectDetails = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="flex h-screen bg-gray-50">
      {user.role === "client" ? <Sidebar /> : <InternalSidebar />}
      <div className="flex-1 overflow-y-auto">
        {user.role === "client" ? (
          <ClientProjectDetails  />
        ) : (
          <DesingerProjectDetails  />
        )}
      </div>
    </div>
  );
};
export default ProjectDetails;
