import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./features/authApi";
import PageLoadingSpinner from "./components/common/PageLoadingSpinner";

const App = () => {
  const dispatch = useDispatch();
  const { onPageLoad } = useSelector((store) => store.auth);

  if(onPageLoad){
    dispatch(getUser())
  }

  if (onPageLoad) {
    return (
      <PageLoadingSpinner />
    );
  }

  return (
    <div>
      <AppRoutes />
    </div>
  );
};
export default App;
