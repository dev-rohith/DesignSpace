import { Navbar } from "../components";

const LandingLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      <div>
        {children}
      </div>
    </div>
  );
};
export default LandingLayout;
