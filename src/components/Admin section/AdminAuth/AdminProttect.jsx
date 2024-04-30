import toast from "react-hot-toast";

const AdminProttect = () => {

    const token = localStorage.getItem("")

  if (token) {
    return children;
  } else {
    return (
      <>
        {toast.error("Authentication error, please Sign-in for access")}
        <Navigate to="/login" />
      </>
    );
  }
};

export default AdminProttect;
