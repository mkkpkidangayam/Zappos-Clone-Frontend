// Register.js
import { useState } from "react";
import OtpVerificationModal from "./OtpVerificationModal";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";
import { Link } from "react-router-dom";

function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const response = await axios.post('http://localhost:4323/api/verify-otp', { email: formData.email, otp });
      toast.success(response.data.message);
      setIsModalOpen(false);
      // Navigate to login page or perform other actions upon successful OTP verification
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation logic
    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Send registration data to backend
        const response = await axios.post('http://localhost:4323/api/register', formData);
        toast.success(response.data.message);
        // Open OTP verification modal upon successful registration
        handleOpenModal();
      } catch (error) {
        console.error(error.response.data);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="h-24 flex justify-center items-center">
        <img src={logo} alt="Logo" />
      </div>
      <div className="w-[650px] flex justify-center translate-x-[440px]">
        <div className="w-[348px] rounded p-6 border border-black">
          <h1 className="text-2xl mb-4"><b>Create account</b></h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border pl-2 border-black w-[296px] h-[31px] rounded"
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border pl-2 mb-5 border-black w-[296px] h-[31px] rounded"
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border pl-2 mb-2 border-black w-[296px] h-[31px] rounded"
            />
            {errors.password && <p className="text-red-600">{errors.password}</p>}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-black w-[296px] h-[31px] rounded"
            />
            {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword}</p>}
            <button type="submit" className="bg-[#153e51] text-white text-sm font-semibold my-5 w-[296px] h-[31px] rounded">Create your Zappose account</button>
          </form>
          <p className="text-[12px]">
            Registering means you agree to the Zappos terms of use and
            <a target="_blank" href="https://www.zappos.com/privacy-policy"> privacy policy</a>
          </p>
          <br />
          <hr className="border border-black-300" />
          <div className="translate-y-3 flex justify-center w-[296px]">
            <p className="text-[12px]">
              Already have an account?
              <Link to="/login">
                <b>Sign in</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <OtpVerificationModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleOtpSubmit} />
    </div>
  );
}

export default Register;

