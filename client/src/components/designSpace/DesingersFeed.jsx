import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosIntance";
import DesingerItem from "./DesingerItem";
import Spinner from "../common/Spinner";
import ErrorState from "../common/ErrorState";

const DesingersFeed = () => {
  const [designers, setDesigners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("designer/all");
        console.log(response);
        setDesigners(response.data);
      } catch (error) {
        setError(error.response.data.messege);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);



  if (isLoading) return <Spinner />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="grid grid-cols-4 gap-4 ml-6 bg-green-300">
      {designers.map((designer, index) => {
        return <DesingerItem key={designer._id || index} {...designer} />;
      })}
    </div>
  );
};
export default DesingersFeed;
