import { SearchIcon } from "lucide-react";
import PageLimit from "../common/PageLimit";
import Sort from "../common/Sort";
import Search from "../common/Search";
import DesingersFeed from "./DesingersFeed";
import AdvancedFilters from "../ui/AdvancedFilters";

const DesingersFeedOperations = () => {
  return (
    <div className="w-full overflow-y-scroll">
      <div className="flex items-center justify-between py-2  bg-gradient-to-bl from-violet-400 via-violet-100 to-fuchsia-300">
        <div className="ml-8 flex items-center">
          <span className="mr-2 font-raleway">Perpage :</span>
          <div className="border font-sansita">
            <PageLimit size={8} step={4} />
          </div>
        </div>
        <div className="flex items-center mr-8  gap-2 justify-between">
         <div className="font-semibold  text-gray-700">Sort By :</div>
          <div className=" border-2 border-violet-400 overflow-hidden">
            <Sort
              options={[
                { name: "Relevence", value: "" },
                { name: "price(lower to higher)", value: "starting_price" },
                { name: "price(higher to lower", value: "-starting_price" },
                { name: "newest", value: "createdAt" },
                { name: "oldest", value: "-createdAt" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <AdvancedFilters />
        <DesingersFeed />
      </div>
    </div>
  );
};
export default DesingersFeedOperations;
