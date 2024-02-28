import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import myContext from "../../context/myContextxt";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useContext(myContext);
  return (
    <>
      {isLogin ? (
        children
      ) : (
        <>
          {toast.error("Authentication error, please Sign-in for access")}
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
