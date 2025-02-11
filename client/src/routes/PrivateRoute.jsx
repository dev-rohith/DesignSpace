import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({
  allowedRoles = [],
  children,
  exculde = false,
  excludedRoles = [],
}) => {
  const { isLoggedIn, user } = useSelector((store) => store.auth);
  console.log(isLoggedIn, user)
  console.log(user);
  console.log(isLoggedIn);

  if (!isLoggedIn && !user) {
    return <Navigate to="/login" replace />;
  }

  if (children) return children;

  if (exculde && excludedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
