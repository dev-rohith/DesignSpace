import { useSelector } from "react-redux";
import ApplicationTableRow from "./ApplicationTableRow";

const PendingApplicationsTable = () => {
  const { applications } = useSelector((store) => store.admin);

  if (applications?.data?.length === 0)
    return (
      <p className="flex justify-center items-center h-screen text-gray-500">
        No applications found
      </p>
    );
    
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-400 text-sm font-bold text-gray-800 shadow-md">
          <th className="py-2 text-left pl-4">User</th>
          <th className="py-2 text-left">Requested role</th>
          <th className="py-2 text-left">Requested date</th>
          <th className="py-2 text-left hidden sm:table-cell">Status</th>
          <th className="py-2 text-left">View for Action</th>
        </tr>
      </thead>
      <tbody>
        {applications?.data?.map((application) => (
          <ApplicationTableRow key={application._id} {...application} />
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};
export default PendingApplicationsTable;
