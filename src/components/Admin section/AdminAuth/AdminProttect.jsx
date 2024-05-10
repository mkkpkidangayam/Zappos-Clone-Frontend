import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AdminProttect = ({children}) => {
  const admintoken = Cookies.get("adminToken");
  // const admintoken = localStorage.getItem("adminToken");

  if (admintoken) { 
    return children;
  } else {
    return (
      <>
        {toast.error("Authentication error, please Sign-in for access")}
        <Navigate to="/admin-login"  replace/>
      </>
    );
  }
};

export default AdminProttect
