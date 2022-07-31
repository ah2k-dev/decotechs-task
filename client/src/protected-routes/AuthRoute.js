import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const AuthRoute = ({Component}) => {
  const {isAuthenticated } = useSelector((state) => state.user);
  const useAuth = () =>{
    if(isAuthenticated === true){
        return true
    }
    else{
        return false
    }
  }
  const auth = useAuth()
  return auth ? <Component /> : <Navigate to="/" />
};

export default AuthRoute;