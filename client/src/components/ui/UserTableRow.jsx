import { format, parseISO } from "date-fns";

const UserTableRow = ({
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
    <tr className="bg-white hover:shadow-lg hover:-translate-0.5 hover:bg-gray-50 transition">
      <td className="py-3 pl-4">
        <img
          src={profilePicture}
          alt="user-profile-pic"
          className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
        />
      </td>
      <td>
        <p className="text-gray-800 font-semibold text-sm truncate max-w-[150px]">
          {firstName} {lastName}
        </p>
      </td>
      <td>
        <p className="text-gray-600 truncate max-w-[220px]">{email}</p>
      </td>
      <td className="hidden sm:table-cell">
        <p className="text-gray-500 truncate max-w-[200px]">{lastLogin}</p>
      </td>
      <td>
        {status === "active" && (
          <span className="inline-block text-sm px-3 py-1 bg-green-100 text-green-600 rounded-full w-[100px] text-center">
            Active
          </span>
        )}
        {status === "suspended" && (
          <span className="inline-block text-sm px-3 py-1 bg-red-100 text-red-600 rounded-full w-[100px] text-center">
            Suspended
          </span>
        )}
      </td>
      <td>
        {role !== "admin" && status === "active" && (
          <button
            onClick={() => handleAction(_id, "suspended")}
            className="bg-red-500 text-white px-4 py-1 cursor-pointer rounded-4xl hover:bg-red-600 hover:shadow w-[120px]"
          >
            Deactivate
          </button>
        )}
        {role !== "admin" && status === "suspended" && (
          <button
            onClick={() => handleAction(_id, "active")}
            className="bg-green-500 text-white px-4 py-1 cursor-pointer rounded-4xl hover:bg-green-600 hover:shadow w-[120px]"
          >
            Activate
          </button>
        )}
        {role === "admin" && (
          <button className="bg-gray-400 text-white px-7 py-1 rounded-4xl w-[120px]">
            Admin
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserTableRow;
