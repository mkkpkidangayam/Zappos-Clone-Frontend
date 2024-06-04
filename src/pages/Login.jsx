import React, { useContext, useEffect, useState } from "react";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/myContextxt";
import toast from "react-hot-toast";
import FooterSecond from "../components/Footer/FooterSecond";
import Cookies from "js-cookie";
import { Axios } from "../MainPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(myContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {}, [setIsLogin]);

  function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password fields.");
      return;
    }

    Axios.post("/login", {
      email,
      password,
    })
      .then((response) => {
        const { token, userData } = response.data;
        Cookies.set("token", token, { expires: 1 });
        localStorage.setItem("token", token);
        const userInfo = JSON.stringify(userData);
        localStorage.setItem("userInfo", userInfo);
        setIsLogin(true);
        navigate(-1);
        const userDetails = userData;
        toast.success(
          `${capitalize(userDetails?.name)}, ${response.data.message}`
        );
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Login error:", error);
      });
  };

  return (
    <div>
      <div className="h-24 flex justify-center items-center ">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="mb-32 flex justify-center">
        <div className="w-[650px] flex justify-center">
          <div className="w-[348px] h-[384px] rounded p-6 border border-black">
            <h1 className="text-2xl mb-4">
              <b>Sign in</b>
            </h1>
            <form onSubmit={handleSubmit}>
              <label className="font-bold text-sm" htmlFor="email">
                Email
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border mb-5 pl-2 border-black w-[296px] h-[31px] rounded"
                  autoComplete="current-email"
                />
              </label>
              <label className="font-bold text-sm" htmlFor="password">
                Password
                <Link
                  to={"/forgot-password"}
                  className="ml-[90px] font-normal hover:underline"
                >
                  Forgot your password?
                </Link>
                <div className="w-[296px] border border-black rounded">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mx-2 w-[245px] h-[31px] outline-none"
                    autoComplete="current-password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-1 text-[#153e51] cursor-pointer"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </span>
                </div>
              </label>
              <button
                type="submit"
                className="bg-[#153e51] text-white font-bold my-5 w-[296px] h-[31px] rounded"
              >
                Sign in
              </button>
            </form>
            <hr className="border border-black-300" />
            <div className="translate-y-7 flex justify-center w-[296px]">
              <p className="text-[12px]">New to Zappoz?</p>
            </div>
            <br />
            <button
              onClick={() => navigate("/register")}
              className="w-[296px] h-[31px] mt-3 border-2 font-bold rounded text-[#003953] border-[#003953]"
            >
              Create your Zappos account
            </button>
          </div>
        </div>
      </div>
      <div>
        <hr />
        <FooterSecond />
      </div>
    </div>
  );
}

export default Login;
