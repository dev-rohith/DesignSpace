import { useSelector } from "react-redux";
import UserTableRow from "./UserTableRow";

const UsersTable = ({ handleAction }) => {
  const { users } = useSelector((store) => store.admin);
  if(users?.data?.length === 0) return <p className="flex justify-center items-center h-screen text-gray-500">No users found</p>;
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-400 text-sm font-bold text-gray-800 uppercase shadow-md">
          <th className="py-2 text-left pl-4">Profile</th>
          <th className="py-2 text-left">Name</th>
          <th className="py-2 text-left">Email</th>
          <th className="py-2 text-left hidden sm:table-cell">Last Login</th>
          <th className="py-2 text-left">Status</th>
          <th className="py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {users?.data?.map((user) => (
          <UserTableRow key={user._id} {...user} handleAction={handleAction} />
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};
export default UsersTable;
