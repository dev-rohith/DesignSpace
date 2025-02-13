import { format, parseISO } from "date-fns";

const UserCard = ({
  _id,
  email,
  firstName,
  lastName,
  profilePicture,
  role,
  status,
  lastLoginOn,
  handleAction,
}) => {
  const lastLogin = lastLoginOn?.[0]
    ? format(parseISO(lastLoginOn[0]), "dd MMM yyyy, hh:mm a")
    : "No login data";

  return (
    <div className="flex items-center justify-around bg-white shadow-md py-3 px-4  hover:shadow-lg transition ">
      <img
        src={profilePicture}
        alt="user-profile-pic"
        className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
      />

      <p className="text-gray-800 font-semibold px-4 w-[150px] text-sm truncate">
        {firstName} {lastName}
      </p>

      <p className="text-gray-600 px-4 w-[220px] truncate">{email}</p>

      <p className="text-gray-500 px-4 w-[200px] hidden sm:block truncate">
        {lastLogin}
      </p>

      {status === "active" && (
        <span className="text-sm px-3 py-1 bg-green-100 text-green-600 rounded-full w-[100px] text-center">
          Active
        </span>
      )}

      {status === "suspended" && (
        <span className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-full w-[100px] text-center">
          Suspended
        </span>
      )}

      {role !== "admin" && status === "active" && (
        <button
          onClick={() => handleAction(_id, "suspended")}
          className=" bg-red-500 text-white px-4 py-1 cursor-pointer rounded-4xl hover:bg-red-600 hover:shadow w-[120px]"
        >
          Deactivate
        </button>
      )}

      {role !== "admin" && status === "suspended" && (
        <button
          onClick={() => handleAction(_id, "active")}
          className=" bg-green-500 text-white px-4 py-1 cursor-pointer rounded-4xl hover:bg-green-600 hover:shadow w-[120px]"
        >
          Activate
        </button>
      )}

      {role === "admin" && (
        <button className=" bg-gray-400 text-white px-7 py-1 rounded-4xl w-[120px]">
          Admin
        </button>
      )}
    </div>
  );
};
export default UserCard;
