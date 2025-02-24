import { useSelector } from "react-redux";
import DesingerTaskDetails from "../components/ui/designerTaskManagement/DesingerTaskDetails";
import AssociateTaskDetails from "../components/ui/associateTaskManagement/AssociateTaskDetails";

const TaskDetails = () => {
    const {user} = useSelector((store) => store.auth);
    console.log(user.role)
  return (
    <div className="flex-1 overflow-y-auto">
        {user.role === "designer" && <DesingerTaskDetails /> }
        {user.role === "associate" && <AssociateTaskDetails /> }
    </div>
  )
}
export default TaskDetails