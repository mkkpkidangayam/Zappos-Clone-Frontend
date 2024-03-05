import  { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import myContext from "../../context/myContextxt";

const AdminLogin = () => {
  const navigate = useNavigate();
  const {setIsAdminLogin} = useContext(myContext)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4323/api/admin/login", formData)
      .then((response) => {
        const { adminToken } = response.data;
        localStorage.setItem("adminToken", adminToken)
        setIsAdminLogin(true)
        navigate('/add-product')

      }).catch((error)=> {
        setError("Invalid username or password");
      toast.error("Invalid username or password");
      console.error("Login failed:", error);
      })
        
      }

    // try {
    //   const response = await axios.post("http://localhost:4323/api/admin/login", formData);

    //     toast.success("Login success")

    // } catch (error) {
    //   setError("Invalid username or password");
    //   toast.error("Invalid username or password");
    //   console.error("Login failed:", error);
    // }
  // };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
