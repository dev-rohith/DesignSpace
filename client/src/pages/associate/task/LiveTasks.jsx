import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getLiveTasks } from "../../../features/actions/taskActions";
import {toast} from 'react-hot-toast'
import ErrorState from "../../../components/common/placeholders/ErrorState";
import Spinner from "../../../components/common/Spinner";
import TaskFeedItem from "../../../components/common/TaskFeedItem";
import Pagination from "../../../components/common/Pagination";
import { Inbox } from "lucide-react";
import Sort from "../../../components/common/Sort";
import PageLimit from "../../../components/common/PageLimit";
import Filter from "../../../components/common/Filter";
import { useNavigate } from "react-router-dom";

const LiveTasks = () => {
  const {tasks, isLoading} = useSelector((state) => state.task);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getLiveTasks());
      if(getLiveTasks.rejected.match(actionResult)){
        toast.error(actionResult.payload.message)
      }
    })()
  },[])

  const handleview = (id) => {
    navigate(`/task/${id}`)
  }


  if(isLoading) return <Spinner />
  if(!tasks) return <ErrorState error="Error while fetching tasks" />

  return (
  <div className="min-h-screen overflow-y-auto w-screen px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Live Tasks
      </h1>
      <p className="text-gray-600">All live tasks in present</p>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-center items-center gap-4">
          <PageLimit size={10} step={4} />
          <div className="w-full sm:w-auto border">
            <Filter
              filters={[
                {
                  title: "priority",
                  options: ["low", "medium", "high", "urgent"],
                },
              ]}
            />
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <Sort
            options={[
              { name: "Relevence", value: "" },
              { name: "name(A-Z)", value: "name" },
              { name: "name(Z-A)", value: "-name" },
              { name: "newest", value: "createdAt" },
              { name: "oldest", value: "-createdAt" },
            ]}
          />
        </div>
      </div>
    </div>

    <div className="space-y-4">
      {tasks.data.length === 0 ? (
        <div className="text-center py-12">
          <Inbox className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No tasks Found
          </h3>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {tasks.data.map((task) => (
              <TaskFeedItem key={task._id} {...task} handleView={handleview} />
            ))}
          </div>
          <div className="mt-6">
            <Pagination data={tasks} />
          </div>
        </>
      )}
    </div>
  </div>
  )
}
export default LiveTasks