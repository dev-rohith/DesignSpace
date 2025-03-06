import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosIntance";
import DesingerItem from "./DesingerItem";
import Spinner from "../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import Pagination from "../common/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createChatRoom } from "../../features/actions/chatActions";

const DesingersFeed = () => {
  const { user } = useSelector((store) => store.auth);
  const [designers, setDesigners] = useState({
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      console.log('teting...')
      try {
        const response = await axiosInstance.get(
          `/designer/all?${searchParams.toString()}`
        );
        if (response) {
          setDesigners(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [searchParams]);

  const handleChat = async (id) => {
    if (!user) {
      navigate("/login");
    }
    const actionResult = await dispatch(createChatRoom({ designerId: id }));
    if (createChatRoom.fulfilled.match(actionResult)) {
      navigate("/chat");
    } else if (createChatRoom.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="grid my-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ml-6 ">
        {designers.data.map((designer, index) => {
          return (
            <DesingerItem
              key={designer._id || index}
              {...designer}
              handleChat={handleChat}
            />
          );
        })}
      </div>
      <div>
        <Pagination data={designers} />
      </div>
    </div>
  );
};
export default DesingersFeed;
