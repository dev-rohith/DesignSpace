import { useDispatch, useSelector } from "react-redux";
import UserTableRow from "./UserTableRow";
import {
  changeUserStatus,
  getUsers,
} from "../../features/actions/adminActions";
import toast from "react-hot-toast";
import Pagination from "../common/Pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../common/Spinner";
import ErrorState from "../common/placeholders/ErrorState";

const UsersTable = () => {
  const [searchParams] = useSearchParams();
  const { users, isLoading } = useSelector((store) => store.admin);
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

  if (isLoading) return <Spinner />;

  if (!users) return <ErrorState />;

  if (users?.data?.length === 0)
    return (
      <p className="flex justify-center items-center h-screen text-gray-500">
        No users found
      </p>
    );

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-400 text-sm font-bold text-gray-800 uppercase shadow-md">
            <th className="py-2 text-left pl-4">Profile</th>
            <th className="py-2 text-left">Name</th>
            <th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Role</th>
            <th className="py-2 text-left hidden sm:table-cell">Last Login</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.map((user) => (
            <UserTableRow
              key={user._id}
              {...user}
              handleAction={handleChangeStatus}
            />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      {!searchParams.get("search") && <Pagination data={users} />}
    </>
  );
};
export default UsersTable;
