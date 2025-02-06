import { Route, Routes } from "react-router-dom";
import { Landing, Login, NotFound, Register } from "../pages";
import Pricing from "../pages/Pricing";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login/>} />
    <Route path="/pricing" element={<Pricing/>} />  {/*it should be the private after*/}
      <Route path="/signup" element={<Register />} />
      <Route path="*" element={<NotFound />} />
 

    </Routes>
  );
};
export default AppRoutes;
