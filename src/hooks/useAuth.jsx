import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const authInfo = useContext(AuthContext); // FIX: useContext, NOT use()
  return authInfo;
};

export default useAuth;
export { useAuth };  // <-- add this
