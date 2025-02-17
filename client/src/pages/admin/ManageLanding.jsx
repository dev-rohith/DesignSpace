import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarouselItem from "../../components/carousel/CarouselItem";
import LandingRowItems from "../../components/common/LandingRowItems";
import TopDesingerCard from "../../components/ui/TopDesingerCard";
import { getLanding } from "../../features/actions/landingActions";
import UserReviewItem from "../../components/ui/UserReviewItem";
import { AddLandingItem, ErrorState, Spinner } from "../../components";
import AddLandingCarouselItem from "../../components/common/AddLandingItem";
import { deleteCaroseulItem } from "../../features/actions/adminactions";
import toast from "react-hot-toast";

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
    console.log(id);
    const actionResult = await dispatch(deleteCaroseulItem(id));
    if (deleteCaroseulItem.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
    } else if (deleteCaroseulItem.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorState />;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {/* Carousel Section */}
      <section className="mb-12">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[calc(33.33%-16px)] ">
            <LandingRowItems>
              {carousel.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex-[0_0_calc(33.33%-16px)]"
                >
                  <CarouselItem
                    {...item}
                    itemHeight="68"
                    handleDelete={deleteCarouselItem}
                  />
                </div>
              ))}
            </LandingRowItems>
          </div>
          <div className="w-70 cursor-pointer">
            <AddLandingItem height="h-68" />
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
                  className="flex-[0_0_calc(33.33%-16px)] min-w-0 mr-16 py-4"
                >
                  <div className="h-full">
                    <TopDesingerCard {...data} />
                  </div>
                </div>
              ))}
            </LandingRowItems>
          </div>
          <div className="w-70">
            <AddLandingCarouselItem height="h-52" />
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
                  className="flex-[0_0_calc(33.33%-16px)] min-w-0 mr-14 py-4"
                >
                  <UserReviewItem {...data} />
                </div>
              ))}
            </LandingRowItems>
          </div>
          <div className="w-70">
            <AddLandingItem height="h-100" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageLanding;
