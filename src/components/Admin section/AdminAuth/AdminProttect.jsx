import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AdminProttect = ({children}) => {
  const token = localStorage.getItem("adminToken");

  if (token) { 
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
