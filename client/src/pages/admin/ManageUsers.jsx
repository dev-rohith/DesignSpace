import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  changeUserStatus,
  getUsers,
} from "../../features/actions/adminactions";
import UsersTable from "../../components/ui/UsersTable";
import Filter from "../../components/common/Filter";
import Sort from "../../components/common/Sort";
import Pagination from "../../components/common/Pagination";
import PageLimit from "../../components/common/PageLimit";

const ManageUsers = () => {
  const { users } = useSelector((store) => store.admin);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(
        getUsers(`user?${searchParams.toString()}`)
      );
      if (getUsers.rejected.match(actionResult)) {
        toast.error(actionResult.payload);
      }
    })();
  }, [searchParams]);

  const handleChangeStatus = async (userId, action) => {
    const actionResult = await dispatch(changeUserStatus({ userId, action }));
    if (changeUserStatus.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (changeUserStatus.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  if (!users) {
    return (
      <div className="m-auto text-center p-6 bg-white shadow-lg rounded-lg  group hover:bg-violet-400">
        <h4 className="text-xl font-semibold text-gray-700 group-hover:text-red-700">
          There was an Error while feching the data
        </h4>
        <p className="text-violet-600 mt-2 group group-hover:text-white">
          Try to reload or try after some time.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex justify-between items-center bg-violet-300 p-1 ">
        <PageLimit size={5} step={5} />
        <Filter
          filters={[
            { title: "status", options: ["active", "suspended"] },
            { title: "role", options: ["client", "admin"] },
          ]}
        />
        <Sort
          options={[
            { name: "Relevence", value: "" },
            { name: "name(A-Z)", value: "firstName" },
            { name: "name(Z-A)", value: "-firstName" },
            { name: "newest", value: "createdAt" },
            { name: "oldest", value: "-createdAt" },
          ]}
        />
      </div>
      <UsersTable handleAction={handleChangeStatus} />
      <Pagination data={users} />
    </div>
  );
};
export default ManageUsers;
