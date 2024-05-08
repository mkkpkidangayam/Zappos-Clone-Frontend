import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import myContext from "../../context/myContextxt";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const navigate = useNavigate();
  document.title = "Admin-Login";
  const { setIsAdminLogin } = useContext(myContext);
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
      const response = await axios.post(
        "http://localhost:4323/api/admin/login",
        formData
      );
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
  // axios
  //   .post("http://localhost:4323/api/admin/login", formData)
  //   .then((response) => {
  //     const { adminToken } = response.data;
  //     console.log(adminToken);
  //     localStorage.setItem("adminToken", adminToken)
  //     setIsAdminLogin(true)
  //     navigate('/add-product')

  //   }).catch((error)=> {
  //     setError("Invalid username or password");
  //   toast.error("Invalid username or password");
  //   console.error("Login failed:", error);
  //   })

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
    <div className="container flex justify-center items-center h-screen bg-cover bg-[url('https://media.licdn.com/dms/image/C561BAQEIPV76nJFFsQ/company-background_10000/0/1584409661241/zapposcom_cover?e=2147483647&v=beta&t=rmXnB4efRTXuqmIrTBVpNbmtZIqWG-uiTtkfuozpXvw')]">
      <div className="w-1/4 h-2/4 flex flex-col shadow-2xl rounded-2xl bg-gray-200 justify-around">
        <h1 className="text-2xl text-green-950 mx-4 font-bold text-center border-b-2 border-blue-400 pb-4">
          <Link to={"/"}>Admin Login</Link>
        </h1>

        <form onSubmit={handleSubmit} className="px-4">
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
            className="bg-blue-500 text-white w-full py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
