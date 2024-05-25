import { useContext, useState } from "react";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/myContextxt";
import toast from "react-hot-toast";
import { Axios } from "../MainPage";

function OtpVerification() {
  const navigate = useNavigate();

  const { userData } = useContext(myContext);

  const [otp, setOtp] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        "/register",
        { userData, otp },
      );

      if (response.data.success) {
        toast.success("OTP verified successfully, Registration Completed");
        navigate("/login");
      } else {
        toast.error("An error occured");
      }
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container ">
      <div className="h-24 flex justify-center items-center ">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="w-[650px] flex justify-center translate-x-[440px] ">
        <div className="w-[348px] rounded p-6 border border-black">
          <h1 className="text-2xl mb-4">
            <b>OTP Verification </b>
          </h1>
          <form onSubmit={handleSubmit}>
            <label className="font-bold text-sm mb-2" htmlFor="email">
              Enter the OTP sented to {userData.email}
            </label>
            <input
              type="text"
              maxLength="6"
              name="otp"
              placeholder="Enter Your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border pl-2 mt-2 border-black w-[296px] h-[31px] rounded "
            />
            <br />

            <button
              type="submit"
              className="bg-[#153e51] text-white text-sm font-semibold my-5 w-[296px] h-[31px] rounded"
              // disabled={otp.length < 6}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
