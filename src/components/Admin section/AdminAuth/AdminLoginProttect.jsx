import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AdminLoginProttect = ({ children }) => {
  // const token = localStorage.getItem("adminToken");
  const admintoken = Cookies.get("adminToken");

  if (!admintoken) {
    return children;
  } else {
    return (
      <>
        <Navigate to="/admin" replace />
      </>
    );
  }
};

export default AdminLoginProttect;
