import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorState from "../../common/placeholders/ErrorState";
import Spinner from "../../common/Spinner";
import { getTaskDetailsDesigner } from "../../../features/actions/taskActions";
import toast from "react-hot-toast";
import TaskHeader from "./TaskHeader";
import LocationInfo from "./LocationInfo";
import WorkUpdates from "./WorkUpdates";
import UpdateLocations from "./UpdateLocations";
import AssignAssociate from "./AssignAssociate";
import TaskEdit from "./TaskEdit";

const DesignerTaskDetails = () => {
  const { currentTask, isLoading } = useSelector((store) => store.task);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { task_id } = useParams();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getTaskDetailsDesigner(task_id));
      if (getTaskDetailsDesigner.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, [dispatch, task_id]);

  const handleEditChange = () => {  
    setIsEdit(!isEdit);
  };

  if (isLoading) return <Spinner />;
  if (!currentTask) return <ErrorState error="Error while Fetching the task" />;

  const {
    name,
    status,
    description,
    _id,
    startDate,
    dueDate,
    priority,
    isVisibleToClient,
    address,
    location,
    workUpdates,
    createdAt,
    updatedAt,
  } = currentTask;

  if (isLoading) return <Spinner />;
  if (!currentTask) return <ErrorState error="Error while Fetching the task" />;

  if(isEdit) return <TaskEdit initialFormData={{_id, name, description, startDate, dueDate, priority, isVisibleToClient, address}} handleEditChange={handleEditChange}  />

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <TaskHeader
        {...{
          name,
          description,
          status,
          dueDate,
          isVisibleToClient,
          startDate,
          createdAt,
          updatedAt,
          priority,
          _id,
          handleEditChange
        }}
      />
      <div className="flex flex-wrap gap-4">
        <LocationInfo address={address} coordinates={location.coordinates} />
        {status !== "pending" && <WorkUpdates workUpdates={workUpdates} />}
        {status !== "pending" && <UpdateLocations workUpdates={workUpdates} />}
        {status === "pending" && <AssignAssociate coordinates={location.coordinates} taskId={_id} />}
      </div>
    </div>
  );
};

export default DesignerTaskDetails;
