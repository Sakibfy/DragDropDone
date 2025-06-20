import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../AuthProvider";
import Loadnig from "../../Component/Loadnig";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
  const location = useLocation();
  if (loading) {
    return <Loadnig></Loadnig>
}
  if (user) {
    return children
  }

  return <Navigate to='/login' state={location.pathname} replace></Navigate>
};

export default PrivateRoute;