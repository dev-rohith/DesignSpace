import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles = [], children, exculde = false }) => {
  const { isLoggedIn, user } = useSelector((store) => store.auth);

  if (!user && exculde) {
    return <Outlet />;
  }

  if (!isLoggedIn && !user) {
    return <Navigate to="/login" replace />;
  }

  if (children) return children;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
