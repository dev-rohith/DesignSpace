import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/common/Pagination";
import Sort from "../../components/common/Sort";
import PageLimit from "../../components/common/PageLimit";
import PendingApplicationsTable from "../../components/ui/PendingApplicationsTable";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getPendingApplications } from "../../features/actions/adminactions";
import Filter from "../../components/common/Filter";

const PendingApplications = () => {
  const { applications } = useSelector((store) => store.admin);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(
        getPendingApplications(`application/pending?${searchParams.toString()}`)
      );
      if (getPendingApplications.rejected.match(actionResult)) {
        toast.error(actionResult.payload);
      }
    })();
  }, [searchParams]);

  if (!applications) {
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
        <PageLimit size={5} step={2} />
        <Filter
          filters={[
            { title: "requestedRole", options: ["associate", "designer"] },
          ]}
        />
        <Sort
          options={[
            { name: "Relevence", value: "" },
            { name: "newest", value: "requestedDate" },
            { name: "oldest", value: "-requestedDate" },
          ]}
        />
      </div>
      <PendingApplicationsTable />
      <Pagination data={applications} />
    </div>
  );
};
export default PendingApplications;
