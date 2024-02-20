import React, { useContext, useState } from "react";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/myContextxt";
import UsersData from "../components/Data/UserData";

function Login() {
  const navigate = useNavigate();
  const { email, setEmail } = useContext(myContext);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    const user = UsersData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert('Sign in succesfully start shoping')

      navigate('/')
    }else{
      alert("Cant't sign in, Email or password is not correct")
    }
  };

  
  return (
    <div className="container ">
      <div className="h-24  flex justify-center items-center ">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="w-[650px] flex justify-center translate-x-[440px] ">
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
              className="border mb-5 border-black w-[296px] h-[31px] rounded"
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
              className="border border-black w-[296px] h-[31px] rounded"
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
            className="w-[296px] h-[31px] mt-3 border-2 font-bold text-[#003953] border-[#003953]"
          >
            Create your Zappos account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
