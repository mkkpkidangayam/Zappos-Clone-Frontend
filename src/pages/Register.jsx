import { useContext, useState } from "react";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/myContextxt";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const generateOtp = () => {
    let OTP = "";
    let digits = "1234567890";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  console.log(generateOtp());

  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { userData, setUserData } = useContext(myContext);
  if (!userData) {
    setUserData([]);
  }

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const userHandler = () => {
    userData.push({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    setUserData(userData.slice());
  };
  console.log(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.name === "") {
      newErrors.name = "Name is required";
    }
    if (formData.email === "") {
      newErrors.email = "Email is required";
    }
    if (formData.password === "") {
      newErrors.password = "Password is required";
    }
    if (formData.confirmPassword === "") {
      newErrors.confirmPassword = "Re enter the password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      userHandler();
      toast.success(
        formData.name +
          ", Welcome to our party! To unlock a wonderful shopping experience, please sign in with your email and password. Thanks for choosing to join us! "
      );
      navigate("/login");
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
              className="border pl-2 mb-5 border-black w-[296px] h-[31px] rounded"
            />
            <label className="font-bold text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              minLength="6"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="border pl-2 mb-2 border-black w-[296px] h-[31px] rounded"
            />

            <label className="font-bold text-sm" htmlFor="password">
              Re-enter password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-black w-[296px] h-[31px] rounded"
            />
            <button
              type="submit"
              className="bg-[#153e51] text-white text-sm font-semibold my-5 w-[296px] h-[31px] rounded"
            >
              Create your Zappose account
            </button>
          </form>
          {Object.keys(errors).length > 0 && (
            <div className="text-red-600 font-semibold mb-3">
              {errors.name && <p>{errors.name}</p>}
              {errors.email && <p>{errors.email}</p>}
              {errors.password && <p>{errors.password}</p>}
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
          )}

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

export default Register;
