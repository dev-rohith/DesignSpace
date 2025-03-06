import { Navbar } from "../components";

const LandingLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden  scrollbar-thin 
                 scrollbar-thumb-violet-500  scrollbar-track-violet-200 
                   scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      >
        {children}
      </div>
    </div>
  );
};

export default LandingLayout;
