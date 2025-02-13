import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosIntance";
import toast from "react-hot-toast";
import { UserCard } from "../../components";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("user");
        setUsers(response.data);
      } catch (error) {
        toast.error("their was an error while feching users");
      }
    })();
  }, []);

  const handleAction = async (userId, action) => {
    try {
      const response = await axiosInstance.put(`user/${userId}`, {
        status: action,
      });
      toast.success(response.data.message);
      const updatedUsers = users.map((user) => {
        return user._id === userId ? (user = response.data.user) : user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (users.length === 0) {
    return (
      <div className="m-auto text-center p-6 bg-white shadow-lg rounded-lg  group hover:bg-violet-400">
        <h4 className="text-xl font-semibold text-gray-700 group-hover:text-red-700">
          No Items Found
        </h4>
        <p className="text-violet-600 mt-2 group group-hover:text-white">
          Try adjusting your search or adding new items.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center space-x-40 bg-gray-400 uppercase shadow-md py-2 text-sm font-bold text-gray-800">
        <span className="ml-18 mr-27">Profile</span>
        <span className="m">Name</span>
        <span className="ml-16">Email</span>
        <span className="ml-28">Last Login</span>
        <span className="ml-10">Status</span>
        <span>Action</span>
      </div>

      {/* usercontainer */}
      <div className="flex flex-col gap-1">
        {users.map((user) => {
          return (
            <UserCard key={user._id} {...user} handleAction={handleAction} />
          );
        })}
      </div>
    </div>
  );
};
export default ManageUsers;
