import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles = [], children }) => {
  //for both the routing wrapping and as well as children allowed roles must

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
