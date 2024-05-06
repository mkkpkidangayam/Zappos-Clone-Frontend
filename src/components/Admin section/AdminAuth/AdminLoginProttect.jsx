import { Navigate } from "react-router-dom";

const AdminLoginProttect = ({children}) => {
    const token = localStorage.getItem("adminToken");
  
    if (!token) {
      return children;
    } else {
      return (
        <>
          <Navigate to="/admin" replace />
        </>
      );
    }
  };
  
  export default AdminLoginProttect