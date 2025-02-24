import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosIntance";
import DesingerItem from "./DesingerItem";
import Spinner from "../common/Spinner";
import ErrorState from "../common/placeholders/ErrorState";

import Pagination from "../common/Pagination";
import { useSearchParams } from "react-router-dom";

const DesingersFeed = () => {
  const [designers, setDesigners] = useState({
    data: [],
  })
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams()

  useEffect(()=>{
     (async () => {
       try {
         const response = await axiosInstance.get(`/designer/all?${searchParams.toString()}`);
         if (response) {
           setDesigners(response.data);
           setIsLoading(false);
         }
       } catch (error) {
         console.error(error);
       }
     })();
  },[searchParams])
 
  return (
    <div>
      <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-6 bg-green-300">
        {designers.data.map((designer, index) => {
          return <DesingerItem key={designer._id || index} {...designer} />;
        })}
      </div>
      <div>
        <Pagination data={designers} />
      </div>
    </div>
  );
};
export default DesingersFeed;
