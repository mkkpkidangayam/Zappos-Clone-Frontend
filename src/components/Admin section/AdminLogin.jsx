import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import myContext from "../../context/myContextxt";
import Cookies from "js-cookie";
import { Axios } from "../../MainPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AdminLogin = () => {
  const navigate = useNavigate();
  document.title = "Admin-Login";
  const { setIsAdminLogin } = useContext(myContext);
  const [showPassword, setShowPassword] = useState(false);
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

    try {
      const response = await Axios.post("/admin/login", formData);
      const { adminToken } = response.data;
      localStorage.setItem("adminToken", adminToken);
      Cookies.set("adminToken", adminToken, { expires: 1 });
      setIsAdminLogin(true);
      navigate("/admin");
      toast.success(response.data.message);
    } catch (error) {
      setError("Invalid username or password");
      // toast.error(response.data.message);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-[url('https://media.licdn.com/dms/image/C561BAQEIPV76nJFFsQ/company-background_10000/0/1584409661241/zapposcom_cover?e=2147483647&v=beta&t=rmXnB4efRTXuqmIrTBVpNbmtZIqWG-uiTtkfuozpXvw')]">
      <div className="w-80 py-2 flex flex-col shadow-2xl rounded-2xl bg-gray-200 justify-around opacity-95">
        <h1 className="text-2xl text-emerald-800 mx-4 font-bold text-center border-b-2 border-blue-400 pb-4">
          <Link to={"/"}>Admin Login</Link>
        </h1>

        <form onSubmit={handleSubmit} className="px-4 my-4">
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
              className="w-full border rounded py-2 px-3 h-8"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <div className="border rounded flex justify-between bg-white px-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-10/12  py-2 h-8 outline-none"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="h-8 bg-blue-700 text-white w-full  font-bold rounded hover:bg-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
