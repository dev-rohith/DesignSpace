import UsersTable from "../../components/ui/UsersTable";
import Filter from "../../components/common/Filter";
import Sort from "../../components/common/Sort";
import PageLimit from "../../components/common/PageLimit";
import Search from "../../components/common/Search";

const ManageUsers = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center gap-4 bg-violet-300 px-4 py-2 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <PageLimit size={5} step={5} />
          <div className="h-6 w-px bg-violet-400/50" /> {/* Divider */}
          <Filter
            filters={[
              { title: "status", options: ["active", "suspended"] },
              { title: "role", options: ["client", "admin", "designer", "associate"] },
            ]}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Search />
          <div className="h-6 w-px bg-violet-400/50" /> {/* Divider */}
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

      <UsersTable />
    </div>
  );
};

export default ManageUsers;