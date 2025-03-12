import { SearchIcon } from "lucide-react";
import PageLimit from "../common/PageLimit";
import Sort from "../common/Sort";
import Search from "../common/Search";
import DesingersFeed from "./DesingersFeed";
import AdvancedFilters from "../ui/AdvancedFilters";
import { useState } from "react";

const DesingersFeedOperations = () => {
  const [advancedFiltersOn, setAdvancedFiltersOn] = useState(false);
  return (
    <div className="w-full overflow-y-scroll">
      <div className="flex items-center justify-between py-2  bg-gradient-to-bl from-violet-400 via-violet-100 to-fuchsia-300">
        <div className="ml-8 flex items-center">
          <button
          onClick={()=>{setAdvancedFiltersOn(!advancedFiltersOn)}}
           className="mr-6  font-raleway bg-white px-2 py-1 font-semibold text-gray-700 rounded-lg border-2 hover:bg-violet-400 hover:text-white  ">Apply Advanced filters</button>
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
        {advancedFiltersOn && <AdvancedFilters />}
        <DesingersFeed />
      </div>
    </div>
  );
};
export default DesingersFeedOperations;
