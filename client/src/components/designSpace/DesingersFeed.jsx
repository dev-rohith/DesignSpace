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
      try {
        const response = await axiosInstance.get(    //this may not need the thunk since its an single operation not linked to global state
          `/designer/all?${searchParams.toString()}`   //this will help faster loading
        );
        if (response) {
          setDesigners(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(error.response.data.message);
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
      toast.error(actionResult.payload?.message);
    }
  };

  if (isLoading) return <Spinner />;

  return (
<div className="h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-gray-100">
<div className="grid my-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ml-6 mr-4 ">
        {
          designers.data.length === 0 && <div className="text-center font-montserrat text-2xl text-gray-500">No Designer Found</div>
        }
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
