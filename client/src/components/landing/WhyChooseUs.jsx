import {
  FileChartColumnIncreasing,
  LampWallUp,
  MessageSquareShare,
  ScanSearch,
  Share2,
  Target,
} from "lucide-react";

const WhyChooseUs = () => {
  return (
    <div className="my-10">
      <div className="grid grid-cols-1  md:grid-cols-2 gap-10  lg:gap-20 lg:px-20 lg:grid-cols-3 ">
        <div className="flex flex-col md:flex-row max-w-xs items-center  md:space-x-6 group mx-auto md:mx-5">
          <MessageSquareShare className="mb-5 w-10 h-10 md:h-20 md:w-30 pt-3 group-hover:text-(--primary)" />
          <p className="mb-2 text-center md:text-left tracking-tight">
            Connect directly with Our World class Desinger and Get Your Design
            to reality
          </p>
        </div>
        <div className="flex flex-col md:flex-row  max-w-xs items-center  md:space-x-6 group mx-auto md:mx-5">
          <LampWallUp className="mb-5 w-10 h-10 md:h-20 md:w-30 pt-3 group-hover:text-(--primary)" />
          <p className="mb-2 text-center md:text-left tracking-tight">
            project Centric Work Flow to ensure timely delivery of your project
          </p>
        </div>
        <div className="flex flex-col md:flex-row  max-w-xs items-center  md:space-x-6 group mx-auto md:mx-5">
          <Target className="mb-5 w-10 h-10 md:h-20 md:w-30 pt-3 group-hover:text-(--primary)" />
          <p className="mb-2 text-center md:text-left tracking-tight">
            Set the target we will bring the best out of it. Quality and
            satisfaction is our priority.
          </p>
        </div>
        <div className="flex flex-col md:flex-row  max-w-xs items-center  md:space-x-6 group mx-auto md:mx-5">
          <FileChartColumnIncreasing className="mb-5 w-10 h-10 md:h-18 md:w-30 pt-3 group-hover:text-(--primary)" />
          <p className="mb-2 text-center md:text-left tracking-tight">
            Track your project progress and get the updates on the go.
          </p>
        </div>
        <div className="flex flex-col md:flex-row  max-w-xs items-center  md:space-x-6 group mx-auto md:mx-5">
          <Share2 className="mb-5 w-10 h-10 md:h-20 md:w-30 pt-3 group-hover:text-(--primary)" />
          <p className="mb-2 text-center md:text-left tracking-tight">
            You can share your feedback and get the changes. Real time
            interaction with our Assoicates.
          </p>
        </div>
        <div className="flex flex-col md:flex-row  max-w-xs items-center  md:space-x-6 group mx-auto md:mx-5">
          <ScanSearch className="mb-5 w-10 h-10 md:h-30 md:w-30 pt-3 group-hover:text-(--primary)" />
          <p className="mb-2 text-center md:text-left tracking-tight">
            We believe in quality and satisfaction. We will give our best to
            make your dream project come true.
          </p>
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
