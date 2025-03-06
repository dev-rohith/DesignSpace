import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAssociateTask, completeTheTask } from "../../features/actions/taskActions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { ErrorState, Spinner } from "../../components";
import AssociateTaskProgress from "../../components/ui/associateTaskManagement/AssociateTaskProgress";
import TaskAndDesignerDetails from "../../components/ui/associateTaskManagement/TaskAndDesignerDetails";
import UpdateTaskProgress from "../../components/ui/associateTaskManagement/UpdateTaskProgress";

const MyTaskDetails = () => {
  const { currentTask, isLoading } = useSelector(
    (store) => store.task
  );
  const { task_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getAssociateTask(task_id));
      if (getAssociateTask.rejected.match(actionResult)) {
        toast.error(actionResult.payload);
      }
    })();
  }, [dispatch, task_id]);

  const handleCompleteTask = async () => {
    const actionResult = await dispatch(completeTheTask(task_id));
    if (completeTheTask.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      navigate("/associate/completed-tasks");
  }else if(completeTheTask.rejected.match(actionResult)){
    toast.error(actionResult.payload.message);
  }
}

  if (isLoading) <Spinner />;
  if (!currentTask) return <ErrorState error="Erorr while Fetching Task" />;

  const {
    name,
    description,
    designer,
    address,
    priority,
    startDate,
    dueDate,
    status,
    location,
    workUpdates = [],
  } = currentTask;

  return (
    <div className="min-h-screen overflow-y-auto w-screen px-4 py-8">
      {/* Task Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            <p className="mt-2 opacity-90">{description}</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                status === "completed"
                  ? "bg-green-500"
                  : status === "inprogress"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            >
              {status?.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                priority === "high"
                  ? "bg-red-500"
                  : priority === "medium"
                  ? "bg-orange-500"
                  : "bg-blue-400"
              }`}
            >
              Priority: {priority?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <TaskAndDesignerDetails
        {...{ designer, address, startDate, dueDate, location, handleCompleteTask, status }}
      />
      <div className="flex">
        <AssociateTaskProgress {...{task_id, workUpdates, status}} />
          {status === 'inprogress' && <UpdateTaskProgress taskId={task_id} />}
      </div>
    </div>
  );
};

export default MyTaskDetails;
