import React, { useContext, useState } from "react";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/myContextxt";
import toast from "react-hot-toast";
import axios from "axios";
import FooterSecond from "../components/Footer/FooterSecond";

function Login() {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(myContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password fields.");
      return;
    }

    axios
      .post("http://localhost:4323/api/login", {
        email,
        password,
      })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        const userInfo = JSON.stringify(response.data.userData);
        localStorage.setItem("userInfo", userInfo);
        setIsLogin(true);
        navigate("/");
        const userDetails = response.data.userData;
        toast.success(`${userDetails?.name}, ${response.data.message}`);
      })
      .catch((error) => {
        toast.error("Invalid email or password");
        console.log("Login error:", error);
      });
  };
  // try {
  //   const response = await axios.post("http://localhost:4323/api/login", {
  //     email,
  //     password,
  //   });
  //   const { token } = response.data;
  //   localStorage.setItem("token", token);
  //   console.log("response",response);
  //   const userInfo = JSON.stringify(response.data.userData);
  //   localStorage.setItem("userInfo", userInfo);
  //   navigate("/");
  //   toast.success(`${userData?.name}, ${response.data.message}`);

  // } catch (error) {
  //   toast.error("Invalid email or password");
  //   console.log("Login error:", error);
  // }

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     setIsLogin(true);
  //   }

  //   const userInfoString = localStorage.getItem('userInfo')
  //   if (userInfoString) {
  //     const userData = JSON.parse(userInfoString)
  //     setUserData(userData)
  //   }
  // },[setIsLogin, setUserData])

  return (
    <div>
      <div className="h-24 flex justify-center items-center ">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="mb-32 flex justify-center">
        <div className="w-[650px] flex justify-center  ">
          <div className="w-[348px] h-[384px] rounded p-6 border border-black">
            <h1 className="text-2xl mb-4">
              <b>Sign in</b>
            </h1>
            <form onSubmit={handleSubmit}>
              <label className="font-bold text-sm" htmlFor="email">
                Email
              </label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border mb-5 pl-2 border-black w-[296px] h-[31px] rounded"
              />
              <label className="font-bold text-sm" htmlFor="password">
                Password
              </label>
              <a className="ml-[90px] text-sm" href="/">
                Forgot your password?
              </a>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border pl-2 border-black w-[296px] h-[31px] rounded"
              />
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
