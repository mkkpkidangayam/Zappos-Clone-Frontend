import { useContext, useState } from "react";
import logo from "../components/Assets/logo-blue-small._CB485919770_.svg";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../context/myContextxt";
import toast from "react-hot-toast";
import FooterSecond from "../components/Footer/FooterSecond";
import { Axios } from "../MainPage";

function Register() {
  const navigate = useNavigate();
  const { setUserData } = useContext(myContext);
  const [isLoading, setIsLoading] = useState(false);

  const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

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
        setIsLoading(true)
        const response = await Axios.post(
          "/otpsend",
          formData,
          {
            withCredentials: true,
          }
        );


        const saveSettings = async (response) => {
          return new Promise((resolve, reject) => {
            if (response.status === 200) {
              // Handle success
              console.log("Success:", response.data);
              resolve(response.data); // Resolve the promise with response data
            } else {
              // Handle error
              console.error("Error:", response.error);
              reject(response.error); // Reject the promise with error message
            }
          });
        };
        
        toast.promise(
          saveSettings(response),
          {
            loading: 'OTP sending...',
            success: (data) => {
              console.log("Success:", data);
              return <b>Success...!</b>; // Return JSX for success toast
            },
            error: (error) => {
              console.error("Error:", error);
              return <b>Can't send OTP.</b>; // Return JSX for error toast
            }
          }
        );

        setIsLoading(false)
        setUserData(formData);
        toast(response.data.message);
        navigate(`/otp-verify?email=${formData.email}`);
      } catch (error) {
        setIsLoading(false);
        console.log("there is an errror happened");
      }
    } else {
      toast.error("Please fill all data");
    }
  };
  return (
    <>
        <div className="h-24  flex justify-center items-center ">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      <div className="mb-10 flex justify-center">
        <div className="w-[650px] flex justify-center  ">
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
                maxLength="24"
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
                className="border pl-2 border-black w-[296px] h-[31px] rounded"
              />
              <button
                type="submit"
                className="bg-[#153e51] text-white text-sm font-semibold my-5 w-[296px] h-[31px] rounded"
              >
                {isLoading ? "Sending OTP..." :"Create your Zappose account"}
              </button>
            </form>
            {Object.keys(errors).length > 0 && (
              <div className="text-red-600 font-semibold mb-3">
                {errors.name && <p className="error">{errors.name}</p>}
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
      <div >
        <hr />
        <FooterSecond />
      </div>
    </>
  );
}

export default Register;
