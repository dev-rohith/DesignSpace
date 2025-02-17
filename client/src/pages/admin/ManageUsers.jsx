import UsersTable from "../../components/ui/UsersTable";
import Filter from "../../components/common/Filter";
import Sort from "../../components/common/Sort";
import PageLimit from "../../components/common/PageLimit";
import Search from "../../components/common/Search";

const ManageUsers = () => {
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
        <Search />
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

      <UsersTable />
    </div>
  );
};
export default ManageUsers;
