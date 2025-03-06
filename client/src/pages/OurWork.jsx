import { useEffect } from "react";
import LandingLayout from "../layout/LandingLayout";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolios } from "../features/actions/landingActions";
import PortfolioGallery from "../components/ui/PortfolioGallery";

const OurWork = () => {
  const dispatch = useDispatch();
  const {portfolios} = useSelector((store) => store.landing);
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
        <PortfolioGallery data={portfolios} />
    </LandingLayout>
  );
};
export default OurWork;
