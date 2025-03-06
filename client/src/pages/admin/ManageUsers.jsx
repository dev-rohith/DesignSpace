import UsersTable from "../../components/ui/UsersTable";
import Filter from "../../components/common/Filter";
import Sort from "../../components/common/Sort";
import PageLimit from "../../components/common/PageLimit";
import Search from "../../components/common/Search";
import { UserRoundSearch } from "lucide-react";

const ManageUsers = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-white  shadow-sm p-4 ">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className=" flex items-center gap-2 ">
              <span className="text-md ">Show :</span>
              <div className="border">
                <PageLimit size={5} step={5} />
              </div>
            </div>
            <div className="w-full sm:w-auto border-1  py-1">
              <Filter
                filters={[
                  { title: "status", options: ["active", "suspended"] },
                  {
                    title: "role",
                    options: ["client", "admin", "designer", "associate"],
                  },
                ]}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserRoundSearch />
              <Search />
            </div>
            <div className="h-10 w-[2px] bg-gray-700" />
            <div className="w-full sm:w-auto border">
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
          </div>
        </div>
      </div>

      <UsersTable />
    </div>
  );
};

export default ManageUsers;
