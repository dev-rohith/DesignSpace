import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselItem from "../../components/carousel/CarouselItem";
import LandingRowItems from "../../components/common/LandingRowItems";
import TopDesingerCard from "../../components/ui/TopDesingerCard";
import { getLanding } from "../../features/actions/landingActions";
import UserReviewItem from "../../components/ui/UserReviewItem";
import { AddLandingItem, ErrorState, Spinner } from "../../components";
import {
  deleteCaroseulItem,
  deleteCustomerReviewItem,
  deleteTopDesignerItem,
} from "../../features/actions/adminactions";
import toast from "react-hot-toast";
import AddTopDesignerItem from "../../components/ui/AddTopDesignerItem";
import AddCustomerReviewItem from "../../components/ui/AddCustomerReviewItem";

const ManageLanding = () => {
  const { carousel, customer_reviews, designers, isLoading, isError } =
    useSelector((store) => store.landing);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getLanding()).unwrap();
      if (getLanding.rejected.match(actionResult)) {
        toast.error(actionResult.payload.message);
      }
    })();
  }, [dispatch]);

  const deleteCarouselItem = async (id) => {

    const actionResult = await dispatch(deleteCaroseulItem(id));
    if (deleteCaroseulItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (deleteCaroseulItem.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const deleteTopDesigner = async (id) => {
    const actionResult = await dispatch(deleteTopDesignerItem(id));
    if (deleteTopDesignerItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (deleteTopDesignerItem.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const deleteUserReview = async (id) => {
    const actionResult = await dispatch(deleteCustomerReviewItem(id));
    if (deleteCustomerReviewItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (deleteCustomerReviewItem.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorState />;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {/* Carousel Section */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-4 ">
          <div className="flex-1 min-w-[calc(33.33%-16px)]  ">
            <LandingRowItems>
              {carousel.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex-[0_0_calc(33.33%-16px)] "
                >
                  <CarouselItem {...item} handleDelete={deleteCarouselItem} />
                </div>
              ))}
            </LandingRowItems>
          </div>
          <div className="w-70 cursor-pointer">
            <AddLandingItem />
          </div>
        </div>
      </section>

      {/* Designers Section */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[calc(33.33%-16px)]">
            <LandingRowItems>
              {designers.map((data, index) => (
                <div
                  key={data._id || index}
                  className="flex-[0_0_calc(42.33%-16px)] min-w-0 py-4"
                >
                  <div className="h-full space-x-1 ">
                    <TopDesingerCard
                      {...data}
                      deleteTopDesigner={deleteTopDesigner}
                    />
                  </div>
                </div>
              ))}
            </LandingRowItems>
          </div>
          <div className="w-70">
            <AddTopDesignerItem />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[calc(33.33%-16px)]">
            <LandingRowItems>
              {customer_reviews.map((data, index) => (
                <div
                  key={data._id || index}
                  className="flex-[0_0_calc(33.33%-16px)] min-w-0 mr-16 py-4 h-120 w-70"
                >
                  <UserReviewItem
                    {...data}
                    deleteUserReview={deleteUserReview}
                  />
                </div>
              ))}
            </LandingRowItems>
          </div>
          <div className="w-70">
            <AddCustomerReviewItem />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageLanding;
