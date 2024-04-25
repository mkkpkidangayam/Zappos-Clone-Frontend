import { Navigate } from "react-router-dom";

const LoginProtect = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  } else {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  }
};

export default LoginProtect;
