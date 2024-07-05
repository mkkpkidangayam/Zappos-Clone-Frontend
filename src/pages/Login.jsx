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
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await Axios.post("/google-login", {
          token: tokenResponse.access_token,
        });
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
      } catch (error) {
        toast.error(error.response.data.message);
        console.error("Google login error:", error);
      }
    },
  });

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
    <div className="h-screen flex flex-col justify-between">
      <div className="h-24 flex justify-center items-end ">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="md:w-[650px] flex justify-center">
          <div className="rounded p-6 border border-black flex flex-col">
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
                  className="border mb-5 pl-2 border-black min-w-64 md:w-[296px] h-[31px] rounded"
                  autoComplete="current-email"
                />
              </label>
              <label className="font-bold text-sm" htmlFor="password">
                <div className="flex justify-between">
                  Password
                  <Link
                    to={"/forgot-password"}
                    className=" font-normal hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="md:w-[296px] min-w-64 border border-black rounded flex justify-between">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mx-2 md:w-[245px] h-[31px] outline-none"
                    autoComplete="current-password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="pt-1 pr-1 text-[#153e51] cursor-pointer"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </span>
                </div>
              </label>
              <button
                type="submit"
                className="bg-[#153e51] text-white font-bold my-5 md:w-[296px] min-w-64 h-[31px] rounded"
              >
                Sign in
              </button>
            </form>
            <hr className="border border-black-300" />
            <div className="flex justify-center min-w-64 md:w-[296px]">
              <p className="text-[12px]">New to Zappoz?</p>
            </div>

            <button
              onClick={() => navigate("/register")}
              className="md:w-[296px] min-w-64 h-[31px] mt-3 border-2 font-bold rounded text-[#003953] border-[#003953]"
            >
              Create your Zappos account
            </button>

            <span className="text-center">or</span>

            <button
              onClick={() => googleLogin()}
              className="md:w-[296px] min-w-64 h-10 mt-3 border font-bold rounded text-[#003953] border-[#003953]"
            >
              <div className="flex justify-around w-52 mx-auto">
                <FcGoogle className="mt-1 text-xl" /> <p>Login with Google</p>
              </div>
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
