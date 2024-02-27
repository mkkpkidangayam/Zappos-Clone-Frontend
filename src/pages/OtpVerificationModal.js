// // OtpVerificationModal.js
// import { useState } from "react";
// import axios from "axios";

// function OtpVerificationModal({ isOpen, onClose, email }) {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setOtp(e.target.value);
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4323/api/verify-otp', { email, otp });
//       // Handle successful OTP verification
//     } catch (error) {
//       console.error(error.response.data);
//       // Handle error
//     }
//   };
//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border border-black rounded shadow-lg">
//       <button className="absolute top-2 right-2 text-red-600" onClick={onClose}>X</button>
//       <h2 className="text-xl mb-4">Enter OTP</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={otp}
//           onChange={handleChange}
//           placeholder="Enter OTP"
//           className="border border-black rounded px-2 py-1 mb-4"
//         />
//         <button type="submit" className="bg-[#153e51] text-white text-sm font-semibold py-1 px-4 rounded">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default OtpVerificationModal;

import { useState } from "react";
import axios from "axios";

function OtpVerificationModal({ isOpen, onClose, email }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4323/api/verify-otp', { email, otp });
      // Handle successful OTP verification
    } catch (error) {
      console.error(error.response.data);
      // Handle error
    }
  };

  return (
    <div>
      {isOpen && (
        <div>
          <h2>Enter OTP</h2>
          <form onSubmit={handleOtpSubmit}>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button type="submit">Submit OTP</button>
          </form>
          {error && <p>{error}</p>}
          <button onClick={onClose}>Close</button>
        </div>
      )}
    </div>
  );
}

export default OtpVerificationModal;
