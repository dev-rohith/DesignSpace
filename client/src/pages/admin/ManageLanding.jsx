import { useEffect } from "react";
import { getLanding } from "../../features/actions/landingActions";
import { useDispatch, useSelector } from "react-redux";

const ManageLanding = () => {
  const {
    carousel,
    customer_reviews,
    designers,
    designers_locations,
    isLoading,
    isError,
  } = useSelector((store) => store.landing);
  const dispatch = useDispatch();

  useEffect(() => {
    (async (params) => {
      const actionResult = await dispatch(getLanding(params));
      if (getLanding.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, []);

  console.log( carousel,
    customer_reviews,
    designers,
    designers_locations,
    isLoading,
    isError)

  return <div>
    <h4>world</h4>
  </div>;
};
export default ManageLanding;
