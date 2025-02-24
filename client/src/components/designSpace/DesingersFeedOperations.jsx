import { SearchIcon } from "lucide-react";
import PageLimit from "../common/PageLimit";
import Sort from "../common/Sort";
import Search from "../common/Search";
import DesingersFeed from "./DesingersFeed";

const DesingersFeedOperations = () => {
 
    return (
      <div>
        <div className="flex items-center justify-between py-2  bg-gradient-to-bl from-violet-400 via-violet-100 to-fuchsia-300">
          <div className="ml-8">
            <PageLimit size={8} step={4} />
          </div>
          <div className="flex items-center mr-8  gap-6 justify-between">
            <div className="rounded-2xl border-3 border-violet-400 overflow-hidden">
              <Sort
                options={[
                  { name: "Relevence", value: "" },
                  { name: "price(lower to higher)", value: "-startingPrice" },
                  { name: "price(higher to lower", value: "startingPrice" },
                  { name: "newest", value: "createdAt" },
                  { name: "oldest", value: "-createdAt" },
                ]}
              />
            </div>
          </div>
        </div>
        <DesingersFeed />
  
      </div>
    );
  };
  export default DesingersFeedOperations;