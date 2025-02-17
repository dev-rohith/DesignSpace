import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPortfolios } from "../../features/actions/landingActions";

const AssociateProfile = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getPortfolios());
      if (getPortfolios.fulfilled.match(actionResult)) {
        console.log(actionResult.payload);
      } else if (getPortfolios.rejected.match(actionResult)) {
        console.log(actionResult.payload);
      }
    })();
  }, []);

  return <div>AssociateProfile</div>;
};
export default AssociateProfile;
