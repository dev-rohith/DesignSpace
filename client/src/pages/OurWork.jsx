import { useEffect } from "react";
import LandingLayout from "../layout/LandingLayout";
import { useDispatch } from "react-redux";
import { getPortfolios } from "../features/landingApi";

const OurWork = () => {
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

  return (
    <LandingLayout>
      <div>OurWork</div>
    </LandingLayout>
  );
};
export default OurWork;
