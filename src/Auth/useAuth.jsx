import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useAuth = () => {
  const auth = useContext(AuthContext)
  // console.log(auth.user.userId);
  return auth;
};

export default useAuth;