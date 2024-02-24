import { useContext, useState } from "react";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/myContextxt";
import toast from "react-hot-toast";
import axios from "axios";

function Registeration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  //   const initialFormData = {
  //     name: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   };
  //   const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4323/register", {
        name,
        email,
        password,
        conformPassword,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    navigate("/login");
  };
  return (
    <div className="container ">
      <div className="h-24  flex justify-center items-center ">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="w-[650px] flex justify-center translate-x-[440px] ">
        <div className="w-[348px] rounded p-6 border border-black">
          <h1 className="text-2xl mb-4">
            <b>Create account </b>
          </h1>
          <form onSubmit={handleSubmit}>
            <label className="font-bold text-sm" htmlFor="email">
              Your name
            </label>
            <br />
            <input
              type="text"
              name="name"
              placeholder="First and last name"
              onChange={(e) => setName(e.target.value)}
              className="border pl-2 border-black w-[296px] h-[31px] rounded "
            />
            <br />
            <label className="font-bold text-sm mt-5" htmlFor="email">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border pl-2 mb-5 border-black w-[296px] h-[31px] rounded"
            />
            <label className="font-bold text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              minLength="6"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="border pl-2 mb-2 border-black w-[296px] h-[31px] rounded"
            />

            <label className="font-bold text-sm" htmlFor="password">
              Re-enter password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) => setConformPassword(e.target.value)}
              className="border border-black w-[296px] h-[31px] rounded"
            />
            <button
              type="submit"
              className="bg-[#153e51] text-white text-sm font-semibold my-5 w-[296px] h-[31px] rounded"
            >
              Create your Zappose account
            </button>
          </form>
          {/* {Object.keys(errors).length > 0 && (
            <div className="text-red-600 font-semibold mb-3">
              {errors.name && <p>{errors.name}</p>}
              {errors.email && <p>{errors.email}</p>}
              {errors.password && <p>{errors.password}</p>}
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
          )} */}

          <p className="text-[12px]">
            Registering means you agree to the Zappos terms of use and
            <a target="h" href="https://www.zappos.com/privacy-policy">
              {" "}
              privacy policy
            </a>
          </p>
          <br />
          <hr className="border border-black-300" />
          <div className="translate-y-3 flex justify-center w-[296px]">
            <p className="text-[12px]">
              Already have an account?
              <Link to="/login">
                {" "}
                <b>Sign in</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registeration;
