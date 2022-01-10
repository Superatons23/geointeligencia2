import React, { useContext} from "react";
import {
 
  useLocation,
  Navigate,

} from "react-router-dom";
import { AuthContext, useAuthState } from "../../database/Auth";

const RequireAuth = ({children}) => {
  let location = useLocation();


 const {currentUser}=useContext(AuthContext)


 if(currentUser==null){
  return <Navigate to="/signin" state={{ from: location }} replace />
 }
 return children;


};

export default RequireAuth;
